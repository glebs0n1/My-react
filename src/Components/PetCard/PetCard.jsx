import React from 'react';
import PetCard from './PetCard';
import './PetCard.css';

const PetList = ({ pets, onLike }) => {
  return (
    <div className="pets-results">
      <div className="pets-grid">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} handleLike={onLike} />
        ))}
      </div>
    </div>
  );
};

export default PetList;
