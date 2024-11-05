import { useState } from "react";
import PropTypes from "prop-types";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import './Header.css';
import logo from '../../assets/logo.png';
import likeIcon from '../../assets/like.png';
import loginIcon from '../../assets/login.png';  
import shelterImage from '../../assets/shelter.png';
import medicationsImage from '../../assets/medications.png';
import trainingImage from '../../assets/training.png';
import vetImage from '../../assets/vet.png';
import Modal from '../Modal/Modal';
import LoginForm from '../Forms/LoginForm';
import RegistrationForm from '../Forms/RegistrationForm';

const Header = ({ onCreateAccount, totalLikes }) => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration forms

  const toggleNavigation = () => {
    setOpenNavigation((prev) => {
      const newState = !prev;
      newState ? disablePageScroll() : enablePageScroll();
      return newState;
    });
  };

  const handleNavigationClick = () => {
    if (openNavigation) {
      enablePageScroll();
      setOpenNavigation(false);
    }
  };

  const navItems = [
    { name: 'Shelter', image: shelterImage },
    { name: 'Medications', image: medicationsImage },
    { name: 'Training', image: trainingImage },
    { name: 'Veterinarian', image: vetImage },
  ];

  const openModal = (isLoginMode) => {
    setIsModalOpen(true);
    setIsLogin(isLoginMode);
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <a href="#home" onClick={handleNavigationClick} aria-label="Go to home">
          <img src={logo} alt="Company Logo" />
        </a>
      </div>

      <nav className={`header__menu ${openNavigation ? 'active' : ''}`} aria-hidden={!openNavigation}>
        <ul className={`nav-list ${openNavigation ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.name} className="nav-item">
              <a href={`#${item.name.toLowerCase().replace(/\s/g, '')}`} onClick={handleNavigationClick}>
                {item.name}
              </a>
              <div className="dropdown">
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header__actions">
        <button className="button button--secondary" onClick={() => openModal(true)} aria-label="Log In">
          <img src={loginIcon} alt="Login" className="login-icon" /> Log In
        </button>

        <div className="like-button">
          <img src={likeIcon} alt="Total Likes" className="like-icon" />
          <span className="like-count">{totalLikes}</span>
        </div>

        <button
          className={`hamburger ${openNavigation ? 'active' : ''}`}
          onClick={toggleNavigation}
          aria-label="Toggle navigation menu"
          aria-expanded={openNavigation}
        >
          <span className="sr-only"></span>
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
  totalLikes: PropTypes.number.isRequired,
};

export default Header;
