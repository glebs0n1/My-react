import React from 'react';
import './SearchBar.css';
import searchIcon from '../../assets/search.png';

const SearchBar = ({ searchTerm, onSearchChange, pets }) => {
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchTerm)
  );

  return (
    <main className="search-bar-container">
      <section className="search-section">
        <div className="search-bar">
          <div className="pet-search-input-container">
            <input
              type="text"
              placeholder="Search for pets..."
              className="pet-search-input"
              value={searchTerm}
              onChange={onSearchChange} // Update the search term
            />
            <button className="search-icon">
              <img src={searchIcon} alt="Search" />
            </button>
          </div>
        </div>
        <div className="banner-line"></div>
      </section>

      {/* Display filtered pets */}
      <section className="search-results">
        <div className="pets-grid">
          {filteredPets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <img src={pet.image} alt={pet.name} className="pet-image" />
              <h3 className="pet-name">{pet.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SearchBar;
