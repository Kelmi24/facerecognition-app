import { Component } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            isLoading: false
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value, error: '' })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value, error: '' })
    }

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onSubmitSignIn();
        }
    }

    onSubmitSignIn = () => {
        const { email, password } = this.state;

        if (!email || !password) {
            this.setState({ error: 'Please fill in all fields.' });
            return;
        }

        this.setState({ isLoading: true, error: '' });

        fetch(`${API_URL}/signin`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            } else {
                this.setState({ 
                    error: 'Invalid email or password. Please try again.',
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

    render(){
        const { onRouteChange } = this.props;
        const { error, isLoading } = this.state;
        return (
        <article className="glass-card">
            <main>
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend>Sign In</legend>
                        <div className="mt3">
                            <label htmlFor="email-address">Email</label>
                            <input 
                                onChange={this.onEmailChange}
                                onKeyDown={this.onKeyDown}
                                className="glass-input" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                autoComplete="email"
                            />
                        </div>
                        <div className="mv3">
                            <label htmlFor="password">Password</label>
                            <input 
                                onChange={this.onPasswordChange}
                                onKeyDown={this.onKeyDown}
                                className="glass-input" 
                                type="password" 
                                name="password"  
                                id="password"
                                autoComplete="current-password"
                            />
                        </div>
                    </fieldset>
                    {error && <p className="error-message">{error}</p>}
                    <div>
                        <input
                            className="glass-button"
                            onClick={this.onSubmitSignIn}
                            type="button"
                            value={isLoading ? 'Signing in...' : 'Sign in'}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <button 
                            onClick={() => onRouteChange('register')} 
                            className="glass-link"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </main>
        </article>
        );
    }
}

export default Signin