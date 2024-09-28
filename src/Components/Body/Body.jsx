import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Body.css';
import bannerImage from '../../assets/pets-banner.jpg';
import searchIcon from '../../assets/search.png';
import dogIcon from '../../assets/dog.png';
import catIcon from '../../assets/cat.png';
import donationImage from '../../assets/donationImage.png';
import animalsIcon from '../../assets/animals.png';
import likeIcon from '../../assets/like.png';
import pet1 from '../../assets/dog1.jpg';
import pet2 from '../../assets/dog2.jpeg';
import pet3 from '../../assets/dog3.jpeg';
import pet4 from '../../assets/animals.png';

const Body = ({ onLike }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // List of pets to be displayed
    const pets = [
        { name: 'Buddy', image: pet1, id: 'buddy' },
        { name: 'Luna', image: pet2, id: 'luna' },
        { name: 'Max', image: pet3, id: 'max' },
        { name: 'Meet them', image: pet4, id: 'special' },
    ];

    // State to track likes for each pet
    const [likes, setLikes] = useState({
        buddy: 0,
        luna: 0,
        max: 0,
        special: 0,
    });

    // Handle liking a pet
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
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="Search for pets"
                            className="search-input"
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <img src={searchIcon} alt="Search" className="search-icon" />
                    </div>
                </div>
                <div className="banner-line"></div>
            </section>

            <div className="pet-types">
                <div className="pet-type-box">
                    <img src={dogIcon} alt="Dog Icon" className="pet-type-icon" />
                    <h2>Dogs</h2>
                </div>
                <div className="pet-type-box">
                    <img src={catIcon} alt="Cat Icon" className="pet-type-icon" />
                    <h2>Cats</h2>
                </div>
                <div className="pet-type-box">
                    <img src={animalsIcon} alt="Other Animals Icon" className="pet-type-icon" />
                    <h2>Other Animals</h2>
                </div>
            </div>

            {/* Donation Banner */}
            <div className="donation-banner">
                <img src={donationImage} alt="Donate" className="donation-image" />
                <div className="donation-text">
                    <h2>Help Us Make a Difference</h2>
                    <p>Your donation helps us care for pets in need.</p>
                    <button className="donate-button">Donate Now</button>
                </div>
            </div>

            {/* Adoption Section */}
            <div className="adoption-section">
                <h2>Pets Available for Adoption</h2>
                <div className="pet-images">
                    {filteredPets.slice(0, filteredPets.length - 1).map((pet) => (
                        <div className="pet-image-box" key={pet.id}>
                            <button className="like-body-button" onClick={() => handleLike(pet.id)}>
                                <img src={likeIcon} alt="Like" />
                            </button>
                            <img src={pet.image} alt={pet.name} className="pet-image" />
                            <p className="pet-name">{pet.name}</p>
                            <span className="like-count">{likes[pet.id]} Likes</span> {/* Display likes count */}
                        </div>
                    ))}
                    {/* Last Pet Box */}
                    <div className="last-pet-image-box">
                        <img src={pets[pets.length - 1].image} alt="Meet them" className="last-pet-image" />
                        <p className="last-pet-name">Meet them</p>
                    </div>
                </div>
            </div>

            {/* Planning to Adopt Section */}
            <div className="planning-section">
                <h2>Planning to Adopt a Pet?</h2>
                <div className="story-touts-container">
                    {/* Place story boxes or relevant content here */}
                </div>
            </div>
        </main>
    );
};

Body.propTypes = {
    onLike: PropTypes.func.isRequired,
};

export default Body;