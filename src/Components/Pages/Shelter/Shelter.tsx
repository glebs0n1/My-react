import React, { useState, ChangeEvent, useMemo, useEffect } from "react";
import { useLanguage } from "../../../context/languageContext";
import { shelterTranslations, type Language, type TranslationKey } from "../../Translations/shelterTranslations";
import petsRaw from "../../../data/shelters/lese/scraped_lese_vilnius.json";
import petsDataBeglobis from "../../../data/shelters/beglobis/beglobis.json";
import petsDataPenkta from "../../../data/shelters/penktakoja/penktakoja.json";
import petsDataSos from "../../../data/shelters/sos-gyvunai/sos-gyvunai.json";
import petsDataMazasdraugas from "../../../data/shelters/mazasdraugas/mazasdraugas.json";
import petsDataLinksmosiospedutes from "../../../data/shelters/linksmosiospedutes/linksmosiospedutes.json";
import type { Pet } from "../../../types/Pet";

import { loadScrapedPets } from "../../../utils/mapPet";

import bannerImage from "../../../assets/pets-banner.jpg";
import shelterImage from "../../../assets/shelter.png";


import PetGrid from "../../PetGrid/PetGrid";
import Donation from "../../Donation/Donation";
import { Seo, animalShelterSchema, breadcrumbSchema } from "../../SEO";

/* ================= COMPONENT ================= */

const Shelter: React.FC = () => {
  const { currentLang } = useLanguage();
  const t = (key: TranslationKey) => shelterTranslations[currentLang as Language][key] || key;

  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    species: "",
    city: "",
    age: "",
    breed: "",
    gender: "",
    size: "",
  });

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const combinedPets = [
      ...petsRaw,
      ...petsDataBeglobis,
      ...petsDataPenkta,
      ...petsDataSos,
      ...petsDataMazasdraugas,
      ...petsDataLinksmosiospedutes
    ];
    
    const normalizedPets = loadScrapedPets(combinedPets);
    setPets(normalizedPets);
    setLoading(false);
  }, []);
  /* ================= FILTERING ================= */

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSearch = pet.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesFilters = Object.entries(filters).every(
        ([key, value]) => {
          if (!value) return true;
          return String(pet[key as keyof Pet] ?? "") === value;
        }
      );

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, filters, pets]);

  const resetFilters = () => {
    setSearchQuery("");
    setFilters({
      species: "",
      city: "",
      age: "",
      breed: "",
      gender: "",
      size: "",
    });
  };

  /* ================= UNIQUE VALUES FOR FILTERS ================= */

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

  /* ================= RENDER ================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading pets...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7]">
      <Seo
        title="Gyvūnų prieglaudos Lietuvoje | Įvaikinti šunį, katę ar kitą augintinį | PetLietuva"
        description={`Įvaikinkite šunį, katę ar kitą augintinį iš Lietuvos prieglaudų. ${pets.length}+ augintinių iš visos Lietuvos – Vilnius, Kaunas, Klaipėda. Patikimos prieglaudos vienoje vietoje.`}
        path="/prieglaudos"
        keywords="gyvūnų prieglauda, gyvūnų prieglaudos Lietuvoje, įvaikinti šunį, įvaikinti katę, šunys adoptavimui, katės adoptavimui, beglobiai gyvūnai, gyvūnų globa, prieglauda Vilnius, prieglauda Kaunas, prieglauda Klaipėda"
        jsonLd={[
          animalShelterSchema(),
          breadcrumbSchema([
            { name: "Pradžia", path: "/" },
            { name: "Gyvūnų prieglaudos", path: "/prieglaudos" },
          ]),
        ]}
      />

      {/* ================= HERO ================= */}
      <section className="relative h-[320px] flex items-center justify-center">
        <img
          src={bannerImage}
          alt="Gyvūnų prieglaudos Lietuvoje – įvaikinti augintinį"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-6 text-center text-white">
          <h1 className="mb-3 text-4xl font-bold md:text-5xl">
            {t('heroTitle')}
          </h1>
          <p className="opacity-90">
            {t('heroBrowse')} <strong>{pets.length}</strong> {t('heroShelters')}
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr]">

          {/* ================= FILTER SIDEBAR ================= */}
          <aside
            className="
              h-fit rounded-2xl bg-white p-6 shadow-md
              mb-8 lg:mb-0
              lg:sticky lg:top-24
            "
          >
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
              Paieška pagal vardą
              </label>
              <input
                type="text"
                placeholder="Ieškoti gyvūnų..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Species Filter */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gyvūnų rūšys
              </label>
              <select
                name="species"
                value={filters.species}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilters((prev) => ({ ...prev, species: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value=""> Visos rūšys</option>
                {uniqueValues.species.map((species) => (
                  <option key={species} value={species}>
                    {species}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lietuvos miestai
              </label>
              <select
                name="city"
                value={filters.city}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilters((prev) => ({ ...prev, city: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Visi Lietuvos miestai</option>
                {uniqueValues.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Age Filter */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amžius
              </label>
              <select
                name="age"
                value={filters.age}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilters((prev) => ({ ...prev, age: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value=""> Visų amžiaus grupes</option>
                {uniqueValues.ages.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={filters.gender}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilters((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Visos lytys</option>
                {uniqueValues.genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            {/* Size Filter */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gyvūno dydis
              </label>
              <select
                name="size"
                value={filters.size}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilters((prev) => ({ ...prev, size: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Visi gyvūno dydžiai</option>
                {uniqueValues.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || Object.values(filters).some(v => v)) && (
              <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-xs font-semibold text-purple-700 mb-2">
                Aktyvūs filtrai:
                </p>
                <div className="space-y-1 text-xs text-purple-600">
                  {searchQuery && <div>• Ieškoti: "{searchQuery}"</div>}
                  {filters.species && <div>• Gyvūnų rūšys: {filters.species}</div>}
                  {filters.city && <div>• Miestai: {filters.city}</div>}
                  {filters.age && <div>• Gyvūnų amžius: {filters.age}</div>}
                  {filters.gender && <div>• Gyvūnų lytis: {filters.gender}</div>}
                  {filters.size && <div>• Gyvūnų dydis: {filters.size}</div>}
                </div>
              </div>
            )}

            <button
              onClick={resetFilters}
              className="
                mt-6 w-full rounded-lg
                bg-pink-100 py-3
                font-semibold text-pink-700
                hover:bg-pink-200
                transition
              "
            >
              {t('resetFilters')}
            </button>
          </aside>

          {/* ================= PET GRID ================= */}
          <section className="px-2">
            <header className="mb-8">
              <h2 className="text-2xl font-bold">
                {t('recommendedTitle')}
              </h2>
              <p className="mt-1 text-gray-600">
                {filteredPets.length} {t('petsAvailable')}
                {filters.city && ` in ${filters.city}`}
              </p>
            </header>

            <PetGrid
              pets={filteredPets}
              onResetFilters={resetFilters}
            />
          </section>

        </div>
      </section>

      {/* ================= DONATION CTA ================= */}
      <Donation
        image={shelterImage}
        title={t('donationTitle')}
        text={t('donationText')}
        cta={t('donationCta')}
      />
    </main>
  );
};

export default Shelter;