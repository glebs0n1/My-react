import { Pet } from "../types/Pet";

/* ================= MEDICAL KEYWORDS ================= */

type MedicalKeyword = {
  label: string;
  match: string[];
};

const MEDICAL_KEYWORDS: MedicalKeyword[] = [
  { label: "Aklas / beveik aklas", match: ["akla", "beveik akla", "aklas"] },
  { label: "Turi tik vieną akį", match: ["viena akis", "vienos akies"] },

  {
    label: "Sterilizuotas / Kastruotas",
    match: ["sterilizuotas", "sterilizuota", "kastruotas", "sterealizuotas"],
  },
  { label: "Nesterilizuotas", match: ["ne sterilizuotas", "nesterilizuotas"] },

  { label: "Skiepytas", match: ["skiepytas", "vakcinuotas"] },
  { label: "Čipuotas", match: ["čipuotas", "čipuota"] },

  { label: "Turėjo / turi parazitų", match: ["parazitai", "turi parazitus"] },
  {
    label: "Gavęs vaistų nuo vidaus ir išorės parazitų",
    match: ["nukirmintas", "vaistų nuo parazitų"],
  },

  { label: "Virškinimo problemos", match: ["virškinimas"] },
  {
    label: "Turėjo šlapinimosi problemų",
    match: ["šlapimo", "šlapinimosi"],
  },

  { label: "Atlikti kraujo tyrimai", match: ["kraujo tyrimai"] },
  { label: "Patyręs traumą", match: ["trauma", "lūžis"] },

  { label: "Reikia priaugti svorio", match: ["priaugti svorio"] },
  {
    label: "Rekomenduojami vitaminai",
    match: ["vitaminai", "pagerti vitaminų"],
  },

  { label: "Odos ir kailio problemos", match: ["oda", "kailis"] },
  { label: "Kaulų problemos", match: ["kaulas", "kaulai"] },
];

/* ================= HELPERS ================= */

export const extractMedicalInfo = (text: string = ""): string[] => {
  const lower = text.toLowerCase();

  return MEDICAL_KEYWORDS
    .filter(item => item.match.some(word => lower.includes(word)))
    .map(item => item.label);
};

/**
 * 🔑 VIENINTELĖ SLUG FUNKCIJA VISAM PROJEKTUI
 * TĄ PATĮ slug naudoja:
 * - Grid (PetCard)
 * - Favorites
 * - PetDetail
 */
export const makeSlug = (animal: any): string => {
  if (animal.slug) return String(animal.slug);

  if (animal.link) {
    const fromLink = animal.link
      .split("/")
      .filter(Boolean)
      .pop()
      ?.replace(/\.html$/, "")
      .toLowerCase();

    if (fromLink) return fromLink;
  }

  if (animal.id) return String(animal.id);

  return (
    animal.name
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "unknown-pet"
  );
};

const cleanImageUrl = (url?: string): string =>
  url?.replace(/^url\((['"]?)(.*?)\1\)$/, "$2").trim() ||
  "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993";

const parseAge = (ageData?: unknown): string => {
  if (!Array.isArray(ageData) || ageData.length < 2) return "Nežinomas";

  const data = ageData[1] as string[] | undefined;
  if (!data) return "Nežinomas";

  const years = data[0]?.split(":")?.[1]?.trim();
  const months = data[1]?.split(":")?.[1]?.trim();

  if (years && years !== "0") return `${years} m.`;
  if (months && months !== "0") return `${months} mėn.`;

  return "Jaunas";
};

/* ================= MAIN ADAPTER (LESĖ) ================= */

export const adaptLesePet = (animal: any): Pet => {
  const details: Record<string, string> = animal.details || {};
  const image = cleanImageUrl(animal.image);
  const slug = makeSlug(animal);

  const description =
    details["Aprašymas"] ||
    animal.description ||
    animal.excerpt ||
    "";

  return {
    id: slug,
    slug,

    name: animal.name || details["Vardas:"] || "Nežinoma",

    image,
    images:
      Array.isArray(animal.imagesGallery) && animal.imagesGallery.length > 0
        ? animal.imagesGallery.map(cleanImageUrl)
        : [image],

    species: details["Rūšis:"] || "Nežinoma",
    breed: details["Veislė:"] || "Mišrūnas",
    age: parseAge(animal.age),
    gender: details["Lytis:"] || "Nežinoma",
    size: details["Dydis:"] || "Vidutinio dydžio",
    city: details["Miestas:"] || "Vilnius",

    description,

    traits: details["Bruožai:"]
      ? details["Bruožai:"].split(",").map(t => t.trim())
      : undefined,

    sterilized:
      description.toLowerCase().includes("sterilizuot") ||
      details["Sterilizacija:"] === "taip",

    vaccinated:
      description.toLowerCase().includes("skiep") ||
      details["Skiepai:"] === "taip",

    chipped: description.toLowerCase().includes("čipuot"),

    medicalInfo: extractMedicalInfo(description),

    source: "lese",
    profileUrl: animal.link || "",
  };
};

/* ================= LOADER ================= */

export const loadScrapedPets = (data: unknown[]): Pet[] =>
  Array.isArray(data) ? data.map(adaptLesePet) : [];