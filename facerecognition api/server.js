require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');


const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      }
});

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10kb' }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

app.post('/signin', authLimiter, async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }

  try {
    const data = await db.select('email', 'hash').from('login').where('email', '=', email);
    if (!data.length) return res.status(400).json('wrong credentials');

    const isValid = await bcrypt.compare(password, data[0].hash);
    if (isValid) {
      const user = await db.select('*').from('users').where('email', '=', email);
      return res.json(user[0]);
    } else {
      return res.status(400).json('wrong credentials');
    }
  } catch (err) {
    next(err);
  }
});

app.post('/register', authLimiter, async (req, res, next) => {
  const { email, name, password } = req.body;
  
  if (!email || !name || !password || password.length < 6) {
    return res.status(400).json('incorrect form submission');
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    
    await db.transaction(async trx => {
      const loginEmail = await trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email');

      const user = await trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0].email,
          name: name,
          joined: new Date()
        });

      res.json(user[0]);
    });
  } catch (err) {
    if (err.code === '23505') {
         return res.status(400).json('unable to register');
    }
    next(err);
  }
});

app.get('/profile/:id', (req, res, next) => {
  const { id } = req.params;
  
  if (isNaN(id)) {
      return res.status(400).json('Invalid ID');
  }

  db.select('*').from('users').where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch(next);
});

app.put('/image', (req, res, next) => {
  const { id } = req.body;
  if (!id || isNaN(id)) {
      return res.status(400).json('Invalid ID');
  }
  
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
    })
    .catch(next);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
