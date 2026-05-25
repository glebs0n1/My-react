import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/logo.png";
import shelterIcon from "../../assets/shelter.png";
import medicationsIcon from "../../assets/medications.png";
import trainingIcon from "../../assets/training.png";
import vetIcon from "../../assets/vet.png";

import Modal from "../Modal/Modal";
import LoginForm from "../../Login/LoginForm";
import RegistrationForm from "../../Registration/RegistrationForm";

const NAV_ITEMS = [
  { name: "Prieglaudą", path: "/shelter", icon: shelterIcon },
  { name: "Patarimai", path: "/medications", icon: medicationsIcon },
  { name: "Dresavimas", path: "/training", icon: trainingIcon },
  { name: "Veterinarijos", path: "/veterinarian", icon: vetIcon },
  { name: "Kirpykla", path: "/grooming", icon: vetIcon },
];

const TRANSPARENT_HERO_PATHS = new Set([
  "/",
  "/medications",
  "/vaistai",
  "/training",
  "/dresura",
  "/veterinarian",
  "/veterinaras",
  "/grooming",
  "/kirpimas",
  "/shelter",
  "/prieglaudos",
  "/about",
  "/apie-mus",
  "/walking",
]);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loginMode, setLoginMode] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Normalize so capitalized URLs (e.g. /Grooming) still match the lowercase set.
  const hasTransparentHero = TRANSPARENT_HERO_PATHS.has(location.pathname.toLowerCase());
  const showSolidHeader = isScrolled || !hasTransparentHero;

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Debug: Log user state changes
  useEffect(() => {
    console.log("Header - User state:", user);
    console.log("Header - Is authenticated:", isAuthenticated);
  }, [user, isAuthenticated]);

  /* ================= SCROLL DETECTION ================= */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= CLOSE DROPDOWN ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  /* ================= ACTIONS ================= */
  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const openLoginModal = () => {
    setLoginMode(true);
    setModalOpen(true);
  };

  const openRegisterModal = () => {
    setLoginMode(false);
    setModalOpen(true);
  };

  const handleLoginSuccess = (userData) => {
    console.log("Login success in Header:", userData);
    setModalOpen(false);
  };

  const handleRegisterSuccess = (userData) => {
    console.log("Register success in Header:", userData);
    setModalOpen(false);
  };

  const getUserInitials = (email) => {
    if (typeof email !== "string") return "?";
    return email
      .split("@")[0]
      .split(".")
      .map((p) => p[0]?.toUpperCase())
      .join("");
  };

  // Check if user is logged in (use both user object and isAuthenticated)
  const isUserLoggedIn = isAuthenticated && user && user.email;

  return (
    <>
      <header
        className={`
          fixed top-0 w-full z-50 transition-all duration-300
          ${showSolidHeader
            ? 'bg-[#5b2bc9] shadow-md'
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

          {/* ================= LOGO ================= */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="PetAdopt" className="h-9 w-auto" />
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <img
                  src={item.icon}
                  alt=""
                  className="w-6 h-6 object-contain opacity-90"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex items-center gap-3">
            {isUserLoggedIn ? (
              /* ================= LOGGED IN USER ================= */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm">
                    {getUserInitials(user.email)}
                  </div>
                  <span className="hidden lg:block text-white text-sm font-medium max-w-[150px] truncate">
                    {user.email.split("@")[0]}
                  </span>
                  <svg
                    className={`w-4 h-4 text-white transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* ================= MENU ITEMS ================= */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>

                      <Link
                        to="/favorites"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Favorites
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                    </div>

                    {/* ================= LOGOUT ================= */}
                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ===== NOT LOGGED IN ===== */
              <div className="flex gap-2">
                <button
                  onClick={openLoginModal}
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-xl transition"
                > 
                  Prisijungti 
                </button>
                <button
                  onClick={openRegisterModal}
                  className="px-4 py-2 bg-white text-[#5b2bc9] rounded-xl font-semibold hover:bg-white/90 transition"
                >
                  Užsiregistruoti
                </button>
              </div>
            )}

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden text-white text-2xl"
              aria-label="Toggle menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
                  
        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="md:hidden bg-[#5b2bc9] border-t border-white/10">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="flex gap-4 px-6 py-4 text-white/90 hover:bg-white/10 transition"
              >
                <img src={item.icon} alt="" className="w-6 h-6" />
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* ================= AUTH MODAL ================= */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {loginMode ? (
          <LoginForm
            onClose={() => setModalOpen(false)}
            onSuccess={handleLoginSuccess}
            switchToRegister={() => setLoginMode(false)}
          />
        ) : (
          <RegistrationForm
            onClose={() => setModalOpen(false)}
            onSuccess={handleRegisterSuccess}
            switchToLogin={() => setLoginMode(true)}
          />
        )}
      </Modal>
    </>
  );
};

export default Header;