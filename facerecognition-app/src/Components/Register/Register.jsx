import { Component } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            error: '',
            isLoading: false
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value, error: '' })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value, error: '' })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value, error: '' })
    }

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onSubmitRegister();
        }
    }

    onSubmitRegister = () => {
        const { name, email, password } = this.state;

        if (!name || !email || !password) {
            this.setState({ error: 'Please fill in all fields.' });
            return;
        }

        this.setState({ isLoading: true, error: '' });

        fetch(`${API_URL}/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password, name })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } else {
                this.setState({ 
                    error: 'Unable to register. Email may already be in use.',
                    isLoading: false 
                });
            }
        })
        .catch(() => {
            this.setState({ 
                error: 'Unable to connect to server. Please try again later.',
                isLoading: false 
            });
        });
    }

    render() {
        const { onRouteChange } = this.props;
        const { error, isLoading } = this.state;
        return (
        <article className="glass-card">
            <main>
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend>Register</legend>
                        <div className="mt3">
                            <label htmlFor="name">Name</label>
                            <input 
                                className="glass-input" 
                                type="text" 
                                name="name"  
                                id="name"
                                autoComplete="name"
                                onChange={this.onNameChange}
                                onKeyDown={this.onKeyDown}
                            />
                        </div>
                        <div className="mv3">
                            <label htmlFor="email-address">Email</label>
                            <input 
                                className="glass-input" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                autoComplete="email"
                                onChange={this.onEmailChange}
                                onKeyDown={this.onKeyDown}
                            />
                        </div>
                        <div className="mv3">
                            <label htmlFor="password">Password</label>
                            <input 
                                className="glass-input" 
                                type="password" 
                                name="password"  
                                id="password"
                                autoComplete="new-password"
                                onChange={this.onPasswordChange}
                                onKeyDown={this.onKeyDown}
                            />
                        </div>
                    </fieldset>
                    {error && <p className="error-message">{error}</p>}
                    <div>
                        <input
                            className="glass-button"
                            onClick={this.onSubmitRegister}
                            type="button"
                            value={isLoading ? 'Registering...' : 'Register'}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <button 
                            onClick={() => onRouteChange('signin')} 
                            className="glass-link"
                        >
                            Already have an account? Sign in
                        </button>
                    </div>
                </div>
            </main>
        </article>
    )
    }
}

export default Register