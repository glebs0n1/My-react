import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для редиректа
import FormValidator from '../Components/Forms/FormValidator';
import './RegistrationForm.css';
import '../Input/Input.css';
import './Form.css';

const RegistrationForm = ({ onClose }) => {
    const navigate = useNavigate(); // Инициализация useNavigate
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState('');
    const [formDisabled, setFormDisabled] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the inputs
        const validationErrors = FormValidator.validateRegistration(username, email, password);

        if (Object.keys(validationErrors).length === 0) {
            try {
                setServerMessage(`Registration successful for ${username}`);
                setTimeout(() => {
                    onClose();
                    navigate('/home'); 
                }, 2000);
            } catch (error) {
                setServerMessage(`Registration failed: ${error.message}`);
            }
        } else {
            setErrors(validationErrors);
            setFormDisabled(true); 
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the state for the corresponding field
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);

        // Validate the specific field as the user types
        const fieldError = FormValidator.handleFieldValidation(name, value);
        if (fieldError) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: fieldError
            }));
        } else {
            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    };

    return (
        <div className="registration-form">
            <button className="close-button" onClick={onClose}>✖</button>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                    className={errors.username ? 'error' : ''} 
                    placeholder="Username (min 3 characters)"
                    disabled={formDisabled}
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''} 
                    placeholder="Email"
                    disabled={formDisabled}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className={errors.password ? 'error' : ''} 
                    placeholder="Password (min 8 characters)"
                    disabled={formDisabled}
                />
                <button type="submit" disabled={formDisabled}>Register</button>
            </form>
            {Object.values(errors).map((error, index) => (
                <p key={index} className="error-message">{error}</p>
            ))}
            {serverMessage && <p className="server-message">{serverMessage}</p>}
        </div>
    );
};

export default RegistrationForm;
