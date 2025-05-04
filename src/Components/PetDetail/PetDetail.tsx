import React, { useState } from 'react';
import '../PetDetail/PetDetail.css';
import { useParams, useLocation } from 'react-router-dom';

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: string;
  size: string;
  gender: string;
  image: string;
  images: string[];
  healthStatus: string;
  houseTrained: boolean;
  city: string;
  province: string;
}

const PetDetail: React.FC<{ pets: Pet[] }> = ({ pets }) => {
  const { id } = useParams<{ id: string }>();  // id is a string, we need to convert it to a number
  const location = useLocation();
  const statePet = location.state?.pet;  // Get pet from location state

  // The pet to display (statePet from location or pet from params)
  const pet = statePet || pets.find(p => p.id === Number(id));

  // If no pet is found, return an error message
  if (!pet) {
    return <div>Pet not found</div>;
  }

  // Set initial image to the pet's main image (if any)
  const [mainImage, setMainImage] = useState<string>(pet.image);

  // Handle image thumbnail click
  const handleImageClick = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className="pet-detail-container">
      <div className="pet-detail">
        {/* Image Gallery */}
        <div className="pet-image-gallery">
          <div className="main-image">
            <img src={mainImage} alt={pet.name} className="main-image-display" />
          </div>
          <div className="image-thumbnails">
            {[pet.image, ...(pet.images || [])].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${pet.name} ${idx}`}
                className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                onClick={() => handleImageClick(img)} // set as main image
              />
            ))}
          </div>
        </div>

        {/* Description Section */}
        <div className="pet-description">
          <h2>About {pet.name}</h2>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Location:</strong> {pet.city}, {pet.province}</p>
          <p><strong>Age:</strong> {pet.age}</p>
          <p><strong>Gender:</strong> {pet.gender}</p>
          <p><strong>Size:</strong> {pet.size}</p>
          <p><strong>House-trained:</strong> {pet.houseTrained ? 'Yes' : 'No'}</p>
          <p><strong>Health:</strong> {pet.healthStatus}</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="Button-form">
        <button className="adoption-inquiry-button">Start Your Inquiry</button>
        <button className="sponsor-button">Sponsor</button>
        <button className="favorite-button">Favorite</button>
      </div>
    </div>
  );
};

export default PetDetail;
