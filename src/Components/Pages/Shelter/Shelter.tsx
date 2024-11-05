import React from 'react';

const Shelter: React.FC = () => {
    return (
        <div className="shelter-page">
            <h1>Welcome to Our Shelter</h1>
            <p>
                Our mission is to provide a safe haven for animals in need. We aim to rescue, rehabilitate, and rehome animals in a loving environment.
            </p>

            <h2>Available Animals for Adoption</h2>
            <div className="animal-list">
                <div className="animal-card">
                    <img src="path_to_animal_image" alt="Animal Name" />
                    <h3>Animal Name</h3>
                    <p>Age: 2 years</p>
                    <p>Breed: Labrador</p>
                    <button>Adopt Me!</button>
                </div>
                {/* Add more animal cards as needed */}
            </div>

            <h2>How You Can Help</h2>
            <p>
                There are many ways you can help support our shelter. Consider making a donation, volunteering your time, or fostering a pet in need.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions or would like more information, please contact us at:</p>
            <p>Email: info@shelter.com</p>
            <p>Phone: (123) 456-7890</p>
        </div>
    );
};

export default Shelter;
