import React from 'react';
import './PetCard.css';
import Like from '../Like/Like';

const PetCard = ({ pet, handleLike }) => {
  return (
    <div className="pet-image-box">
      <Like initialLikes={pet.likes} onClick={() => handleLike(pet.id)} />
      <img src={pet.image} alt={pet.name} className="pet-image" />
      <p className="pet-name">{pet.name}</p>
    </div>
  );
};

export default PetCard;
