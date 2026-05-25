import { Link, useNavigate } from 'react-router-dom';
import { User, Heart, Menu, X, ChevronDown, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import logo from "../../assets/logo.png";
import shelterIcon from "../../assets/shelter.png";
import medicationsIcon from "../../assets/medications.png";
import trainingIcon from "../../assets/training.png";
import vetIcon from "../../assets/vet.png";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const navLinks = [
    { label: "Prieglauda", path: "/shelter", icon: shelterIcon },
    { label: "Patarimai", path: "/medications", icon: medicationsIcon },
    { label: "Dresavimas", path: "/training", icon: trainingIcon },
    { label: "Veterinarija", path: "/veterinarian", icon: vetIcon },
    { label: "Kirpykla", path: "/grooming", icon: vetIcon },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const getInitials = () => {
    if (user?.name) {
      return user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.slice(0, 2).toUpperCase() || 'U';
  };

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#5b2bc9] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 ">
          
          {/* ========== LOGO ========== */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="PetLietuva" className="h-9 w-auto" />
          </Link>

          {/* ========== DESKTOP NAV LINKS ========== */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ========== RIGHT SIDE (Desktop) ========== */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
                      {getInitials()}
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      {/* User Info */}
                      <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user.name || user.email?.split('@')[0]}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                        >
                          <User className="w-5 h-5 text-gray-500" />
                          Mano profilis
                        </Link>

                        <Link
                          to="/favorites"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                        >
                          <Heart className="w-5 h-5 text-gray-500" />
                          Mėgstami augintiniai
                        </Link>

                        <Link
                          to="/settings"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                        >
                          <SettingsIcon className="w-5 h-5 text-gray-500" />
                          Nustatymai
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-5 h-5" />
                          Atsijungti
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Not Logged In - Show Login Button */
              <Link
                to="/login"
                className="px-6 py-2 rounded-full font-semibold bg-white text-[#5b2bc9] hover:bg-gray-100 transition-all"
              >
                Prisijungti
              </Link>
            )}
          </div>

          {/* ========== MOBILE MENU BUTTON ========== */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ========== MOBILE MENU ========== */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#5b2bc9] border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/90 hover:bg-white/10 transition-colors"
              >
                <img src={link.icon} alt="" className="w-5 h-5 opacity-80" />
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            {isAuthenticated && user && (
              <div className="my-2 border-t border-white/10" />
            )}

            {/* User Menu (Mobile) */}
            {isAuthenticated && user ? (
              <>
                {/* User Info */}
                <div className="px-4 py-3 bg-white/10 rounded-lg mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                      {getInitials()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {user.name || user.email?.split('@')[0]}
                      </p>
                      <p className="text-xs text-white/70 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Profile Links */}
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/90 hover:bg-white/10 transition-colors"
                >
                  <User size={18} />
                  Mano profilis
                </Link>

                <Link
                  to="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/90 hover:bg-white/10 transition-colors"
                >
                  <Heart size={18} />
                  Mėgstami augintiniai
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/90 hover:bg-white/10 transition-colors"
                >
                  <SettingsIcon size={18} />
                  Nustatymai
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-300 hover:bg-red-500/20 transition-colors mt-2"
                >
                  <LogOut size={18} />
                  Atsijungti
                </button>
              </>
            ) : (
              /* Not Logged In - Mobile */
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-center font-semibold bg-white text-[#5b2bc9] hover:bg-gray-100 transition-colors"
              >
                Prisijungti
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;