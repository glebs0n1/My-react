// src/data/veterinarian/vetData.ts
// Importuoja visų miestų klinikas su pilnais detaliais

import vilnius     from "./vetklinikos-miestai/vilnius.json";
import kaunas      from "./vetklinikos-miestai/kaunas.json";
import klaipeda    from "./vetklinikos-miestai/klaipeda.json";
import siauliai    from "./vetklinikos-miestai/siauliai.json";
import panevezys   from "./vetklinikos-miestai/panevezys.json";
import alytus      from "./vetklinikos-miestai/alytus.json";
import marijampole from "./vetklinikos-miestai/marijampole.json";
import mazeikiai   from "./vetklinikos-miestai/mazeikiai.json";
import utena       from "./vetklinikos-miestai/utena.json";
import visaginas   from "./vetklinikos-miestai/visaginas.json";
import telsiai     from "./vetklinikos-miestai/telsiai.json";
import plunge      from "./vetklinikos-miestai/plunge.json";
import kretinga    from "./vetklinikos-miestai/kretinga.json";
import jonava      from "./vetklinikos-miestai/jonava.json";

export interface WorkingHourRow {
  day: string;
  hours: string;
}

export interface WhyUsItem {
  title: string;
  description: string | null;
}

export interface ClinicPrice {
  symbols: string;
  label: string;
  raw: string | null;
}

export interface Clinic {
  name: string;
  city: string;
  citySlug: string;
  status: string;
  isOpen: boolean;
  tags: string[];
  price: ClinicPrice;
  phone: string | null;
  url: string | null;
  image: string | null;
  fullName: string | null;
  address: string | null;
  addressCity: string | null;
  email: string | null;
  website: string | null;
  workingHoursLabel: string | null;
  workingHours: WorkingHourRow[];
  services: string[];
  whyUs: WhyUsItem[];
  animals: string[];
  languages: string[];
  payment: string[];
  amenities: string[];
  mapSrc: string | null;
}

export interface CityData {
  city: string;
  citySlug: string;
  pageTitle: string;
  pageDesc: string;
  totalClinics: number;
  scrapedAt: string;
  clinics: Clinic[];
}

const ALL_CITIES: CityData[] = [
  vilnius, kaunas, klaipeda, siauliai, panevezys,
  alytus, marijampole, mazeikiai, utena, visaginas,
  telsiai, plunge, kretinga, jonava,
] as CityData[];

export const ALL_CLINICS: (Clinic & { id: number })[] = ALL_CITIES
  .flatMap((c) => c.clinics)
  .map((clinic, index) => ({ ...clinic, id: index + 1 }));

export const CITY_LIST = ALL_CITIES.map((c) => ({
  label: c.city,
  slug: c.citySlug,
  count: c.totalClinics,
}));

export default ALL_CLINICS;