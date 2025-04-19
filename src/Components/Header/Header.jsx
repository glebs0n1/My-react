import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Link, useNavigate } from 'react-router-dom';  // useNavigate для перенаправления
import './Header.css';
import { logoSizes } from '../../assets/logoConfig';
import logo from '../../assets/logo.png';
import loginIcon from '../../assets/login.png';
import shelterImage from '../../assets/shelter.png';
import medicationsImage from '../../assets/medications.png';
import trainingImage from '../../assets/training.png';
import vetImage from '../../assets/vet.png';
import Modal from '../Modal/Modal';
import LoginForm from '../Login/LoginForm';
import RegistrationForm from '../Login/RegistrationForm';

const Header = ({ onCreateAccount, totalLikes }) => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();  // Для перенаправления на другие страницы

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

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

  const handleNavigationClick = () => {
    if (openNavigation) {
      enablePageScroll();
      setOpenNavigation(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('email');  
    setIsLoggedIn(false);
    setUserEmail(null);
    navigate('/login'); 
  };

  const navItems = [
    { name: 'Shelter', image: shelterImage, path: '/shelter' },
    { name: 'Medications', image: medicationsImage, path: '/medications' },
    { name: 'Training', image: trainingImage, path: '/training' },
    { name: 'Veterinarian', image: vetImage, path: '/veterinarian' },
  ];

  const openModal = (isLoginMode) => {
    setIsModalOpen(true);
    setIsLogin(isLoginMode);
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

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
        <a href="#home" onClick={handleNavigationClick} aria-label="Go to home">
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
          <button className="button button--secondary" onClick={() => openModal(true)} aria-label="Log In">
            <img src={loginIcon} alt="Login" className="login-icon" /> Log In
          </button>
        )}

        <button
          className={`hamburger ${openNavigation ? 'active' : ''}`}
          onClick={toggleNavigation}
          aria-label="Toggle navigation menu"
          aria-expanded={openNavigation}
        >
          <span className="sr-only">Toggle menu</span>
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="line"></div>
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
