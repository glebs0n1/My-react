import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormValidator from '../Components/Forms/FormValidator';
import { AuthContext } from '../Login/AuthContext';
import './LoginForm.css';
import '../Components/Input/Input.css';

const LoginForm = ({ onClose }) => {
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState('');
    const [formDisabled, setFormDisabled] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = FormValidator.validateLogin(email, password);

        if (Object.keys(validationErrors).length === 0) {
            try {
                localStorage.setItem('authToken', 'yourTokenHere'); // Simulated login
                setIsLoggedIn(true);
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
            setFormDisabled(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);

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
        <div className="login-form">
            <button className="close-button" onClick={onClose}>✖</button>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
