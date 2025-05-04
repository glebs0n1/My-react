import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Pages/Home/Home";
import PetDetail from "./Components/PetDetail/PetDetail";
import AddPetForm from "./Components/AddPetCard/AddPetForm";
import Medications from "./Components/Pages/Medications/Medications";
import ShelterPage from './Components/Pages/Shelter/Shelter'; 
import PetShelterForm from "./Components/Pages/LoginedUser/LoginedUser";
import LoginForm from "./Login/LoginForm";
import RegistrationForm from "./Registration/RegistrationForm";
import Profile from "./User/Profile/Profile";
import pets from "./data/pets"; 

const App = () => {
  const handleLike = (id) => {
    console.log("Liked pet with ID:", id);
  };

  const handleAddPet = (newPet) => {
    console.log("New pet submitted:", newPet);
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shelter" element={<ShelterPage />} />
        <Route path="/pet/:id" element={<PetDetail pets={pets} />} />
        <Route path="/pet-details/:id" element={<PetDetail pets={pets} />} />
        <Route path="/add-pet" element={<AddPetForm onAddPet={handleAddPet} />} />
        <Route path="/medications" element={<Medications handleLike={handleLike} />} />
        <Route path="/PetShelterForm" element={<PetShelterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
