import React, { useState } from 'react';  
import './Footer.css';
import { logoSizes } from '../../assets/logoConfig';
import logoFooter from '../../assets/logo.png'; 

const Footer = () => {
    const [openNavigation, setOpenNavigation] = useState(false);

    const handleNavigationClick = () => {
        if (openNavigation) {
            setOpenNavigation(false);
        }
    };

    return (
        <footer className="footer">
            <div className="footer__logo">
                <a href="/" onClick={handleNavigationClick} aria-label="Go to home">
                <img 
                        src={logoFooter} 
                        alt="Foothills Logo" 
                        className="footer__logo-img" 
                        style={{ width: logoSizes.footer.width, padding:logoSizes.footer.padding, height: logoSizes.footer.height }}  
                    />
                </a>
            </div>

            {/* Footer Menu */}
            <div className="footer-menu">
                <div className="footer-column">
                    <h4>Resources and Links</h4>
                    <ul>
                        <li><a href="#faqs">FAQs</a></li>
                        <li><a href="#mobile-app">Mobile App Download</a></li>
                        <li><a href="#partnerships">Partnerships</a></li>
                        <li><a href="#news-center">News Center</a></li>
                        <li><a href="#petfinder">Put Petfinder On Your Site</a></li>
                        <li><a href="#for-developers">For Developers</a></li>
                        <li><a href="#contact-us">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Adopt or Get Involved</h4>
                    <ul>
                        <li><a href="#adopt-involved">All Adopt or Get Involved</a></li>
                        <li><a href="#adopting-pets">Adopting Pets</a></li>
                        <li><a href="#shelters-rescues">Animal Shelters & Rescues</a></li>
                        <li><a href="#other-pets">Other Types of Pets</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>All About Puppies</h4>
                    <ul>
                        <li><a href="#dogs-puppies">All About Dogs & Puppies</a></li>
                        <li><a href="#dog-adoption">Dog Adoption</a></li>
                        <li><a href="#dog-breeds">Dog Breeds</a></li>
                        <li><a href="#feeding-dog">Feeding Your Dog</a></li>
                        <li><a href="#dog-behavior">Dog Behavior</a></li>
                        <li><a href="#dog-health">Dog Health & Wellness</a></li>
                        <li><a href="#dog-training">Dog Training</a></li>
                        <li><a href="#dog-info">Other Dog Information</a></li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div className="newsletter">
                       <h4>Stay Updated on Pet Adoption</h4>
                        <p>Sign up to receive the latest news on pet adoption and care.</p>
                        <form className="newsletter-form">
                        <input 
                            type="newsletter-input" 
                            placeholder="Enter your email" 
                            required 
                            className="newsletter-input"
                        />
                        <button type="newsletter-button" className="newsletter-button">Subscribe</button>
                        </form>
                </div>
            </div>

            {/* Footer Bottom Information */}
            <div className="footer-bottom">
                <p>©2024 Foothills All rights reserved</p>
                <div className="social-icons">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <i className="fab fa-instagram"></i> {/* Instagram Icon */}
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <i className="fab fa-twitter"></i> {/* Twitter Icon */}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
