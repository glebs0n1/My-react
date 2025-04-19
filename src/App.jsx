import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from './components/Forms/LoginForm';
import RegistrationForm from './components/Forms/RegistrationForm';
import Profile from './components/User/Profile/Profile'; 
import Header from "./Components/Header/Header";  
import Footer from "./Components/Footer/Footer";    
import Home from "./Components/Pages/Home/Home";   
import PetShelterForm from "./Components/Pages/LoginedUser/LoginedUser";   
import Shelter from "./Components/Pages/Shelter/Shelter";  
import Medications from "./Components/Pages/Medications/Medications";  
import PetDetail from "./Components/PetDetail/PetDetail";
import Profile from "./User/Profile/Profile";

const App = () => {
  const [filteredPets, setFilteredPets] = useState([
    { id: 1, name: 'Buddy', image: '/path/to/buddy.jpg' },
    { id: 2, name: 'Bella', image: '/path/to/bella.jpg' },
    { id: 3, name: 'Charlie', image: '/path/to/charlie.jpg' },
    { id: 4, name: 'Max', image: '/path/to/max.jpg' },
    { id: 5, name: 'Lucy', image: '/path/to/lucy.jpg' }
  ]);

  const handleLike = (id) => {
    console.log('Liked pet with ID:', id);
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelter" element={<Shelter filteredPets={filteredPets} handleLike={handleLike} />} />
        <Route path="/medications" element={<Medications handleLike={handleLike} />} />
        <Route path="/PetShelterForm" element={<PetShelterForm />} />
        <Route path="/pet/:id" element={<PetDetail pets={filteredPets} />}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/profile" element={<Profile />} /> {}
      </Routes>   
      <Footer />
    </div>
  );
};

export default App;




