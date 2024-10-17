
import React, { Component } from 'react';
import { Navigate,Link } from 'react-router-dom';
import './index.css';

class Register extends Component {

    state = {
        email: '',
        password: '',
        message: '',
        messageType: '',
        redirectToLogin: false,
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
        const existingUser = users.find(user => user.email === this.state.email);

        if (existingUser) {
            this.setState({ message: 'User already exists.', messageType: 'error' });


        } else if (this.state.password.length < 6) {
            this.setState({ message: 'Password must be at least 6 characters long.', messageType: 'error' });
        } else {
            const newUser = { email: this.state.email, password: this.state.password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            <Navigate to="/login" />
            this.setState({
                message: 'Registration successful! You can now log in.',
                messageType: 'success',
                email: '',
                password: '',
                redirectToLogin: true,
            });

        }
    };

    render() {
        const { email, password, message, messageType,redirectToLogin } = this.state;
        if (redirectToLogin) {
            return <Navigate to="/login" />;
        }

        return (
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.ChangeEmail}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.ChangePassword}

                    />
                    <button type="submit">Register</button>
                    <p>
                    Don't have an account? <Link to="/">Login here</Link>
                </p>
                </form>
                {message && (
                    <p className={`message ${messageType}`}>{message}</p>
                )}
            </div>
        );
    }
}

export default Register;
