import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        {/* Add your logo here */}
        <img src="logo.png" alt="Logo" />
      </div>
      <nav className="header__menu">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="header__actions">
        <button className="header__button header__button--login">Login</button>
        <button className="header__button header__button--signup">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
