import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ================= CONFIG ================= */

const PET_ROUTES: Record<string, string> = {
  dog: "/dogs",
  dogs: "/dogs",
  puppy: "/dogs",
  puppies: "/dogs",
  cat: "/cats",
  cats: "/cats",
  kitten: "/cats",
  kittens: "/cats",
  bird: "/other-animals",
  birds: "/other-animals",
  rabbit: "/other-animals",
  rabbits: "/other-animals",
  reptile: "/other-animals",
  reptiles: "/other-animals",
  "small pets": "/other-animals",
  hamster: "/other-animals",
  guinea: "/other-animals",
};

const POPULAR_SEARCHES = [
  { id: "pop-1", label: "Šunys", query: "dogs" },
  { id: "pop-2", label: "Katės", query: "cats" },
  { id: "pop-3", label: "Triušiai", query: "rabbits" },
  { id: "pop-4", label: "Paukščiai", query: "birds" },
];

interface Props {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
}

const SearchBar: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const normalized = searchQuery.trim().toLowerCase();
  const hasQuery = normalized.length > 0;

  /* ================= SUGGESTIONS ================= */
  const suggestions = useMemo(() => {
    if (!hasQuery) return POPULAR_SEARCHES;

    const matches = Object.keys(PET_ROUTES).filter((key) =>
      key.includes(normalized)
    );

    return matches.map((key) => ({
      id: `suggestion-${key}`,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      query: key,
    }));
  }, [normalized, hasQuery]);

  /* ================= HANDLERS ================= */
  const handleSubmit = () => {
    if (!hasQuery) return;

    const exactMatch = PET_ROUTES[normalized];
    if (exactMatch) {
      navigate(exactMatch);
    } else {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }

    setIsOpen(false);
    onSearchSubmit();
  };

  const handleSelect = (query: string) => {
    const route = PET_ROUTES[query.toLowerCase()];
    if (route) {
      navigate(route);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto">
      {/* PILL-SHAPED INPUT + BUTTON */}
      <div className="flex items-center bg-white rounded-full shadow-xl pl-5 pr-2 py-2 relative z-[100]">
        {/* Search Icon */}
        <svg
          className="w-5 h-5 text-gray-400 flex-shrink-0 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Ieškoti gyvūnų pagal vardą ar veislę..."
          className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-base py-2"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="ml-2 px-7 py-3 rounded-full bg-[#6d0ef1] text-white font-semibold text-sm hover:bg-[#5b0bd0] transition-colors flex-shrink-0"
        >
          Ieškoti
        </button>
      </div>

      {/* DROPDOWN */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-[100]">
          <ul className="w-full rounded-xl bg-white shadow-2xl border border-gray-200 max-h-64 overflow-y-auto divide-y divide-gray-100">
            {suggestions.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item.query)}
                className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 cursor-pointer transition-colors duration-150 hover:bg-[#f2eef6] hover:text-[#6d0ef1] active:bg-[#e8e0f4]"
              >
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* EMPTY STATE */}
      {isOpen && hasQuery && suggestions.length === 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-[100]">
          <div className="w-full rounded-xl bg-white border p-4 text-sm text-gray-500 shadow-2xl">
            Nerasta atitikmenų. Paspauskite Enter, kad ieškotumėte visoje
            svetainėje.
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;