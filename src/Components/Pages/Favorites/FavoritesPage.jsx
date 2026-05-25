import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useLikes } from "../../Like/LikesContext";
import PetCard from "../../PetCard/PetCard";
import Navbar from "../../NavBar/Navbar"; // ✅ FIXED PATH

const FavoritesPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { likedItems } = useLikes();

  const [loading, setLoading] = useState(true);

  // ========== FORCE NAVBAR BACKGROUND ==========
  useEffect(() => {
    document.body.classList.add('force-navbar-background');
    return () => document.body.classList.remove('force-navbar-background');
  }, []);
  // ==============================================

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    setLoading(false);
  }, [user, navigate]);

  const handleBackToExplore = () => {
    navigate("/shelter");
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <>
        <Navbar /> {/* ✅ NAVBAR IN LOADING TOO */}
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-purple-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading favorites...</p>
          </div>
        </div>
      </>
    );
  }

  /* ================= NOT AUTHENTICATED ================= */
  if (!isAuthenticated || !user) {
    return (
      <>
        <Navbar /> {/* ✅ NAVBAR HERE */}
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4 pt-16">
          <div className="w-full max-w-md text-center animate-fade-in">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
              <span className="text-4xl">🐾</span>
            </div>
            <h1 className="mb-3 text-3xl font-bold text-gray-900">
              Prisijunkite
            </h1>
            <p className="mb-8 text-gray-600">
              Prisijunkite, kad galėtumėte peržiūrėti savo mėgstamus gyvūnėlius.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-all hover:bg-purple-700"
            >
              Grįžti į pradžią
            </button>
          </div>
        </div>
      </>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <>
      <Navbar /> {/* ✅ NAVBAR HERE TOO */}
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 pt-16 pb-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Mano mėgstamiausi
              </h1>
              <p className="text-gray-600">
                {likedItems.length > 0
                  ? `Turite ${likedItems.length} mėgstamą ${
                      likedItems.length === 1 ? "gyvūnėlį" : "gyvūnėlių"
                    }`
                  : "Jūs neturite mėgstamų"}
              </p>
            </div>

            <button
              onClick={handleBackToExplore}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition shadow-sm hover:shadow-md"
            >
              Atraskite daugiau gyvūnų
            </button>
          </div>

          {/* EMPTY STATE */}
          {likedItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Dar nėra mėgstamų 🐾
              </h2>
              <p className="text-gray-600 mb-8">
                Pradėkite savo paiešką ir pridėkite gyvūnėlius prie savo mėgstamiausių
              </p>
              <button
                onClick={handleBackToExplore}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
              >
                Pradėti paiešką
              </button>
            </div>
          ) : (
            /* FAVORITES GRID — IDENTIŠKOS KORTELĖS */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {likedItems.map((pet: any) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;