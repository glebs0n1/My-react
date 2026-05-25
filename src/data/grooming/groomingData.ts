// src/data/grooming/groomingData.ts

import vilnius      from "./grooming-miestai/vilnius.json";
import kaunas       from "./grooming-miestai/kaunas.json";
import siauliai     from "./grooming-miestai/siauliai.json";
import klaipeda     from "./grooming-miestai/klaipeda.json";
import klaipedosRaj from "./grooming-miestai/klaipedos-raj.json";
import kaunoRaj     from "./grooming-miestai/kauno-raj.json";
import vilniausRaj  from "./grooming-miestai/vilniaus-raj.json";
import alytausRaj   from "./grooming-miestai/alytaus-raj.json";
import kedainiuRaj  from "./grooming-miestai/kedainiu-raj.json";
import marijampole  from "./grooming-miestai/marijampole.json";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GroomingReview {
  author: string | null;
  rating: string | null;
  date: string | null;
  content: string | null;
}

export interface GroomingSalon {
  id: number;
  title: string | null;
  businessName: string | null;
  city: string | null;
  citySlug: string;
  serviceTypes: string[];
  url: string | null;
  image: string | null;
  rating: number | null;
  reviewCount: number;
  price: string | null;
  description: string | null;
  galleryImages: string[];
  reviews: GroomingReview[];
  phone: string | null;
  contactUrl: string | null;
}

export interface GroomingCityData {
  citySlug: string;
  city: string;
  totalSalons: number;
  scrapedAt: string;
  salons: Omit<GroomingSalon, "id">[];
}

// ─── Service types that belong ONLY to the Training page ─────────────────────
// Salons whose ONLY service is one of these will be excluded from Grooming page.
// These tags will also be stripped from the displayed serviceTypes.
const TRAINING_ONLY_TYPES = ["dresuros mokykla", "dresuotojas"];

const isTrainingOnlyType = (t: string) =>
  TRAINING_ONLY_TYPES.includes(t.toLowerCase().trim());

// ─── City list ────────────────────────────────────────────────────────────────
const ALL_CITIES: GroomingCityData[] = [
  vilnius      as unknown as GroomingCityData,
  kaunas       as unknown as GroomingCityData,
  siauliai     as unknown as GroomingCityData,
  klaipeda     as unknown as GroomingCityData,
  klaipedosRaj as unknown as GroomingCityData,
  kaunoRaj     as unknown as GroomingCityData,
  vilniausRaj  as unknown as GroomingCityData,
  alytausRaj   as unknown as GroomingCityData,
  kedainiuRaj  as unknown as GroomingCityData,
  marijampole  as unknown as GroomingCityData,
];

// ─── Flat list: exclude pure-training salons, strip training tags ─────────────
const ALL_SALONS: GroomingSalon[] = ALL_CITIES
  .flatMap((c) => c.salons)
  // Keep only salons that have at least one non-training service type
  .filter((salon) => {
    const types = (salon as any).serviceTypes as string[] || [];
    return types.some((t) => !isTrainingOnlyType(t));
  })
  // Strip training-only tags from the serviceTypes array
  .map((salon, index) => ({
    ...salon,
    id: index + 1,
    serviceTypes: ((salon as any).serviceTypes as string[] || []).filter(
      (t) => !isTrainingOnlyType(t)
    ),
  }));

export const CITY_LIST = ALL_CITIES.map((c) => ({
  label: c.city,
  slug: c.citySlug,
  count: c.totalSalons,
}));

export default ALL_SALONS;