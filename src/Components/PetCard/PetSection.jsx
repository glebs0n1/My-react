import React from 'react';
import PetCard from '../PetCard/PetCard';
import { Link } from 'react-router-dom';  // Import Link for routing

const PetSection = ({ filteredPets, handleLike }) => {
  return (
    <div className="adoption-section">
      <h2 className="adoption-title">Pets Available for Adoption</h2>
      <div className="pet-images">
        {filteredPets.slice(0, filteredPets.length - 1).map((pet) => (
          <PetCard key={pet.id} pet={pet} handleLike={handleLike} />
        ))}

        <Link to={`/pet-details/${filteredPets[filteredPets.length - 1].id}`}>
          <div className="last-pet-box">
            <img
              src={filteredPets[filteredPets.length - 1].image}
              alt="Meet them"
              className="animals-icon"
            />
            <p className="last-pet-name">Meet them</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PetSection;
