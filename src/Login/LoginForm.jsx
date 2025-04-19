import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormValidator from '../Components/Forms/FormValidator';
import './LoginForm.css';
import '../Input/Input.css';
import './Form.css';

const LoginForm = ({ onClose }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState('');
    const [formDisabled, setFormDisabled] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the inputs
        const validationErrors = FormValidator.validateLogin(email, password);

        if (Object.keys(validationErrors).length === 0) {
            try {
                setServerMessage(`Login successful with email: ${email}`);
                setTimeout(() => {
                    onClose();
                    navigate('/home'); 
                }, 2000);
            } catch (error) {
                setServerMessage(`Login failed: ${error.message}`);
            }
        } else {
            setErrors(validationErrors);
            setFormDisabled(true); // Disable form fields if validation fails
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the state for the corresponding field
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
            // Remove the error for the specific field if no error
            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name]; // Remove the error for the specific field
                return updatedErrors;
            });
        }
    };

    return (
        <div className="login-form">
            <button className="close-button" onClick={onClose}>✖</button>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''} // Apply error class if there's an error
                    placeholder="Email"
                    disabled={formDisabled}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className={errors.password ? 'error' : ''} // Apply error class if there's an error
                    placeholder="Password (min 8 characters)"
                    disabled={formDisabled}
                />
                <button type="submit" disabled={formDisabled}>Login</button>
            </form>
            {Object.values(errors).map((error, index) => (
                <p key={index} className="error-message">{error}</p>
            ))}
            {serverMessage && <p className="server-message">{serverMessage}</p>}
        </div>
    );
};

export default LoginForm;
