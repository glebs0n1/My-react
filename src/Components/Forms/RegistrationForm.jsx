import React, { useState } from 'react';
import FormValidator from './FormValidator';
import './RegistrationForm.css';

const RegistrationForm = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = FormValidator.validateRegistration(username, email, password);
        if (Object.keys(validationErrors).length === 0) {
            onClose();
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="registration-form">
            <button className="close-button" onClick={onClose}>✖</button>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={errors.username ? 'error' : ''}
                    placeholder="Username (min 3 characters)"
                />
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
                <button type="submit">Register</button>
            </form>
            {Object.values(errors).map((error, index) => (
                <p key={index} className="error-message">{error}</p>
            ))}
        </div>
    );
};

export default RegistrationForm;
