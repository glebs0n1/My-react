import React, { useState } from 'react';
import FormValidator from './FormValidator';
import './LoginForm.css';

const LoginForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = FormValidator.validateLogin(email, password);
        if (Object.keys(validationErrors).length === 0) {
            onClose();
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="login-form">
            <button className="close-button" onClick={onClose}>✖</button>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'error' : ''}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? 'error' : ''}
                    placeholder="Password (min 8 characters)"
                />
                <button type="submit">Login</button>
            </form>
            {Object.values(errors).map((error, index) => (
                <p key={index} className="error-message">{error}</p>
            ))}
        </div>
    );
};

export default LoginForm;
