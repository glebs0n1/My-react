import React, { useState } from 'react';
import './Shelter.css';
import bannerImage from '../../../assets/pets-banner.jpg';
import Donation from '../../Donation/Donation';
import Filters from '../../Filters/Filters';
import PetCard from '../../PetCard/PetCard';
import Like from '../../Like/Like'; // Import the Like component

const ShelterPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    age: "",
    size: "",
    gender: "",
    coatLength: "",
    color: "",
  });
  
  const [filteredPets, setFilteredPets] = useState([
    {
      id: 1,
      name: 'Buddy',
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 2,
      name: 'Bella',
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 3,
      name: 'Charlie',
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 4,
      name: 'Max',
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 5,
      name: 'Lucy',
      image: 'https://via.placeholder.com/200',
    },
  ]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle search submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Searching for pet name:', searchQuery);
    console.log('Filters applied:', filters);
  };

  // Handle liking a pet
  const handleLike = (id) => {
    console.log('Liked pet with ID:', id);
  };

  return (
    <div className="shelter-page">
      <main className="body">
        <section className="banner">
          <img src={bannerImage} alt="Banner" className="banner-image" />
          <div className="banner-overlay"></div>
          <div className="banner-text">
            <h1>Find Your New Best Friend</h1>
            <p>Browse pets from our network of over 14,500 shelters and rescues</p>
          </div>
          <div className="banner-line"></div>
        </section>
      </main>

      <div className="content-container">
        <div className="filters-sidebar">
          <Filters 
            searchQuery={searchQuery}
            filters={filters}
            handleSearchChange={handleSearchChange}
            handleFilterChange={handleFilterChange}
            handleSearchSubmit={handleSearchSubmit}
          />
        </div>

        {/* Vertical Line */}
        <div className="vertical-line"></div>

        <div className="pets-results">
          <div className="pets-grid">
            {filteredPets.map((pet) => (
              <div key={pet.id} className="pet-card-container">
                {/* Render Like Component for Each Pet */}
                <Like onClick={() => handleLike(pet.id)} />
                <PetCard pet={pet} />
              </div>
            ))}
          </div>
        </div>

        <div className="donation-section">
          <Donation />
        </div>
      </div>
    </div>
  );
};

export default ShelterPage;
