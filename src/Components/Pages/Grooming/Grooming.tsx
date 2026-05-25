import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Percent,
  Clock,
  Star,
  Heart,
  CheckCircle,
  MapPin,
  Phone,
  SlidersHorizontal,
  ArrowRight,
  Scissors,
  X,
} from "lucide-react";

import Modal from "../../Modal/Modal";
import LoginForm from "../../../Login/LoginForm";
import RegistrationForm from "../../../Registration/RegistrationForm";
import donationImage from "../../../assets/donationImage.png";
import bannerImage from "../../../assets/pets-banner.jpg";
import { normalizeText } from "../../../utils/normalizeText";
import ALL_SALONS, { GroomingSalon } from "../../../data/grooming/groomingData";
import GroomingModal from "../../Booking/GroomingModal";
import CityAutocomplete from "../../Search/CityAutocomplete";
import { Seo, breadcrumbSchema, serviceSchema, itemListSchema } from "../../SEO";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80";

/* ─── Service type filter options – built dynamically from data ─────────────── */
// Falls back to hardcoded list when no data yet
const HARDCODED_TYPES = [
  { id: "Kirpykla",         label: "Kirpykla" },
  { id: "Sunu Viesbutis",   label: "Šunų viešbutis" },
  { id: "Kaciu Viesbutis",  label: "Kačių viešbutis" },
  { id: "Dresuros Mokykla", label: "Dresūros mokykla" },
];

const benefits = [
  { icon: Percent,     title: "Tikros kainos",          description: "Matote tikras kainas tiesiogiai iš kirpyklų puslapių – be papildomų mokesčių." },
  { icon: Shield,      title: "Patikrinti salonai",     description: "Visi salonai tikrinami ir listinami tik iš patikimų šaltinių." },
  { icon: Star,        title: "Tikri atsiliepimai",     description: "Skaitykite tikrus klientų atsiliepimus prieš rinkdamiesi kirpyklą." },
  { icon: Clock,       title: "Darbo laikai",           description: "Tikrinkite aktualų darbo laiką ir raskite kirpyklą, kuri dirba jums patogiu metu." },
  { icon: Heart,       title: "Meilė gyvūnams",         description: "Dirbame tik su salonais, kurie tikrai myli ir rūpinasi augintiniais." },
  { icon: CheckCircle, title: "Kokybiška priežiūra",    description: "Nagų kirpimas, maudymas, šukavimas ir profesionali kirpyba – viskas vienoje vietoje." },
];

/* ─── CARD COMPONENT ─────────────────────────────────────────────────────────── */
interface CardProps {
  salon: GroomingSalon;
  index: number;
  viewMode: "grid" | "list";
  onViewDetails: (s: GroomingSalon) => void;
}

const ServiceBadge = ({ type }: { type: string }) => (
  <span className="text-xs text-purple-700 bg-purple-100 px-3 py-1 rounded-full font-medium flex items-center gap-1">
    <Scissors className="w-2.5 h-2.5" />
    {type}
  </span>
);

const GroomingCard: React.FC<CardProps> = ({ salon, index, viewMode, onViewDetails }) => {
  const image   = salon.image || FALLBACK_IMAGE;
  const name    = salon.businessName || salon.title || "Kirpykla";
  const rating  = salon.rating || 0;

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0">
            <img src={image} alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 to-transparent" />
            {rating > 0 && (
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-gray-900">{rating.toFixed(1)}</span>
                {salon.reviewCount > 0 && <span className="text-xs text-gray-500">({salon.reviewCount})</span>}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{name}</h3>
              {salon.title && salon.businessName && salon.title !== salon.businessName && (
                <p className="text-sm text-gray-500 mb-2">{salon.title}</p>
              )}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-[#6d0ef1] flex-shrink-0" />
                <span>{salon.city}</span>
              </div>

              {/* Service type tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {salon.serviceTypes.map((t, i) => <ServiceBadge key={i} type={t} />)}
              </div>

              {/* Description */}
              {salon.description && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{salon.description}</p>
              )}

              {/* Price */}
              {salon.price && (
                <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                  <h4 className="text-xs font-semibold text-purple-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    Kaina
                  </h4>
                  <div className="text-lg font-bold text-[#6d0ef1]">{salon.price}</div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
              <div />
              <div className="flex gap-2">
                {salon.phone && (
                  <a href={`tel:${salon.phone}`}
                    className="flex items-center justify-center w-11 h-11 border-2 border-gray-200 text-gray-600 rounded-xl hover:border-[#6d0ef1] hover:text-[#6d0ef1] transition-all"
                    title="Skambinti">
                    <Phone className="w-4 h-4" />
                  </a>
                )}
                <button onClick={() => onViewDetails(salon)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#6d0ef1] text-white rounded-xl font-bold hover:bg-[#5a0bc9] transition shadow-md">
                  Plačiau <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // GRID MODE
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img src={image} alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {rating > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-gray-900">{rating.toFixed(1)}</span>
            {salon.reviewCount > 0 && <span className="text-xs text-gray-500">({salon.reviewCount})</span>}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-1 text-gray-900 line-clamp-1">{name}</h3>
        {salon.title && salon.businessName && salon.title !== salon.businessName && (
          <p className="text-xs text-gray-400 mb-2 line-clamp-1">{salon.title}</p>
        )}

        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-[#6d0ef1] flex-shrink-0" />
          <span>{salon.city}</span>
        </div>

        {/* Service type tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {salon.serviceTypes.slice(0, 2).map((t, i) => <ServiceBadge key={i} type={t} />)}
          {salon.serviceTypes.length > 2 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
              +{salon.serviceTypes.length - 2}
            </span>
          )}
        </div>

        {/* Description */}
        {salon.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">{salon.description}</p>
        )}

        {/* Price box */}
        {salon.price && (
          <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
            <h4 className="text-xs font-semibold text-purple-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              Kaina
            </h4>
            <div className="text-[#6d0ef1] font-bold text-base">{salon.price}</div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div />
          <div className="flex gap-2">
            {salon.phone && (
              <a href={`tel:${salon.phone}`}
                className="flex items-center justify-center w-11 h-11 border-2 border-gray-200 text-gray-600 rounded-xl hover:border-[#6d0ef1] hover:text-[#6d0ef1] transition-all"
                title="Skambinti">
                <Phone className="w-4 h-4" />
              </a>
            )}
            <button onClick={() => onViewDetails(salon)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#6d0ef1] text-white rounded-xl font-bold hover:bg-[#5a0bc9] transition shadow-md">
              Plačiau <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────────── */
const Grooming: React.FC = () => {
  const [cityQuery,    setCityQuery]    = useState("");
  const [typeFilter,   setTypeFilter]   = useState("all");
  const [showFilters,  setShowFilters]  = useState(false);
  const [viewMode,     setViewMode]     = useState<"grid" | "list">("grid");

  const [selectedSalon,    setSelectedSalon]    = useState<GroomingSalon | null>(null);
  const [servicesModalOpen, setServicesModalOpen] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loginMode,     setLoginMode]     = useState(true);

  // Build type list from real data, fallback to hardcoded
  const typeOptions = useMemo(() => {
    if (ALL_SALONS.length === 0) return HARDCODED_TYPES;
    const types = new Set<string>();
    ALL_SALONS.forEach((s) => s.serviceTypes.forEach((t) => types.add(t)));
    return Array.from(types).map((t) => ({ id: t, label: t }));
  }, []);

  const resetFilters = () => { setCityQuery(""); setTypeFilter("all"); };

  const filtered = useMemo(() => {
    let result = [...ALL_SALONS];

    if (cityQuery.trim()) {
      const q = normalizeText(cityQuery);
      result = result.filter((s) =>
        normalizeText(s.city || "").includes(q) ||
        normalizeText(s.citySlug).includes(q)
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((s) =>
        s.serviceTypes.some((t) => normalizeText(t).includes(normalizeText(typeFilter)))
      );
    }

    return result;
  }, [cityQuery, typeFilter]);

  const jsonLd = [
    serviceSchema({
      name: "Gyvūnų kirpyklos Lietuvoje",
      description:
        "Profesionalūs gyvūnų kirpėjai Lietuvoje – šunų ir kačių kirpimas, maudymas, nagų priežiūra, šunų viešbutis.",
      path: "/kirpimas",
    }),
    breadcrumbSchema([
      { name: "Pradžia", path: "/" },
      { name: "Gyvūnų kirpyklos", path: "/kirpimas" },
    ]),
    ...(filtered.length > 0
      ? [
          itemListSchema(
            `Gyvūnų kirpyklos${cityQuery ? ` (${cityQuery})` : ""}`,
            filtered.slice(0, 20).map((s) => ({
              name: s.businessName || s.title || "Kirpykla",
              path: `/kirpimas#${s.id}`,
            }))
          ),
        ]
      : []),
  ];

  return (
    <main className="pt-140 overflow-hidden">
      <Seo
        title="Gyvūnų kirpyklos Lietuvoje | Šunų ir kačių kirpimas Vilniuje, Kaune, Klaipėdoje | PetLietuva"
        description="Geriausios gyvūnų kirpyklos Lietuvoje – palyginkite kainas, atsiliepimus ir paslaugas. Profesionalus šunų ir kačių kirpimas, maudymas, nagų priežiūra ir šunų viešbutis vienoje vietoje."
        path="/kirpimas"
        keywords="gyvūnų kirpykla, šunų kirpimas, kačių kirpimas, gyvūnų kirpykla Vilnius, gyvūnų kirpykla Kaunas, gyvūnų kirpykla Klaipėda, šunų grooming, šunų viešbutis, augintinių priežiūra"
        jsonLd={jsonLd}
      />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative h-[540px] flex items-center justify-center text-center overflow-hidden">
        <img
          src={bannerImage}
          alt="Gyvūnų kirpykla Lietuvoje – profesionalus šunų ir kačių kirpimas"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-5xl px-6 text-white">
          <div className="mb-6 inline-flex items-center justify-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
              🐾 Nr. 1 gyvūnų kirpyklų platforma Lietuvoje
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Raskite geriausią kirpyklą{" "}
            <span className="block md:inline">savo augintiniui</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10">
            Nagų kirpimas, maudymas, šukavimas ir profesionali kirpyba – raskite viską vienoje vietoje
          </p>
          <div className="flex items-center bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl max-w-lg mx-auto">
            <div className="flex items-center gap-2 flex-1 px-4">
              <MapPin className="w-5 h-5 text-purple-600 shrink-0" />
              <CityAutocomplete
                value={cityQuery}
                onChange={setCityQuery}
                placeholder="Įveskite miestą..."
                wrapperClassName="relative flex-1"
                inputClassName="w-full py-3 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm"
                dropdownClassName="absolute z-[100] mt-2 w-full rounded-xl bg-white shadow-xl border border-gray-200 max-h-32 overflow-y-auto divide-y divide-gray-100"
              />
              {cityQuery && (
                <button onClick={() => setCityQuery("")} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button className="ml-2 px-7 py-3 rounded-full bg-[#6d0ef1] text-white font-semibold text-sm hover:bg-[#5b0bd0] transition-colors flex-shrink-0">
              Ieškoti
            </button>
          </div>
        </div>
      </section>

      {/* ── FILTERS BAR ────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center gap-3">

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full transition font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Paslaugos
              {typeFilter !== "all" && (
                <span className="w-5 h-5 rounded-full bg-[#6d0ef1] text-white text-xs flex items-center justify-center font-bold">1</span>
              )}
            </button>

            {showFilters && (
              <>
                <button onClick={() => setTypeFilter("all")}
                  className={`px-5 py-2.5 rounded-full transition font-semibold text-sm ${typeFilter === "all" ? "bg-[#6d0ef1] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  Visos
                </button>
                {typeOptions.map((t) => (
                  <button key={t.id} onClick={() => setTypeFilter(t.id)}
                    className={`px-5 py-2.5 rounded-full transition font-semibold text-sm ${typeFilter === t.id ? "bg-[#6d0ef1] text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                    {t.label}
                  </button>
                ))}
                {(typeFilter !== "all" || cityQuery) && (
                  <button onClick={resetFilters}
                    className="flex items-center gap-1 px-3 py-2.5 rounded-full text-sm text-red-500 border border-red-200 hover:bg-red-50 transition font-semibold">
                    <X className="w-3.5 h-3.5" /> Išvalyti
                  </button>
                )}
              </>
            )}

            <div className="flex items-center gap-3 ml-auto">
              <div className="text-sm text-gray-600 font-medium">
                Rasta: <span className="text-[#6d0ef1] font-bold">{filtered.length}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition ${viewMode === "grid" ? "bg-white shadow" : "hover:bg-gray-200"}`} title="Kortelės">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition ${viewMode === "list" ? "bg-white shadow" : "hover:bg-gray-200"}`} title="Sąrašas">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID ───────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Gyvūnų kirpyklos
              {cityQuery && <span className="text-[#6d0ef1]"> · {cityQuery}</span>}
            </h2>
            <p className="text-gray-600">Raskite tobulą kirpyklą savo augintiniui</p>
          </motion.div>

          {ALL_SALONS.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Scissors className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Duomenys dar neįkelti</h3>
              <p className="text-gray-600 max-w-md mb-2">
                Norėdami matyti kirpyklas, pirma paleiskite scraper'į:
              </p>
              <code className="block bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-mono mb-6">
                node grooming-scraper.js
              </code>
              <p className="text-gray-500 text-sm">
                Po to atkommentuokite importus <code className="bg-gray-100 px-1 rounded">groomingData.ts</code> faile.
              </p>
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-3xl">🐾</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kirpyklų nerasta</h3>
              <p className="text-gray-600 max-w-md mb-6">Pagal pasirinktus filtrus nerasta kirpyklų.</p>
              <button onClick={resetFilters}
                className="px-6 py-3 rounded-xl bg-[#6d0ef1] text-white font-semibold hover:bg-[#5a0bc9] transition">
                Išvalyti filtrus
              </button>
            </motion.div>
          ) : (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
              {filtered.map((salon, index) => (
                <GroomingCard
                  key={salon.id}
                  salon={salon}
                  index={index}
                  viewMode={viewMode}
                  onViewDetails={(s) => { setSelectedSalon(s); setServicesModalOpen(true); }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      {/* ── DONATION BANNER ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-[45%,55%] gap-0">
            <div className="relative h-96 md:h-auto overflow-hidden">
              <img src={donationImage} alt="Support pets" className="w-full h-full object-cover rounded-l-3xl" />
            </div>
            <div className="p-12 md:p-16 flex flex-col justify-center bg-gray-50">
              <div className="inline-flex items-center gap-2 self-start mb-6 px-4 py-2 bg-red-50 rounded-full">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-red-600">Parama</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Padėkite mums pakeisti gyvenimus</h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">Jūsų parama padeda prieglaudoms teikti gyvybę gelbstinčią priežiūrą gyvūnams, kuriems to labiausiai reikia.</p>
              <div>
                <a href="/donate" className="inline-flex items-center gap-2 px-8 py-4 bg-[#f99e1f] text-white rounded-xl font-bold text-lg hover:bg-[#e88d0e] transition-all shadow-lg hover:shadow-xl">
                  Paaukoti dabar <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODALS ─────────────────────────────────────────────────────── */}
      <GroomingModal
        provider={selectedSalon}
        isOpen={servicesModalOpen}
        onClose={() => setServicesModalOpen(false)}
      />
      <Modal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)}>
        {loginMode
          ? <LoginForm onClose={() => setAuthModalOpen(false)} onSuccess={() => setAuthModalOpen(false)} switchToRegister={() => setLoginMode(false)} />
          : <RegistrationForm onClose={() => setAuthModalOpen(false)} onSuccess={() => setAuthModalOpen(false)} switchToLogin={() => setLoginMode(true)} />}
      </Modal>
    </main>
  );
};

export default Grooming;