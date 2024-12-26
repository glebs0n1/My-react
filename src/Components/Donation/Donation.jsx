import React from 'react';
import donationImage from '../../assets/donationImage.png';
import './Donation.css';

const Donation = () => {
  return (
    <div className="donation-banner">
      <img src={donationImage} alt="Donate" className="donation-image" />
      <div className="donation-text">
        <h2>Help Us Make a Difference</h2>
        <p>Your donation helps us care for pets in need.</p>
        <button className="donate-button">Donate Now</button>
        </div>
    </div>
  );
};

export default Donation;
