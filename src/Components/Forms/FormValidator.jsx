class FormValidator {
    static validateRegistration(username, email, password) {
        const errors = {};
        if (username.length < 3) errors.username = 'Username must be at least 3 characters long.';
        if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid.';
        if (password.length < 8) errors.password = 'Password must be at least 8 characters long.';
        return errors;
    }

    static validateLogin(email, password) {
        const errors = {};
        if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid.';
        if (password.length < 8) errors.password = 'Password must be at least 8 characters long.';
        return errors;
    }
}

export default FormValidator;
