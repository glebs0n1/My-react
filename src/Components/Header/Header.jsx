import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { logoSizes } from '../../assets/logoConfig';
import logo from '../../assets/logo.png';
import loginIcon from '../../assets/login.png';
import shelterImage from '../../assets/shelter.png';
import medicationsImage from '../../assets/medications.png';
import trainingImage from '../../assets/training.png';
import vetImage from '../../assets/vet.png';
import Modal from '../Modal/Modal';
import LoginForm from '../../Login/LoginForm';
import RegistrationForm from '../../Registration/RegistrationForm';
import { AuthContext } from '../../Login/AuthContext';

const Header = ({ onCreateAccount, totalLikes }) => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Using AuthContext
  const [userEmail, setUserEmail] = useState(null); // Correctly defined state without type annotation
  const [isLogin, setIsLogin] = useState(true); // Added state to manage login/registration toggle
  const navigate = useNavigate();

  // UseEffect to load email and login status from localStorage
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, [setIsLoggedIn, setUserEmail]); // Added setUserEmail to dependencies to avoid ESLint warnings

  // Function to toggle navigation menu
  const toggleNavigation = () => {
    setOpenNavigation((prev) => {
      const newState = !prev;
      if (newState) {
        disablePageScroll();
      } else {
        enablePageScroll();
      }
      return newState;
    });
  };

  // Close navigation when an item is clicked
  const handleNavigationClick = () => {
    if (openNavigation) {
      enablePageScroll();
      setOpenNavigation(false);
    }
  };

  // Function to log out
  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserEmail(null);
    navigate('/');
  };

  // List of navigation items
  const navItems = [
    { name: 'Shelter', image: shelterImage, path: '/shelter' },
    { name: 'Medications', image: medicationsImage, path: '/medications' },
    { name: 'Training', image: trainingImage, path: '/training' },
    { name: 'Veterinarian', image: vetImage, path: '/veterinarian' },
  ];

  // Function to open the login modal
  const openModal = (isLoginMode) => {
    setIsModalOpen(true);
    setIsLogin(isLoginMode); // Correctly setting login state
  };

  // Toggle between login and registration forms
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  // Function to render the user avatar and dropdown menu
  const renderUserAvatar = () => {
    const firstLetter = userEmail ? userEmail[0].toUpperCase() : '';
    return (
      <div className="user-avatar">
        {firstLetter}
        <div className="dropdown-menu">
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  };

  return (
    <header className="header">
      <div className="header__logo">
        <a href="/" onClick={handleNavigationClick} aria-label="Go to home">
          <img 
            src={logo} 
            alt="Foothills Logo" 
            className="header__logo-img" 
            style={{ width: logoSizes.footer.width, height: logoSizes.footer.height }}  
          />
        </a>
      </div>

      <nav className={`header__menu ${openNavigation ? 'active' : ''}`} aria-hidden={!openNavigation}>
        <ul className={`nav-list ${openNavigation ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.name} className="nav-item">
              <Link to={item.path} onClick={handleNavigationClick}> 
                {item.name}
              </Link>
              <div className="dropdown">
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header__actions">
        {isLoggedIn ? (
          renderUserAvatar()
        ) : (
          <button
            className="button button--secondary"
            onClick={() => openModal(true)}
            aria-label="Log In"
          >
            <img src={loginIcon} alt="Login" className="login-icon" /> 
            Log In
          </button>
        )}

        <button
          className={`hamburger ${openNavigation ? 'active' : ''}`}
          onClick={toggleNavigation}
          aria-label="Toggle navigation menu"
          aria-expanded={openNavigation}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">Toggle menu</span>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="line" />
          ))}
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isLogin ? (
          <>
            <LoginForm onClose={() => setIsModalOpen(false)} />
            <p>
              Don't have an account? 
              <button onClick={toggleForm} style={{ marginLeft: '5px', background: 'transparent', color: '#e208ff', border: 'none', cursor: 'pointer' }}>
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <RegistrationForm onClose={() => setIsModalOpen(false)} />
            <p>
              Already have an account? 
              <button onClick={toggleForm} style={{ marginLeft: '5px', background: 'transparent', color: '#e208ff', border: 'none', cursor: 'pointer' }}>
                Login
              </button>
            </p>
          </>
        )}
      </Modal>
    </header>
  );
};

Header.propTypes = {
  onCreateAccount: PropTypes.func.isRequired,
};

export default Header;
