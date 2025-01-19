import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import Donation from '../../Donation/Donation';
import SearchBar from '../../Search/SearchBar';
import bannerImage from '../../../assets/pets-banner.jpg';
import dogIcon from '../../../assets/dog.png';
import catIcon from '../../../assets/cat.png';
import donationImage from '../../../assets/donationImage.png';
import PetCard from '../../PetCard/PetCard';
import animalsIcon from '../../../assets/animals.png';
import pet1 from '../../../assets/dog1.jpg';
import pet2 from '../../../assets/dog2.jpeg';
import pet3 from '../../../assets/dog3.jpeg';
import pet4 from '../../../assets/animals.png';
import shelterImage from '../../../assets/shelter.png';
import { Link } from 'react-router-dom';

const Home = ({ onLike }) => {
    const [ setSearchQuery] = useState('');

    //handle search bar component
        const handleSearchChange = (event) => {
            setSearchQuery(event.target.value.toLowerCase());
        };
        const handleLike = (id) => console.log('Liked pet with ID:', id);

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

        return (
            <main className="body">
              <section className="banner">
            <img src={bannerImage} alt="Banner" className="banner-image" />
            <div className="banner-overlay"></div>
            <div className="banner-text">
                <h1>Find Your New Best Friend</h1>
                <p>Browse pets from our network of over 14,500 shelters and rescues</p>
            </div>
            <div className="search-bar">
                    <div className="pet-search-input-container">
                        <input
                            type="text"
                            placeholder="Search for pets..."
                            className="pet-search-input"
                            value={setSearchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="search-icon">
                            🔍
                        </button>
                    </div>
                </div>
                <div className="banner-line"></div>
            </section>
    
            <div className="pet-types">
                <div className="pet-type-box">
                    <Link to="/dogs" className="pet-type-link">
                        <img src={dogIcon} alt="Dog Icon" className="pet-type-icon" />
                        <h2>Dogs</h2>
                    </Link>
                </div>
                <div className="pet-type-box">
                    <Link to="/cats" className="pet-type-link">
                        <img src={catIcon} alt="Cat Icon" className="pet-type-icon" />
                        <h2>Cats</h2>
                    </Link>
                </div>
                <div className="pet-type-box">
                    <Link to="/other-animals" className="pet-type-link">
                        <img src={animalsIcon} alt="Other Animals Icon" className="pet-type-icon" />
                        <h2>Other Animals</h2>
                    </Link>
                </div>
            </div>
            
            <div className="donation-section">
          <Donation />
        </div>

        <div className="pets-results center">
            <h1>Pets Available for Adoption</h1>
            <div className="pets-grid">
                {filteredPets.map((pet) => (
                <Link to={`/pet/${pet.id}`} key={pet.id} className="pet-link">
                    <PetCard pet={pet} handleLike={handleLike} />
                </Link>
                ))}
            </div>
        </div>
    
                <div className="shelter-section">
                    <h1>Planning to Adopt a Pet?</h1>
                    <div className="shelter-banner">
                    <img src={shelterImage} alt="Donate" className="shelter-image" />
                        <div className="shelter-text">
                            <h2>Our Shelter is Overcrowded!</h2>
                            <p>Be a Hero – Help a Pet Find a Loving Home Today!</p>
                            <button className="donate-button">Donate Now</button>
                        </div>
                    </div>
                </div>
            </main>
        );
    };
    


Home.propTypes = {
    onLike: PropTypes.func.isRequired,
    pets: PropTypes.array.isRequired,  
};

export default Home;
