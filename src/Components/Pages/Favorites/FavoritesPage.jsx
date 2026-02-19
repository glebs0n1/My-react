import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useLikes } from "../../Like/LikesContext";
import PetCard from "../../PetCard/PetCard";

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { likedItems } = useLikes();

  const [loading, setLoading] = useState(true);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading favorites...</p>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              My Favorites
            </h1>
            <p className="text-gray-600">
              {likedItems.length > 0
                ? `You have ${likedItems.length} favorite ${
                    likedItems.length === 1 ? "pet" : "pets"
                  }`
                : "No favorites yet"}
            </p>
          </div>

          <button
            onClick={handleBackToExplore}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition shadow-sm hover:shadow-md"
          >
            Explore more pets
          </button>
        </div>

        {/* EMPTY STATE */}
        {likedItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No favorites yet 🐾
            </h2>
            <p className="text-gray-600 mb-8">
              Start exploring and add pets to your favorites by clicking the heart icon.
            </p>
            <button
              onClick={handleBackToExplore}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
            >
              Start exploring
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
  );
};

export default FavoritesPage;