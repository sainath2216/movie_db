import {Navigate,Link} from 'react-router-dom';

import React, { Component } from 'react';

import "./index.css"

class Login extends Component {
    state = {
        email: '',
        password: '',
        message: '',
        redirectToMovies: false,
    };


    ChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    ChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === this.state.email && user.password === this.state.password);

        if (user) {
            this.setState({ redirectToMovies: true });
        } else {
            this.setState({ message: 'Invalid email or password.' });
        }
    };

    render() {
        const {email,password, message, redirectToMovies} = this.state
        if (redirectToMovies) {
            return <Navigate to="/movies" />;
        }
        
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.ChangeEmail}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.ChangePassword}
                        
                    />
                    <button type="submit">Login</button> 
                    <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
                {this.state.message && <p>{this.state.message}</p>}
                </form>
                {message && <p>{message}</p>} 
                
            </div>
        );
    }
}

export default Login;
