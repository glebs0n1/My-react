import React, { useEffect, useMemo, useRef, useState } from "react";
import { LITHUANIAN_CITIES } from "../../constants/LT/lithuanianCities";
import { normalizeText } from "../../utils/normalizeText";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (city: string) => void;
  placeholder?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  dropdownClassName?: string;
  maxResults?: number;
  name?: string;
  id?: string;
  autoComplete?: string;
}

const DEFAULT_INPUT_CLASS =
  "w-full px-4 py-3 rounded-lg text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500";

const CityAutocomplete: React.FC<Props> = ({
  value,
  onChange,
  onSelect,
  placeholder = "Įveskite miestą...",
  inputClassName = DEFAULT_INPUT_CLASS,
  wrapperClassName = "relative w-full",
  dropdownClassName = "absolute z-[100] mt-2 w-full rounded-xl bg-white shadow-xl border border-gray-200 max-h-80 overflow-y-auto divide-y divide-gray-100",
  maxResults = 8,
  name,
  id,
  autoComplete = "off",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const matches = useMemo(() => {
    const q = normalizeText(value);
    const list = !q
      ? LITHUANIAN_CITIES
      : LITHUANIAN_CITIES.filter((city) => normalizeText(city).includes(q));
    return list.slice(0, maxResults);
  }, [value, maxResults]);

  const handleSelect = (city: string) => {
    onChange(city);
    onSelect?.(city);
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && matches[highlightIndex]) {
        e.preventDefault();
        handleSelect(matches[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightIndex(-1);
    }
  };

  return (
    <div ref={wrapperRef} className={wrapperClassName}>
      <input
        type="text"
        name={name}
        id={id}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
          setHighlightIndex(-1);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={inputClassName}
      />

      {isOpen && matches.length > 0 && (
        <ul className={dropdownClassName} role="listbox">
          {matches.map((city, idx) => (
            <li
              key={city}
              role="option"
              aria-selected={idx === highlightIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(city);
              }}
              onMouseEnter={() => setHighlightIndex(idx)}
              className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors duration-150 ${
                idx === highlightIndex
                  ? "bg-purple-50 text-purple-700"
                  : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {city}
            </li>
          ))}
        </ul>
      )}

      {isOpen && value && matches.length === 0 && (
        <div className="absolute z-[100] mt-2 w-full rounded-xl bg-white border border-gray-200 p-4 text-sm text-gray-500 shadow">
          Tokio miesto nerasta
        </div>
      )}
    </div>
  );
};

export default CityAutocomplete;
