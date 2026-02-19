import React, { ChangeEvent, FormEvent } from "react";

/* ================= TYPES ================= */

export interface FiltersType {
  species?: string;
  city?: string;
  age?: string;
  gender?: string;
  size?: string;
  breed?: string;
}

interface FiltersProps {
  searchQuery: string;
  filters: FiltersType;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
  uniqueValues?: {
    species?: string[];
    cities?: string[];
    ages?: string[];
    breeds?: string[];
    genders?: string[];
    sizes?: string[];
  };
}

/* ================= COMPONENT ================= */

const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  filters,
  handleSearchChange,
  handleFilterChange,
  handleSearchSubmit,
  uniqueValues,
}) => {
  return (
    <form onSubmit={handleSearchSubmit} className="space-y-5">
      {/* ================= SEARCH ================= */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Paieška pagal pavadinimą
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Ieškoti gyvūnų..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
        />
      </div>

      {/* ================= SPECIES FILTER ================= */}
      {uniqueValues?.species && uniqueValues.species.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
          Rūšys
          </label>
          <select
            name="species"
            value={filters.species || ""}
            onChange={handleFilterChange}
            className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                       focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          >
            <option value="">Visos rūšys</option>
            {uniqueValues.species.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ================= CITY FILTER ================= */}
      {uniqueValues?.cities && uniqueValues.cities.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
          Miestas
          </label>
          <select
            name="city"
            value={filters.city || ""}
            onChange={handleFilterChange}
            className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                       focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          >
            <option value="">Visi miestai</option>
            {uniqueValues.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ================= AGE FILTER ================= */}
      {uniqueValues?.ages && uniqueValues.ages.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
          Amžius
          </label>
          <select
            name="age"
            value={filters.age || ""}
            onChange={handleFilterChange}
            className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                       focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          >
            <option value="">Visų amžiaus grupių</option>
            {uniqueValues.ages.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ================= GENDER FILTER ================= */}
      {uniqueValues?.genders && uniqueValues.genders.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
           Lytis
          </label>
          <select
            name="gender"
            value={filters.gender || ""}
            onChange={handleFilterChange}
            className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                       focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          >
            <option value="">Visos lytys</option>
            {uniqueValues.genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ================= SIZE FILTER ================= */}
      {uniqueValues?.sizes && uniqueValues.sizes.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
          Gyvūno dydis 
          </label>
          <select
            name="size"
            value={filters.size || ""}
            onChange={handleFilterChange}
            className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                       focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          >
            <option value="">Visos dydis 
            </option>
            {uniqueValues.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ================= BREED FILTER ================= */}
      {uniqueValues?.breeds && uniqueValues.breeds.length > 5 && (
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
          Gyvūno veislė
          </label>
          <select
            name="breed"
            value={filters.breed || ""}
            onChange={handleFilterChange}
            className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                       focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
          >
            <option value="">Visos veislė</option>
            {uniqueValues.breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>
      )}
    </form>
  );
};

export default Filters;