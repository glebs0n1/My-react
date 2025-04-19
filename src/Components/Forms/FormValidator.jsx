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

    static handleFieldValidation(field, value) {
        let error = null;

        switch (field) {
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid.';
                break;
            case 'username':
                if (value.length < 3) error = 'Username must be at least 3 characters long.';
                break;
            case 'password':
                if (value.length < 8) error = 'Password must be at least 8 characters long.';
                break;
            default:
                break;
        }
        
        return error;
    }
}

export default FormValidator;
