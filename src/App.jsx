import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';

// Context
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider, useToast } from "./context/ToastContext";
import { LikesProvider } from "./Components/Like/LikesContext";
import { LanguageProvider } from "./context/languageContext";

// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import DonateModal from "./Components/Donation/DonateModal";
import ScrollToTop from "./Components/ScrollToTop";
import ToastContainer from "./Components/Toast/ToastContainer";
import Modal from "./Components/Modal/Modal";

// Pages
import Home from "./Components/Pages/Home/Home";
import Contact from "./Components/Pages/Contact/Contact";
import About from "./Components/Pages/About/About";
import Careers from "./Components/Pages/Careers/Careers";
import Shelter from "./Components/Pages/Shelter/Shelter";
import FAQ from "./Components/Pages/FAQ/Faq";
import Partnerships from "./Components/Pages/Partnerships/Partnerships";
import Medications from "./Components/Pages/Medications/Medications";
import CategoryPage from "./Components/Pages/Medications/CategoryPage";
import PetShelterForm from "./Components/Pages/LoginedUser/LoginedUser";
import PetDetail from "./Components/PetDetail/PetDetail";
import LoginForm from "./Login/LoginForm"; 
import RegistrationForm from "./Registration/RegistrationForm";
import Profile from "./User/Profile/Profile";
import ProfileEdit from "./User/Profile/ProfileEdit";
import Training from "./Components/Pages/Training/Training";
import Veterinarian from "./Components/Pages/Veterinarian/Veterinarian";
import Grooming from "./Components/Pages/Grooming/Grooming";
import Walking from "./Components/Pages/DogWalking/Walking";
import Dogs from "./Components/Animals/Dogs";
import Cats from "./Components/Animals/Cats";
import OtherAnimals from "./Components/Animals/OtherAnimals";
import FavoritesPage from "./Components/Pages/Favorites/FavoritesPage";
import SettingsPage from "./Components/Pages/Settings/Settings";

// Wrapper component to use Toast inside ToastProvider
const AppContent = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { showLoginPrompt } = useToast();

  // Klausymasis showLoginToast event
  useEffect(() => {
    const handleShowLoginToast = () => {
      showLoginPrompt(
        () => setIsLoginModalOpen(true),
        () => setIsRegisterModalOpen(true)
      );
    };

    window.addEventListener('showLoginToast', handleShowLoginToast);
    return () => window.removeEventListener('showLoginToast', handleShowLoginToast);
  }, [showLoginPrompt]);

  return (
    <LikesProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <Header />
          
          {/* Toast Container */}
          <ToastContainer />

          <Routes>       
            {/* Shelter */}
            <Route path="/" element={<Home />} />
            
            {/* Contact */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/kontaktai" element={<Contact />} />

            {/* About */}
            <Route path="/about" element={<About />} />
            <Route path="/apie-mus" element={<About />} />

            {/* Career */}
            <Route path="/careers" element={<Careers />} />
            <Route path="/darbas" element={<Careers />} />

            <Route path="/shelter" element={<Shelter />} />
            <Route path="/prieglaudos" element={<Shelter />} />
            

            {/* FAQ */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/dazniausiai-uzduodami-klausimai" element={<FAQ />} />

            {/* Partnership */}
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/partnerystės" element={<Partnerships />} />

            {/* Medications */}
            <Route path="/medications" element={<Medications />} />
            <Route path="/vaistai" element={<Medications />} />
            <Route path="/medications/:slug" element={<CategoryPage />} />
            <Route path="/vaistai/:slug" element={<CategoryPage />} />
            <Route path="/lekarstva/:slug" element={<CategoryPage />} />

            {/* Article sections (SEO landing pages) */}
            <Route path="/health/:slug" element={<CategoryPage />} />
            <Route path="/nutrition/:slug" element={<CategoryPage />} />
            <Route path="/adoption/:slug" element={<CategoryPage />} />
            <Route path="/grooming/:slug" element={<CategoryPage />} />
            <Route path="/training/:slug" element={<CategoryPage />} />
            <Route path="/vets/:slug" element={<CategoryPage />} />
            <Route path="/care/:slug" element={<CategoryPage />} />
            
            {/* Training */}
            <Route path="/training" element={<Training />} />
            <Route path="/dresura" element={<Training />} />
            
            {/* Veterinarian */}
            <Route path="/veterinarian" element={<Veterinarian />} />
            <Route path="/veterinaras" element={<Veterinarian />} />
            
            {/* Grooming */}
            <Route path="/grooming" element={<Grooming />} />
            <Route path="/kirpimas" element={<Grooming />} />
            
            <Route path="/petshelterform" element={<PetShelterForm />} />
            <Route path="/pet/:slug" element={<PetDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/walking" element={<Walking />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/donate" element={<DonateModal />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Animals Categories */}
            <Route path="/dogs" element={<Dogs />} />
            <Route path="/cats" element={<Cats />} />
            <Route path="/other-animals" element={<OtherAnimals />} />

            {/* Auth Pages */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>

          {/* Auth Modals */}
          <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
            <LoginForm
              onClose={() => setIsLoginModalOpen(false)}
              switchToRegister={() => {
                setIsLoginModalOpen(false);
                setIsRegisterModalOpen(true);
              }}
            />
          </Modal>

          <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
            <RegistrationForm
              onClose={() => setIsRegisterModalOpen(false)}
              switchToLogin={() => {
                setIsRegisterModalOpen(false);
                setIsLoginModalOpen(true);
              }}
            />
          </Modal>

          <Footer />
        </Router>
      </LanguageProvider>
    </LikesProvider>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;