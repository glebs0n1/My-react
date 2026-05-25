// src/data/training/allTrainingSchools.ts
// Shared assembly of all training schools, reusable across pages/modals.
import {
  transformJSONToTrainingSchool,
  TrainingSchool,
} from "../../utils/transformTrainingData";
import { groomingCitiesToTrainingSchools } from "../../utils/groomingToTraining";

// ─── Training JSON imports ────────────────────────────────────────────────────
import canisData               from "./canis/canis.json";
import greatpetData            from "./greatpet/greatpet.json";
import memelhundData           from "./memelhund/memelhund.json";
import mokyksuniData           from "./mokyksuni/mokyksuni.json";
import gabusdresuraiData       from "./gabusdresurai/gabusdresurai.json";
import loretaData              from "./loreta/loreta.json";
import olgapData               from "./olgap/olgap.json";
import reksasData              from "./reksas/reksas.json";
import martynapaliulyteData    from "./martyna-paliulyte/martyna-paliulyte.json";
import kinologekonsultuojaData from "./kinologe-konsultuoja/kinologe-konsultuoja.json";
import sunudarzelispovilasData from "./sunu-darzelis-povilas/sunu-darzelis-povilas.json";
import treniruoksuniData       from "./treniruoksuni/treniruoksuni.json";
import pethouseData            from "./pethouse/pethouse.json";
import NasraiData              from "./Nasrai/Nasrai.json";
import BestasData              from "./Bestas/Bestas.json";
import LidijosDresuroMokyklaData from "./Lidijos-dresuros-mokykla/Lidijos-dresuros-mokykla.json";
import dresuroInstruktoriusData  from "./dresuros-instruktorius/dresuros-instruktorius.json";
import UrbanDogData            from "./UrbanDog/UrbanDog.json";

// ─── Grooming JSON imports (salons that also offer training) ──────────────────
import vilnius      from "../grooming/grooming-miestai/vilnius.json";
import kaunas       from "../grooming/grooming-miestai/kaunas.json";
import siauliai     from "../grooming/grooming-miestai/siauliai.json";
import klaipeda     from "../grooming/grooming-miestai/klaipeda.json";
import klaipedosRaj from "../grooming/grooming-miestai/klaipedos-raj.json";
import kaunoRaj     from "../grooming/grooming-miestai/kauno-raj.json";
import vilniausRaj  from "../grooming/grooming-miestai/vilniaus-raj.json";
import alytausRaj   from "../grooming/grooming-miestai/alytaus-raj.json";
import kedainiuRaj  from "../grooming/grooming-miestai/kedainiu-raj.json";
import marijampole  from "../grooming/grooming-miestai/marijampole.json";

export const IMG = {
  canis:         "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  greatpet:      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
  memelhund:     "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
  mokyksuni:     "https://images.unsplash.com/photo-1611003228941-98852ba62227?w=800&q=80",
  gabusdresurai: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
  loreta:        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
  olgap:         "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
  reksas:        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  martyna:       "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
  kinologe:      "https://images.unsplash.com/photo-1611003228941-98852ba62227?w=800&q=80",
  sunudarzelis:  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
  treniruoksuni: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
  pethouse:      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  nasrai:        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  bestas:        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
  lidijos:       "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
  dresuroInstr:  "https://images.unsplash.com/photo-1611003228941-98852ba62227?w=800&q=80",
  urbanDog:      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
};

const safeTransform = (data: any, id: number, image: string, name: string): TrainingSchool | null => {
  try { return transformJSONToTrainingSchool(data, id, image); }
  catch (e) { console.warn(`Failed: ${name}`, e); return null; }
};

const transformMultiLocation = (data: any, baseId: number, image: string, name: string): TrainingSchool[] => {
  try {
    const u = data[Object.keys(data)[0]]?.locations ? data[Object.keys(data)[0]] : data;
    if (!u.locations || !Array.isArray(u.locations))
      return [transformJSONToTrainingSchool(data, baseId, image)].filter(Boolean) as TrainingSchool[];
    return u.locations.flatMap((loc: any, i: number) => {
      try {
        return [transformJSONToTrainingSchool({
          ...u,
          school: `${name} - ${loc.city || `Vieta ${i + 1}`}`,
          location: { city: loc.city, district: loc.district },
          contact: { ...u.contact, phone: loc.contact?.phone || u.contact?.phone, address: loc.contact?.address || u.contact?.address },
          prices: loc.prices,
          locations: undefined,
        }, baseId + i, image)];
      } catch { return []; }
    });
  } catch (e) { console.warn(`Multi-location failed: ${name}`, e); return []; }
};

let _id = 1;
const next = () => _id++;

const MANUAL_SCHOOLS: TrainingSchool[] = [
  safeTransform(canisData,               next(), IMG.canis,         "Canis"),
  safeTransform(greatpetData,            next(), IMG.greatpet,      "Greatpet"),
  safeTransform(memelhundData,           next(), IMG.memelhund,     "Memelhund"),
  safeTransform(mokyksuniData,           next(), IMG.mokyksuni,     "Mokyk Šunį"),
  safeTransform(loretaData,              next(), IMG.loreta,        "Loreta"),
  safeTransform(olgapData,               next(), IMG.olgap,         "Olga P"),
  safeTransform(martynapaliulyteData,    next(), IMG.martyna,       "Martyna Paliulytė"),
  safeTransform(kinologekonsultuojaData, next(), IMG.kinologe,      "Kinologė Konsultuoja"),
  safeTransform(sunudarzelispovilasData, next(), IMG.sunudarzelis,  "Šunų Darželis Povilas"),
  safeTransform(treniruoksuniData,       next(), IMG.treniruoksuni, "Treniruok Šunį"),
  safeTransform(pethouseData,            next(), IMG.pethouse,      "Pet House"),
  safeTransform(NasraiData,             next(), IMG.nasrai,        "Nasrai"),
  safeTransform(BestasData,             next(), IMG.bestas,        "Bestas"),
  safeTransform(LidijosDresuroMokyklaData, next(), IMG.lidijos,    "Lidijos Dresūros Mokykla"),
  safeTransform(dresuroInstruktoriusData,  next(), IMG.dresuroInstr,"Dresūros Instruktorius"),
  safeTransform(UrbanDogData,            next(), IMG.urbanDog,      "Urban Dog"),
  ...transformMultiLocation(gabusdresuraiData, next(), IMG.gabusdresurai, "Gabus Dresurai"),
  ...transformMultiLocation(reksasData,        next(), IMG.reksas,        "Reksas"),
].filter(Boolean) as TrainingSchool[];

const GROOMING_CITIES = [
  vilnius, kaunas, siauliai, klaipeda, klaipedosRaj,
  kaunoRaj, vilniausRaj, alytausRaj, kedainiuRaj,
  marijampole,
] as any[];

const GROOMING_AS_TRAINING = groomingCitiesToTrainingSchools(GROOMING_CITIES);

const seen = new Set<string>();
export const TRAINING_SCHOOLS: TrainingSchool[] = [...MANUAL_SCHOOLS, ...GROOMING_AS_TRAINING].filter(s => {
  const key = `${s.name.toLowerCase().trim()}|${s.city.toLowerCase().trim()}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

export default TRAINING_SCHOOLS;
