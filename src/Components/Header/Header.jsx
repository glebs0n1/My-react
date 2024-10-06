import { useState } from "react";
import PropTypes from "prop-types";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import './Header.css';
import logo from '../../assets/logo.png';
import likeIcon from '../../assets/like.png';
import shelterImage from '../../assets/shelter.png';
import medicationsImage from '../../assets/medications.png';
import trainingImage from '../../assets/training.png';
import vetImage from '../../assets/vet.png';

const Header = ({ onCreateAccount, totalLikes }) => {
  const [openNavigation, setOpenNavigation] = useState(false);

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

  const NavigationMenu = () => (
    <ul className={`nav-list ${openNavigation ? 'open' : ''}`}>
      {[
        { name: 'Shelter', image: shelterImage },
        { name: 'Medications', image: medicationsImage },
        { name: 'Training', image: trainingImage },
        { name: 'Veterinarian', image: vetImage },
      ].map((item) => (
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
  );

  return (
    <header className="header">
      <div className="header__logo">
        <a href="#home" onClick={handleNavigationClick} aria-label="Go to home">
          <img src={logo} alt="Company Logo" />
        </a>
      </div>

      <nav className={`header__menu ${openNavigation ? 'active' : ''}`} aria-hidden={!openNavigation}>
        <NavigationMenu />
      </nav>

      <div className="header__actions">
        <button className="button button--secondary" onClick={onCreateAccount}>
          Sign Up
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
    </header>
  );
};

Header.propTypes = {
  onCreateAccount: PropTypes.func.isRequired,
  totalLikes: PropTypes.number.isRequired,
};

export default Header;
