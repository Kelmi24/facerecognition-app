# Face Recognition App

A full-stack web application that allows users to register, sign in, and detect faces in images using machine learning.

## Overview

This project is a robust full-stack application built to demonstrate authentication, database management, and integration with image recognition models. Users can create accounts, track their usage verification (entry count), and process images via external URLs to identify faces.

The application is built using the PERN stack (PostgreSQL, Express, React, Node.js) and is deployed on cloud infrastructure.

## Features

- **User Authentication**: Secure registration and login functionality using bcrypt for password hashing.
- **Face Detection**: Identifies and highlights faces in provided image URLs using the Face-API.js library.
- **Entry Tracking**: Maintains a count of images processed for each user, stored in a PostgreSQL database.
- **Responsive Design**: Mobile-friendly interface built with Tachyons CSS.
- **Security**: Implements secure headers (Helmet), rate limiting, and environment variable configuration.

## Technology Stack

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Vite**: Build tool and development server.
- **Face-API.js**: JavaScript API for face detection and recognition in the browser.
- **Tachyons**: Functional CSS framework for rapid styling.
- **Particles-bg**: Interactive background animations.

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for API routing and middleware.
- **Knex.js**: SQL query builder for interacting with the database.
- **Bcrypt.js**: Library for hashing passwords.

### Database

- **PostgreSQL**: Relational database management system for storing user profiles and login credentials.

## Deployment

The application is deployed using modern cloud services:

- **Frontend**: Hosted as a Static Site (e.g., Render/Netlify).
- **Backend**: Hosted as a Node.js Web Service (e.g., Render/Railway).
- **Database**: Hosted PostgreSQL instance.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Git

### Installation

1. Clone the repository.
2. Install backend dependencies: `cd "facerecognition api" && npm install`
3. Install frontend dependencies: `cd facerecognition-app && npm install`
4. Configure environment variables (database connection, API keys).
5. Start the backend server: `npm start`
6. Start the frontend development server: `npm run dev`

## License

This project is open source and available under the ISC License.
