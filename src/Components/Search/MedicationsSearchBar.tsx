import React, { useMemo, useState, useEffect, useRef } from "react";

/* ================= CONFIG ================= */

const MEDICATION_CATEGORIES: Record<string, string> = {
  "allergies": "Allergies & Itching",
  "itching": "Allergies & Itching",
  "anxiety": "Anxiety & Sedation",
  "sedation": "Anxiety & Sedation",
  "diabetes": "Diabetes",
  "diarrhea": "Diarrhea",
  "fleas": "Fleas & Ticks",
  "ticks": "Fleas & Ticks",
  "heartworms": "Heartworms",
  "heartworm": "Heartworms",
  "infections": "Infections",
  "infection": "Infections",
  "nausea": "Nausea & Vomiting",
  "vomiting": "Nausea & Vomiting",
  "pain": "Pain & Arthritis",
  "arthritis": "Pain & Arthritis",
  "seizures": "Seizures",
  "seizure": "Seizures",
  "stomach": "Stomach Ulcers",
  "ulcers": "Stomach Ulcers",
};

const POPULAR_MEDICATIONS = [
  { id: "med-1", label: "Allergies & Itching", query: "allergies" },
  { id: "med-2", label: "Fleas & Ticks", query: "fleas" },
  { id: "med-3", label: "Pain & Arthritis", query: "pain" },
  { id: "med-4", label: "Anxiety & Sedation", query: "anxiety" },
  { id: "med-5", label: "Heartworms", query: "heartworms" },
  { id: "med-6", label: "Infections", query: "infections" },
];

interface Props {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategorySelect?: (category: string) => void;
}

const MedicationsSearchBar: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  onCategorySelect,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const normalized = searchQuery.trim().toLowerCase();
  const hasQuery = normalized.length > 0;

  /* ================= SUGGESTIONS ================= */
  const suggestions = useMemo(() => {
    if (!hasQuery) return POPULAR_MEDICATIONS;
    
    const matches = Object.keys(MEDICATION_CATEGORIES).filter((key) =>
      key.includes(normalized) || MEDICATION_CATEGORIES[key].toLowerCase().includes(normalized)
    );

    // Remove duplicates by category name
    const uniqueCategories = new Map<string, { id: string; label: string; query: string }>();
    matches.forEach((key) => {
      const categoryName = MEDICATION_CATEGORIES[key];
      if (!uniqueCategories.has(categoryName)) {
        uniqueCategories.set(categoryName, {
          id: `suggestion-${key}`,
          label: categoryName,
          query: key,
        });
      }
    });

    return Array.from(uniqueCategories.values());
  }, [normalized, hasQuery]);

  /* ================= HANDLERS ================= */
  const handleSubmit = () => {
    if (!hasQuery) return;
    
    const matchedCategory = MEDICATION_CATEGORIES[normalized];
    if (matchedCategory && onCategorySelect) {
      onCategorySelect(matchedCategory);
    }
    
    setIsOpen(false);
  };

  const handleSelect = (categoryName: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryName);
    }
    setIsOpen(false);
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
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto">
      {/* INPUT + BUTTON */}
      <div className="flex gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search medications (e.g., allergies, pain, fleas...)"
          className="w-full px-4 py-3 rounded-lg text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleSubmit}
          className="px-6 py-3 rounded-lg bg-white text-purple-600 font-semibold border border-purple-200 hover:bg-purple-50 transition"
        >
          Search
        </button>
      </div>

      {/* DROPDOWN */}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full rounded-xl bg-white shadow-xl border border-gray-200 max-h-64 overflow-y-auto divide-y divide-gray-100">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item.label)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 cursor-pointer transition-colors duration-150 hover:bg-purple-50 hover:text-purple-700 active:bg-purple-100"
            >
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              {item.label}
            </li>
          ))}
        </ul>
      )}

      {/* EMPTY STATE */}
      {isOpen && hasQuery && suggestions.length === 0 && (
        <div className="absolute mt-2 w-full rounded-xl bg-white border p-4 text-sm text-gray-500 shadow">
          No matching medications found. Try searching for common conditions like "pain", "allergies", or "fleas".
        </div>
      )}
    </div>
  );
};

export default MedicationsSearchBar;