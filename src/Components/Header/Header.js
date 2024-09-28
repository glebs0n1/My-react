import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import './Menu.css';
import logo from '../../assets/logo.png';
import likeIcon from '../../assets/like.png';
import { Button } from '../Button/Button';

const Header = ({ onCreateAccount }) => {
    const [likes, setLikes] = useState(0);

    const incrementLikes = () => {
        setLikes(prevLikes => prevLikes + 1);
    };

    return ( <
        header className = "header" > { /* Logo */ } <
        div className = "header__logo" >
        <
        img src = { logo }
        alt = "Company Logo"
        className = "logo" / >
        <
        /div>

        { /* Navigation Menu */ } <
        nav className = "header__menu" >
        <
        ul >
        <
        li > < a href = "#home" > Home < /a></li >
        <
        li > < a href = "#services" > Services < /a></li >
        <
        li > < a href = "#about" > About Us < /a></li >
        <
        li > < a href = "#contact" > Contact < /a></li >
        <
        /ul> <
        /nav>

        { /* Sign Up Link */ } <
        a href = "#signup"
        className = "header__button header__button--signup"
        onClick = { onCreateAccount } >
        New account, < strong > Sign Up < /strong>! <
        /a>

        { /* Log In Button (Conditional Rendering for large screens) */ } <
        Button className = "hidden lg:flex"
        href = "#login"
        label = "Log in" / >

        { /* Like Button */ } <
        div className = "like-button"
        onClick = { incrementLikes }
        style = {
            { cursor: 'pointer' } } >
        <
        img src = { likeIcon }
        alt = "Like"
        className = "like-icon" / >
        <
        span className = "like-count" > { likes } < /span> <
        /div> <
        /header>
    );
};

Header.propTypes = {
    onCreateAccount: PropTypes.func.isRequired,
};

export default Header;