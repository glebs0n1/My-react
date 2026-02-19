import React, { useMemo, useState, useEffect, useRef } from "react";
import { LITHUANIAN_CITIES } from "../../constants/LT/lithuanianCities";
import { normalizeText } from "../../utils/normalizeText";

interface Props {
  cityQuery: string;
  onCityChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBarCity: React.FC<Props> = ({
  cityQuery,
  onCityChange,
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= FILTER CITIES ================= */
  const filteredCities = useMemo(() => {
    if (!cityQuery) return LITHUANIAN_CITIES;

    const normalizedQuery = normalizeText(cityQuery);

    return LITHUANIAN_CITIES.filter((city) =>
      normalizeText(city).includes(normalizedQuery)
    );
  }, [cityQuery]);

  const handleSelect = (city: string) => {
    onCityChange(city);
    setIsOpen(false);
    onSearch();
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto">
      {/* INPUT + BUTTON */}
      <div className="flex gap-3">
        <input
          value={cityQuery}
          onChange={(e) => {
            onCityChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Enter city (e.g. Vilnius)"
          className="
            w-full px-4 py-3 rounded-lg
            text-gray-900
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-purple-500
          "
        />

        <button
          onClick={onSearch}
          className="
            px-6 py-3
            rounded-lg
            bg-white text-purple-600 font-semibold
            border border-purple-200
            hover:bg-purple-50
            transition
          "
        >
          Search
        </button>
      </div>

      {/* DROPDOWN */}
      {isOpen && filteredCities.length > 0 && (
        <ul
          className="absolute z-50 mt-2 w-full
          rounded-xl bg-white
          shadow-xl border border-gray-200
          max-h-64 overflow-y-auto
          divide-y divide-gray-100
        "
        >
          {filteredCities.map((city) => (
            <li
              key={city}
              onClick={() => handleSelect(city)}
              className="
                flex items-center gap-3
                px-4 py-3
                text-sm font-medium text-gray-700
                cursor-pointer
                transition-colors duration-150
                hover:bg-purple-50 hover:text-purple-700
                active:bg-purple-100
              "
            >
              {city}
            </li>
          ))}
        </ul>
      )}

      {/* EMPTY STATE */}
      {isOpen && filteredCities.length === 0 && (
        <div className="absolute mt-2 w-full rounded-xl bg-white border p-4 text-sm text-gray-500 shadow">
          No matching cities found
        </div>
      )}
    </div>
  );
};

export default SearchBarCity;