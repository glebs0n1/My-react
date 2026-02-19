import React, { useState, useMemo, useEffect } from "react";
import PetGrid from "../PetGrid/PetGrid";
import Pagination from "../Pagination/Pagination";
import Donation from "../Donation/Donation";
import petsData from "../../data/shelters/lese/scraped_lese_vilnius_full.json";
import petsDataBeglobis from "../../data/shelters/beglobis/beglobis.full.json";
import petsDataMazasdraugas from "../../data/shelters/mazasdraugas/mazasdraugas.full.json";
import petsDataPenktakoja from "../../data/shelters/penktakoja/penktakoja.full.json";
import petsDataSosGyvunai from "../../data/shelters/sos-gyvunai/sos-gyvunai.full.json";
import petsDataVggnGrinda from "../../data/shelters/vggn.grinda/vggn.grinda.full.json";
import petsDataLinksmosiospedutes from '../../data/shelters/linksmosiospedutes/linksmosiospedutes.full.json';
import { loadScrapedPets } from "../../utils/mapPet";
import bannerImage from "../../assets/pets-banner.jpg";
import donationImage from "../../assets/donationImage.png";
import { Pet } from "../../types/Pet";

/* ================= HELPERS ================= */


const getAgeGroup = (age?: string) => {
  if (!age) return "";
  if (age.includes("mėn")) return "puppy";

  const years = parseInt(age);
  if (isNaN(years)) return "";

  if (years < 1) return "puppy";
  if (years < 3) return "young";
  if (years < 7) return "adult";
  return "senior";
};

/* ================= COMPONENT ================= */

const OtherAnimals: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    ageGroup: "",
    gender: "",
    size: "",
    city: "",
    sterilized: false,
    vaccinated: false,
    goodWithChildren: false,
  });


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= LOAD ================= */

  useEffect(() => {
    const combinedPets = [
      ...petsData,
      ...petsDataBeglobis,
      ...petsDataMazasdraugas,
      ...petsDataPenktakoja,
      ...petsDataSosGyvunai,
      ...petsDataVggnGrinda,
      ...petsDataLinksmosiospedutes,
    ];
  
    const normalizedPets = loadScrapedPets(combinedPets);
    setPets(normalizedPets);
    setLoading(false);
  }, []);

  /* ================= FILTERING ================= */

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      if (pet.species !== "Kita") return false;

      // Paieška
      if (
        searchQuery &&
        !pet.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Amžiaus grupė
      if (
        filters.ageGroup &&
        getAgeGroup(pet.age) !== filters.ageGroup
      ) {
        return false;
      }

      if (filters.gender && pet.gender !== filters.gender) return false;
      if (filters.size && pet.size !== filters.size) return false;
      if (filters.city && pet.city !== filters.city) return false;

      // Boolean filtrai
      if (filters.vaccinated && pet.vaccinated !== true) return false;

      if (
        filters.goodWithChildren &&
        !pet.traits?.some((t) =>
          t.toLowerCase().includes("vaik")
        )
      ) {
        return false;
      }

      return true;
    });
  }, [pets, searchQuery, filters]);

  /* ================= UNIQUE VALUES ================= */

  const uniqueValues = useMemo(() => {
    const dogPets = pets.filter((p) => p.species === "Šuo");

    const getUnique = (field: keyof Pet): string[] =>
      Array.from(
        new Set(dogPets.map((p) => p[field]).filter(Boolean) as string[])
      ).sort();

    return {
      genders: getUnique("gender"),
      sizes: getUnique("size"),
      cities: getUnique("city"),
    };
  }, [pets]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPets = filteredPets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setFilters({
      ageGroup: "",
      gender: "",
      size: "",
      city: "",
      sterilized: false,
      vaccinated: false,
      goodWithChildren: false,
    });
  };
   
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Kraunama...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[440px] flex items-center justify-center text-center">
        <img
          src={bannerImage}
          alt="Įsivaikinti augintinį"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-4xl px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rask Savo Naują Geriausią Draugą
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            {filteredPets.length} Katės laukia mylimų namų
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-purple-800" />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          
          {/* Filters Sidebar */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-md mb-8 lg:mb-0 lg:sticky lg:top-24">
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Paieška pagal vardą
              </label>
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Ieškoti katės..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </form>
            </div>

            {/* Age Filter */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amžius
              </label>
              <select
                  name="ageGroup"
                  value={filters.ageGroup}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, ageGroup: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"

                >
                  <option value="">Visi amžiai</option>
                  <option value="puppy">Jaunas (iki 1 m.)</option>
                  <option value="young">Jaunas (1–3 m.)</option>
                  <option value="adult">Suaugęs (3–7 m.)</option>
                  <option value="senior">Senjoras (7+)</option>
                </select>
            </div>

            {/* Gender Filter */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lytis
              </label>
              <select
                name="gender"
                value={filters.gender}
                onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Visos lytys</option>
                {uniqueValues.genders.map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>

            {/* Size Filter */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dydis
              </label>
              <select
                name="size"
                value={filters.size}
                onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Visi dydžiai</option>
                {uniqueValues.sizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Miestas
              </label>
              <select
                name="city"
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Visi miestai</option>
                {uniqueValues.cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Active Filters */}
            {(searchQuery || Object.values(filters).some(v => v)) && (
              <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-xs font-semibold text-purple-700 mb-2">
                  Aktyvūs filtrai:
                </p>
                <div className="space-y-1 text-xs text-purple-600">
                  {searchQuery && <div>• Paieška: "{searchQuery}"</div>}
                  {filters.ageGroup && <div>• Amžius: { filters.ageGroup}</div>}
                  {filters.gender && <div>• Lytis: {filters.gender}</div>}
                  {filters.size && <div>• Dydis: {filters.size}</div>}
                  {filters.city && <div>• Miestas: {filters.city}</div>}
                </div>
              </div>
            )}

            <button
              onClick={resetFilters}
              className="mt-6 w-full rounded-lg bg-pink-100 py-3 font-semibold text-pink-700 hover:bg-pink-200 transition"
            >
              Atstatyti filtrus
            </button>
          </aside>

          {/* Results Section */}
          <div>
            {/* Results Header */}
            <div className="mb-6">
              <p className="text-gray-600">
                Rodoma{" "}
                <span className="font-semibold text-purple-600">
                  {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPets.length)}
                </span>{" "}
                iš{" "}
                <span className="font-semibold text-purple-600">
                  {filteredPets.length}
                </span>{" "}
                rezultatų
              </p>
            </div>

            {/* Pet Grid */}
            <PetGrid pets={paginatedPets} onResetFilters={resetFilters} />

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

      {/* Donation CTA */}
      <Donation
        image={donationImage}
        title="Padėkite Mums Padaryti Skirtumą"
        text="Jūsų auka padeda mums rūpintis gyvunais, kuriems reikia pagalbos."
        cta="Aukoti Dabar"
      />
    </div>
  );
};

export default OtherAnimals;