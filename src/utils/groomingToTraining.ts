// src/utils/groomingToTraining.ts
// Konvertuoja grooming salonus (su dresūros paslauga) į TrainingSchool formatą

import { TrainingSchool } from "./transformTrainingData";

// ─── Grooming salon type (subset) ─────────────────────────────────────────────
interface GroomingSalonRaw {
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
  phone: string | null;
  contactUrl: string | null;
}

interface GroomingCityRaw {
  citySlug: string;
  city: string;
  salons: GroomingSalonRaw[];
}

const TRAINING_TAGS = ["dresuros mokykla", "dresuotojas", "dresuros-mokykla"];

const isTrainingSalon = (salon: GroomingSalonRaw): boolean =>
  salon.serviceTypes.some((t) =>
    TRAINING_TAGS.includes(t.toLowerCase().trim())
  );

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80";

let _gid = 5000; // high base ID to avoid collision with manual training schools

/**
 * Converts grooming city JSON files into TrainingSchool objects
 * for salons that also offer training (dresūra).
 */
export const groomingCitiesToTrainingSchools = (
  cities: GroomingCityRaw[]
): TrainingSchool[] => {
  return cities
    .flatMap((c) => c.salons)
    .filter(isTrainingSalon)
    .map((salon) => {
      const id = _gid++;
      const name = salon.businessName || salon.title || "Dresūros mokykla";

      // Build training tags – keep only relevant service types
      const tags = salon.serviceTypes
        .map((t) => {
          const lower = t.toLowerCase().trim();
          if (lower.includes("dresuros mokykla") || lower === "dresuros-mokykla")
            return "Dresūros mokykla";
          if (lower === "dresuotojas") return "Dresuotojas";
          if (lower.includes("kirpykla")) return "Kirpykla";
          if (lower.includes("viesbutis")) return "Viešbutis";
          return t;
        })
        .filter(Boolean);

      // Build a minimal prices array from the price string (e.g. "nuo 25 €")
      const prices = salon.price
        ? [{ service: "Dresūra", program: "Dresūra", price: salon.price, duration: "" }]
        : [];

      const school: TrainingSchool = {
        id,
        name,
        city: salon.city || "",
        address: salon.city || "",
        phone: salon.phone || "",
        email: "",
        website: salon.url || "",
        image: salon.image || FALLBACK_IMAGE,
        tags,
        prices,
        description: salon.description || "",
        // Extra grooming-origin fields (optional display)
        rating: salon.rating,
        reviewCount: salon.reviewCount,
        contactUrl: salon.contactUrl,
      } as TrainingSchool;

      return school;
    });
};