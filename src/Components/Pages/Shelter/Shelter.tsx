import React, { useState } from 'react';
import './Shelter.css';
import bannerImage from '../../../assets/pets-banner.jpg';
import Donation from '../../Donation/Donation';
import Filters from '../../Filters/Filters';
import PetCard from '../../PetCard/PetCard';
import Like from '../../Like/Like';

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
            { id: 1, name: 'Buddy', image: 'https://via.placeholder.com/200' },
            { id: 2, name: 'Bella', image: 'https://via.placeholder.com/200' },
            { id: 3, name: 'Charlie', image: 'https://via.placeholder.com/200' },
            { id: 4, name: 'Max', image: 'https://via.placeholder.com/200' },
            { id: 5, name: 'Lucy', image: 'https://via.placeholder.com/200' },
            { id: 6, name: 'Lucy', image: 'https://via.placeholder.com/200' },
            { id: 7, name: 'Lucy', image: 'https://via.placeholder.com/200' },
            { id: 8, name: 'Lucy', image: 'https://via.placeholder.com/200' },

          ]);
  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Searching for pet name:', searchQuery);
    console.log('Filters applied:', filters);
  };

  const handleLike = (id) => console.log('Liked pet with ID:', id);

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
      
      <div className="vertical-line"></div>
        <div className="search-bar">
          <div className="pet-search-input-container">
            <input
              type="text"
              placeholder="Search for pets..."
              className="pet-search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-icon" onClick={handleSearchSubmit}>
            </button>
          </div>
        </div>

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

        <div className="pets-results">
          <div className="pets-grid">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} handleLike={handleLike} />
            ))}
          </div>
        </div>
     </div>

        <div className="donation-section">
          <Donation />
        </div>
    </div>
  );
};

export default ShelterPage;
