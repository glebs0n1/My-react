import React, { useState, useEffect } from "react";
import PetCard from "../PetCard/PetCard";
import Pagination from "../Pagination/Pagination";

interface PetGridProps {
  pets: any[];
  onResetFilters?: () => void;
  itemsPerPage?: number;
}

const PetGrid: React.FC<PetGridProps> = ({ 
  pets, 
  onResetFilters,
  itemsPerPage = 20 
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when pets array changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pets]);

  // Calculate pagination
  const totalPages = Math.ceil(pets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPets = pets.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Empty state
  if (!pets || pets.length === 0) {
    return (
      <div className="flex flex-col items-center py-24 text-center">
        <div className="mb-4 text-6xl">🐾</div>

        <h3 className="mb-2 text-xl font-semibold text-gray-800">
          Nerasta gyvūnų
        </h3>

        <p className="mb-6 max-w-sm text-gray-500">
        Pabandykite pakeisti filtrus arba paieškos žodžius.
        </p>

        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition"
          >
            Išvalyti filtrus
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Pet Grid - Responsive with larger cards */}
      <div
          className="
            grid
            gap-9
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-[repeat(3,minmax(320px,1fr))]
          "
        >        {currentPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default PetGrid;