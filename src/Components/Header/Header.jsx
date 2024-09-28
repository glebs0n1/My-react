import { useState } from "react";
import PropTypes from "prop-types";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import './Header.css';
import logo from '../../assets/logo.png';
import likeIcon from '../../assets/like.png';

const Header = ({ onCreateAccount, onLoginAccount, totalLikes }) => {
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    setOpenNavigation(prev => {
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
    <ul className="nav-list">
      {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
        <li key={item}>
          <a href={`#${item.toLowerCase().replace(/\s/g, '')}`} onClick={handleNavigationClick}>
            {item}
          </a>
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

      <button
        className={`hamburger ${openNavigation ? 'active' : ''}`}
        onClick={toggleNavigation}
        aria-label="Toggle navigation menu"
        aria-expanded={openNavigation}
      >
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="line"></div>
        ))}
      </button>

      <nav className={`header__menu ${openNavigation ? 'active' : ''}`}>
        <NavigationMenu />
      </nav>

      <div className="header__actions">
        <button className="button button--secondary" onClick={onCreateAccount}>
          Sign Up
        </button>
        <button className="button button--secondary" onClick={onLoginAccount}>
          Login
        </button>
      </div>

      <div className="like-button">
        <img src={likeIcon} alt="Total Likes" className="like-icon" />
        <span className="like-count">{totalLikes}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  onCreateAccount: PropTypes.func.isRequired,
  onLoginAccount: PropTypes.func.isRequired,
  totalLikes: PropTypes.number.isRequired,
};

export default Header;
