import React, { useState } from 'react';
import medicationsBanner from '../../../assets/medications.jpg';
import allergies from '../../../assets/allergies.svg';
import anxiety from '../../../assets/anxiety.svg';
import Diabetes from '../../../assets/diabet.svg';
import Diarrhea from '../../../assets/diarrhea.svg';
import Ticks from '../../../assets/ticks.svg';
import Heartworms from '../../../assets/heartworm.svg';
import Infections from '../../../assets/infections.svg';
import Vomiting from '../../../assets/vomiting.svg';
import Pain from '../../../assets/pain.svg';
import Seizures from '../../../assets/seizures.svg';
import Stomach from '../../../assets/stomach.svg';
import './Medications.css';
import Donation from '../../Donation/Donation';
import Filters from '../../Filters/Filters';
import PetCard from '../../PetCard/PetCard';
import Like from '../../Like/Like';



const Medications = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Searching for pet name:', searchQuery);
  };

  return (
    <div className="shelter-page">
      <main className="body">
        <section className="banner">
          <img src={medicationsBanner} alt="Banner" className="banner-image" />
          <div className="banner-overlay"></div>
          <div className="banner-text">
            <h1> Common Veterinary Medications</h1>
            <p>Helping you find the right treatment for your pet's needs.</p>
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
            />
            <button className="search-icon" onClick={handleSearchSubmit}>
            </button>
          </div>
        </div>

        <div className="medication-category-container">
            <div className="medication-category-box">
            <img src={allergies}  alt="Allergies & Itching" className="category-image" />
                <div className="category-info">
                <h3>Allergies & Itching</h3>
                </div>
            </div>
            
            <div className="medication-category-box">
            <img src={anxiety}  alt="Anxiety & Sedation" className="category-image" />
                <div className="category-info">
                <h3>Anxiety & Sedation</h3>
                </div>
            </div>

            <div className="medication-category-box">
            <img src={Diabetes}  alt="Diabetes" className="category-image" />
                <div className="category-info">
                <h3>Diabetes</h3>
                </div>
            </div>

            <div className="medication-category-box">
            <img src={Diarrhea}  alt="Diarrhea" className="category-image" />
                <div className="category-info">
                <h3>Diarrhea</h3>
                </div>
            </div>

            <div className="medication-category-box">
            <img src={Ticks}  alt="Fleas & Ticks" className="category-image" />
                <div className="category-info">
                <h3>Fleas & Ticks</h3>
                </div>
            </div>

            <div className="medication-category-box">
            <img src={Heartworms}  alt="Heartworms" className="category-image" />
                <div className="category-info">
                <h3>Heartworms</h3>
                </div>
            </div>

            <div className="medication-category-box">
            <img src={Infections}   alt="Infections" className="category-image" />
                <div className="category-info">
                <h3>Infections</h3>
                </div>
            </div>

            <div className="medication-category-box">
            <img src={Vomiting}  alt="Nausea & Vomiting" className="category-image" />
                <div className="category-info">
                <h3>Nausea & Vomiting</h3>
                </div>
            </div>

            <div className="medication-category-box">
            <img src={Pain} alt="Pain & Arthritis" className="category-image" />
                <div className="category-info">
                <h3>Pain & Arthritis</h3>
                </div>
            </div>

            <div className="medication-category-box">
            <img src={Seizures} alt="Seizures" className="category-image" />
                <div className="category-info">
                <h3>Seizures</h3>
                </div>
            </div>

            <div className="medication-category-box">
            <img src={Stomach}  alt="Stomach Ulcers" className="category-image" />
                <div className="category-info">
                <h3>Stomach Ulcers</h3>
                </div>
            </div>
        </div>
      
        <div className="donation-section">
          <Donation />
        </div>
    </div>
  );
};

export default Medications;
