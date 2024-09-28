import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Optional: Import CSS for the button

export const Button = ({ primary, size, label, onClick }) => {
    const className = `button ${primary ? 'button--primary' : 'button--secondary'} button--${size}`;

    return ( <
        button className = { className }
        onClick = { onClick } > { label } <
        /button>
    );
};

Button.propTypes = {
    primary: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
    primary: false,
    size: 'medium',
};

export default Button;