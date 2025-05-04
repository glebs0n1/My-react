import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import './Shelter.css';
import bannerImage from '../../../assets/pets-banner.jpg';
import Donation from '../../Donation/Donation';
import Filters from '../../Filters/Filters';
import PetCard from '../../PetCard/PetCard';  
import { Pet } from '../../../types'; 
import rawPets from '../../../data/pets';
const initialPets = rawPets as Pet[];

const ShelterPage: React.FC = () => {
  const location = useLocation();
  const newPet = location.state?.newPet;

  const [pets, setPets] = useState<Pet[]>(
    newPet ? [...initialPets, newPet] : initialPets
  );

  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    age: "",
    size: "",
    gender: "",
    coatLength: "",
    color: "",
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Searching for pet name:', searchQuery);
    console.log('Filters applied:', filters);
  };

  // Real-time filtered pets
  const filteredPets = pets.filter((pet) => {
    const matchesQuery = pet.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = Object.entries(filters).every(([key, value]) =>
      value ? pet[key as keyof typeof pet] === value : true
    );
    return matchesQuery && matchesFilters;
  });

  const handleLike = (id: number) => {
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
          <aside className="filters-sidebar">
            <Filters
              searchQuery={searchQuery}
              filters={filters}
              handleSearchChange={handleSearchChange}
              handleFilterChange={handleFilterChange}
              handleSearchSubmit={handleSearchSubmit}
            />
          </aside>

         <main className="pets-results">
            <div className="pet-cards">
              {filteredPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} handleLike={handleLike} />
              ))}
            </div>
         </main>
       </div>

        <div className="donation-section">
          <Donation />
        </div>
    </div>
  );
};

export default ShelterPage;
