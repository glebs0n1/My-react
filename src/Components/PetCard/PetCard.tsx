import React from 'react';
import { Link } from 'react-router-dom';
import './PetCard.css';
import Like from '../Like/Like';

// Define the structure of the pet object.
interface Pet {
  id: number;
  name: string;
  image: string;
  likes: number;
  age?: string;
  size?: string;
  gender?: string;
  breed?: string;
  city?: string;
  [key: string]: any; // allow other optional pet properties
}

// Define props for the component
interface PetCardProps {
  pet: Pet;
  handleLike: (id: number) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, handleLike }) => {
  return (
    <div className="pet-image-box">
      {/* Like Button */}
      <Like initialLikes={pet.likes} onClick={() => handleLike(pet.id)} />

      {/* Pet image linking to details page with full pet info in state */}
      <Link
        to={`/pet-details/${pet.id}`}
        state={{ pet }}
        className="pet-image-container"
      >
        <img src={pet.image} alt={pet.name} className="pet-image" />
      </Link>

      {/* Pet name linking to details page with full pet info in state */}
      <Link
        to={`/pet-details/${pet.id}`}
        state={{ pet }}
        className="pet-name-container"
      >
        <p className="pet-name">{pet.name}</p>
      </Link>
    </div>
  );
};

export default PetCard;
