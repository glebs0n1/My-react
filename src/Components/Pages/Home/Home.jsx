import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import Donation from '../../Donation/Donation';
import bannerImage from '../../../assets/pets-banner.jpg';
import searchIcon from '../../../assets/search.png';
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
    const [searchTerm, setSearchTerm] = useState('');

        const pets = [
            { name: 'Buddy', image: pet1, id: 'buddy' },
            { name: 'Luna', image: pet2, id: 'luna' },
            { name: 'Max', image: pet3, id: 'max' },
            { name: 'Meet them', image: pet4, id: 'special' },
        ];
    
        const [likes, setLikes] = useState({
            buddy: 0,
            luna: 0,
            max: 0,
            special: 0,
        });
    
        const handleLike = (petId) => {
            setLikes((prevLikes) => ({
                ...prevLikes,
                [petId]: prevLikes[petId] + 1,
            }));
            onLike();
        };
    
        const handleInputChange = (event) => {
            setSearchTerm(event.target.value.toLowerCase());
        };
    
        const filteredPets = pets.filter(pet =>
            pet.name.toLowerCase().includes(searchTerm)
        );
    
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
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <button className="search-icon">
                        <img src={searchIcon} alt="Search" />
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
    
                <div className="planning-section">
                    <h2>Planning to Adopt a Pet?</h2>
                    <div className="shelter-banner">
                        <img src={shelterImage} alt="Shelter" className="shelter-image" />
                        <div className="donation-text">
                            <h3>Our Shelter is Overcrowded!</h3>
                            <p>Be a Hero – Help a Pet Find a Loving Home Today!</p>
                            <button className="shelter-button">Donate Now</button>
                        </div>
                    </div>
                </div>
            </main>
        );
    };
    

Home.propTypes = {
    onLike: PropTypes.func.isRequired,
};

export default Home;
