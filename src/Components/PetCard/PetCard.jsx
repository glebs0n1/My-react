import React, { useState } from 'react';
import PetCard from './PetCard';

const PetList = () => {
  const [filteredPets, setFilteredPets] = useState([
    // Example pet data
    { id: 1, name: 'Buddy', breed: 'Golden Retriever', likes: 5 },
    { id: 2, name: 'Mittens', breed: 'Siamese Cat', likes: 3 },
    // Add more pet objects here
  ]);

  const handleLike = (petId) => {
    setFilteredPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === petId ? { ...pet, likes: pet.likes + 1 } : pet
      )
    );
  };

  return (
    <div className="pets-results">
      <div className="pets-grid">
        {filteredPets.map((pet) => (
          <PetCard 
            key={pet.id} 
            pet={pet} 
            handleLike={handleLike} 
          />
        ))}
      </div>
    </div>
  );
};

export default PetList;
