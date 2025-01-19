import React, { useState } from 'react';
import '../PetDetail/PetDetail.css';

import { useParams } from 'react-router-dom';

const PetDetail = ({ pets }) => {
    const { id } = useParams(); 
    const pet = pets.find(pet => pet.id === parseInt(id)); 
  
    if (!pet) {
      return <div>Pet not found</div>;
    }
  
    return (
      <div className="pet-detail-container">
        <div className="pet-detail">
          {/* Pet Image */}
          <div className="pet-image">
            <img src={pet.image} alt={pet.name} />
          </div>
  
          {/* Pet Description */}
          <div className="pet-description">
            <h2>About {pet.name}</h2>
            <p><strong>Breed:</strong> {pet.breed || 'Domestic Short Hair Mix'}</p>
            <p><strong>Location:</strong> {pet.city}, {pet.province}</p>
            <p><strong>Age:</strong> {pet.age || 'Young'} years</p>
            <p><strong>Gender:</strong> {pet.gender || 'Male'}</p>
            <p><strong>Size:</strong> {pet.size || 'Medium'}</p>
            <p><strong>Coat Length:</strong> {pet.coatLength || 'Short'}</p>
            <p><strong>House-trained:</strong> {pet.houseTrained ? 'Yes' : 'No'}</p>
            <p><strong>Health:</strong> {pet.healthStatus || 'Vaccinations up to date, spayed/neutered.'}</p>
            <p><strong>Good in a home with:</strong> {pet.goodInHomeWith || 'Other cats'}</p>
            <p><strong>Prefers a home without:</strong> {pet.prefersHomeWithout || 'Children'}</p>
          </div>
        </div>
  
        {/* Buttons for Adoption Inquiry */}
        <div className="Button-form">
          <button className="web_ui__Button__button web_ui__Button__filled">
            Start Your Inquiry
          </button>
          <button className="web_ui__Button__button web_ui__Button__primary">
            Sponsor
          </button>
          <button className="web_ui__Button__button web_ui__Button__outlined">
            Favorite
          </button>
        </div>
      </div>
    );
  };
  
  export default PetDetail;