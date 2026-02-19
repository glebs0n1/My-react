import React, { useMemo, useState } from "react";
import { Pet } from "../../types/Pet";
import PetGrid from "../PetGrid/PetGrid";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import { filterPets } from "../../domain/filterPets";
import { PetCategory } from "../../domain/petCategories";
import Donation from "../Donation/Donation";
import donationImage from "../../assets/donationImage.png";

interface Props {
  pets: Pet[];
  category?: PetCategory;
  title: string;
}

const PetCategoryPage: React.FC<Props> = ({
  pets,
  category,
  title,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    species: "",
    city: "",
    age: "",
    gender: "",
    size: "",
    breed: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Get unique values for filters
  const uniqueValues = useMemo(() => {
    const getUniqueValues = (field: keyof Pet): string[] => {
      const values = pets.map(p => p[field]).filter(Boolean) as string[];
      return Array.from(new Set(values)).sort();
    };

    return {
      species: getUniqueValues('species'),
      cities: getUniqueValues('city'),
      ages: getUniqueValues('age'),
      breeds: getUniqueValues('breed'),
      genders: getUniqueValues('gender'),
      sizes: getUniqueValues('size'),
    };
  }, [pets]);

  const filteredPets = useMemo(
    () =>
      filterPets({
        pets,
        searchQuery,
        filters,
        category,
      }),
    [pets, searchQuery, filters, category]
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPets = filteredPets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({
      species: "",
      city: "",
      age: "",
      gender: "",
      size: "",
      breed: "",
    });
    setCurrentPage(1);
  };

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-purple-400 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'} available for adoption
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                  onClick={handleResetFilters}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear all
                </button>
              </div>
              <Filters
                searchQuery={searchQuery}
                filters={filters}
                handleSearchChange={(e) => setSearchQuery(e.target.value)}
                handleFilterChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                handleSearchSubmit={(e) => e.preventDefault()}
                uniqueValues={uniqueValues}
              />
            </div>
          </aside>

          {/* Results Section */}
          <div>
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-purple-600">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPets.length)}</span> of <span className="font-semibold text-purple-600">{filteredPets.length}</span> results
                  {filters.city && <span className="ml-1">in {filters.city}</span>}
                </p>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || Object.values(filters).some(v => v)) && (
              <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm font-semibold text-purple-700 mb-2">
                  Active filters:
                </p>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm text-purple-600 border border-purple-200">
                      Search: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery("")}
                        className="hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {Object.entries(filters).map(([key, value]) => 
                    value ? (
                      <span key={key} className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm text-purple-600 border border-purple-200">
                        {key}: {value}
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, [key]: "" }))}
                          className="hover:text-purple-800"
                        >
                          ×
                        </button>
                      </span>
                    ) : null
                  )}
                </div>
              </div>
            )}

            {/* Pet Grid */}
            <PetGrid
              pets={paginatedPets}
              onResetFilters={handleResetFilters}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= SHELTER CTA ================= */}
      <Donation
        image={donationImage}
        title="Padėkite mums pakeisti pasaulį"
        text="Jūsų auka padeda mums rūpintis nelaimės ištiktais gyvūnais."
        cta="Paaukokite dabar"
      />    
    </div>
  );
};

export default PetCategoryPage;