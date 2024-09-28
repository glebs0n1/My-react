import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Body.css';
import bannerImage from '../../assets/pets-banner.jpg';
import searchIcon from '../../assets/search.png';
import dogIcon from '../../assets/dog.png';
import catIcon from '../../assets/cat.png';
import animalsIcon from '../../assets/animals.png';
import likeIcon from '../../assets/like.png';
import pet1 from '../../assets/dog1.jpg';
import pet2 from '../../assets/dog2.jpeg';
import pet3 from '../../assets/dog3.jpeg';
import pet4 from '../../assets/animals.png';

const Body = ({ onLike }) => {
    // State to hold the number of likes for each pet
    const [likes, setLikes] = useState({
        buddy: 0,
        luna: 0,
        max: 0,
    });

    const [searchTerm, setSearchTerm] = useState('');

    const handleLike = (pet) => {
        setLikes((prevLikes) => ({
            ...prevLikes,
            [pet]: prevLikes[pet] + 1,
        }));
        onLike();
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value.toLowerCase());
    };

    // List of pets to be displayed
    const pets = [
        { name: 'Buddy', image: pet1, id: 'buddy' },
        { name: 'Luna', image: pet2, id: 'luna' },
        { name: 'Max', image: pet3, id: 'max' },
        { name: 'Meet them', image: pet4, id: 'special' },
    ];

    const filteredPets = pets.filter(pet => pet.name.toLowerCase().includes(searchTerm));

    return ( <
        main className = "body" > { /* Full-width banner */ } <
        section className = "banner" >
        <
        img src = { bannerImage }
        alt = "Banner"
        className = "banner-image" / >
        <
        div className = "banner-overlay" > < /div> <
        div className = "search-bar" >
        <
        div className = "search-input-container" >
        <
        input type = "text"
        placeholder = "Search for pets"
        className = "search-input"
        value = { searchTerm }
        onChange = { handleInputChange }
        /> <
        img src = { searchIcon }
        alt = "Search"
        className = "search-icon" / >
        <
        /div> <
        /div> <
        div className = "banner-text" >
        <
        h1 > Find Your New Best Friend < /h1> <
        p > Browse pets from our network of over 14, 500 shelters and rescues < /p> <
        /div> <
        /section>

        { /* Additional sections like pet types */ } <
        div className = "pet-types" >
        <
        div className = "pet-type-box" >
        <
        img src = { dogIcon }
        alt = "Dog Icon"
        className = "pet-type-icon" / >
        <
        h2 > Dogs < /h2> <
        /div> <
        div className = "pet-type-box" >
        <
        img src = { catIcon }
        alt = "Cat Icon"
        className = "pet-type-icon" / >
        <
        h2 > Cats < /h2> <
        /div> <
        div className = "pet-type-box" >
        <
        img src = { animalsIcon }
        alt = "Other Animals Icon"
        className = "pet-type-icon" / >
        <
        h2 > Other Animals < /h2> <
        /div> <
        /div>

        <
        div className = "adoption-section" >
        <
        h2 > Pets Available
        for Adoption < /h2> <
        div className = "pet-images" > {
            filteredPets.map((pet) => ( <
                div className = "pet-image-box"
                key = { pet.id } >
                <
                button className = "like-button"
                onClick = {
                    () => handleLike(pet.id) } >
                <
                img src = { likeIcon }
                alt = "Like" / >
                <
                span > { likes[pet.id] }
                Likes < /span> <
                /button> <
                img src = { pet.image }
                alt = { pet.name }
                className = "pet-image" / >
                <
                p className = "pet-name" > { pet.name } < /p> <
                /div>
            ))
        } <
        /div> <
        /div>

        { /* Planning to Adopt Section */ } <
        div className = "planning-section" >
        <
        h2 > Planning to Adopt a Pet ? < /h2> <
        div className = "story-touts-container" > { /* First Box */ } <
        a href = "/adopt-or-get-involved/"
        target = "_blank"
        rel = "noopener noreferrer"
        className = "story-tout-link" >
        <
        div className = "story-tout-box" >
        <
        img src = { pet4 }
        alt = "Pet 4"
        className = "story-tout-image" / >
        <
        h2 className = "story-tout-title" > Adoption Checklist < /h2> <
        p className = "story-tout-description" > Ensure a smooth transition
        for you and your new pet. < /p> <
        div className = "story-tout-cta" >
        <
        div className = "story-tout-button" > Learn More < /div> <
        /div> <
        /div> <
        /a> { /* Second Box */ } <
        a href = "/adopt-or-get-involved/"
        target = "_blank"
        rel = "noopener noreferrer"
        className = "story-tout-link" >
        <
        div className = "story-tout-box" >
        <
        img src = { pet4 }
        alt = "Pet 4"
        className = "story-tout-image" / >
        <
        h2 className = "story-tout-title" > Preparing Your Home < /h2> <
        p className = "story-tout-description" > Create a safe and welcoming environment
        for your new pet. < /p> <
        div className = "story-tout-cta" >
        <
        div className = "story-tout-button" > Learn More < /div> <
        /div> <
        /div> <
        /a> { /* Third Box */ } <
        a href = "/adopt-or-get-involved/"
        target = "_blank"
        rel = "noopener noreferrer"
        className = "story-tout-link" >
        <
        div className = "story-tout-box" >
        <
        img src = { pet4 }
        alt = "Pet 4"
        className = "story-tout-image" / >
        <
        h2 className = "story-tout-title" > Post - Adoption Care < /h2> <
        p className = "story-tout-description" > Ensure long - term happiness and health
        for your new family member. < /p> <
        div className = "story-tout-cta" >
        <
        div className = "story-tout-button" > Learn More < /div> <
        /div> <
        /div> <
        /a> <
        /div> <
        /div> <
        /main>
    );
};

Body.propTypes = {
    onLike: PropTypes.func.isRequired,
};

export default Body;