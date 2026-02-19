// shelterTranslations.ts
export const shelterTranslations = {
  lt: {
    heroTitle: "Suraskite Savo Naują Geriausią Draugą",
    heroBrowse: "Naršykite gyvūnus iš daugiau nei",
    heroShelters: "prieglaudų",
    recommendedTitle: "Rekomenduojami jums",
    petsAvailable: "gyvūnų prieinami įsisavinimui",
    resetFilters: "Atstatyti filtrus",
    donationTitle: "Mūsų Prieglaudai Reikia Jūsų Pagalbos",
    donationText: "Šimtai gyvūnų laukia maisto, medicininės priežiūros ir mylinčių namų.",
    donationCta: "Paaukoti Dabar",
    filterStatus: "Statusas",
    filterLocation: "Vieta",
    filterAge: "Amžius",
    filterBreed: "Veislė",
    filterGender: "Lytis",
    filterSize: "Dydis"
  },
  en: {
    heroTitle: "Suraskite Savo Naują Geriausią Draugą",
    heroBrowse: "Naršykite gyvūnus iš daugiau nei",
    heroShelters: "prieglaudų",
    recommendedTitle: "Rekomenduojami jums",
    petsAvailable: "Gyvūnų prieinami",
    resetFilters: "Išvalyti filtrus",
    searchPlaceholder: "Ieškoti gyvūno...",
    donationTitle: "Our Shelter Needs Your Help",
    donationText: "Hundreds of animals are waiting for food, medical care, and a loving home.",
    donationCta: "Donate Now",
    filterStatus: "Status",
    filterLocation: "Location",
    filterAge: "Age",
    filterBreed: "Breed",
    filterGender: "Gender",
    filterSize: "Size"
  },

} as const;

export type Language = keyof typeof shelterTranslations;
export type TranslationKey = keyof typeof shelterTranslations.lt;