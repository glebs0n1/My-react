// src/Components/Pages/Veterinarian/Veterinarian.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Percent, Clock, Star, Heart, CheckCircle,
  MapPin, Phone, SlidersHorizontal, ArrowRight, X,
} from "lucide-react";

import Modal from "../../Modal/Modal";
import LoginForm from "../../../Login/LoginForm";
import RegistrationForm from "../../../Registration/RegistrationForm";
import donationImage from "../../../assets/donationImage.png";
import bannerImage from "../../../assets/pets-banner.jpg";
import { useAuth } from "../../../context/AuthContext";
import { normalizeText } from "../../../utils/normalizeText";
import ALL_CLINICS, { Clinic } from "../../../data/veterinarian/vetData";
import ClinicDetailModal from "./ClinicDetailModal";
import CityAutocomplete from "../../Search/CityAutocomplete";
import Pagination from "../../Pagination/Pagination";

const CLINICS_PER_PAGE = 12;
import {
  Seo,
  veterinaryCareSchema,
  breadcrumbSchema,
  itemListSchema,
  SITE_URL,
} from "../../SEO";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80";

const PRICE_FILTERS = [
  { id: "all", label: "Visos kainos" },
  { id: "€",   label: "€ Pigu" },
  { id: "€€",  label: "€€ Vidutiniškai" },
  { id: "€€€", label: "€€€ Brangu" },
];

const benefits = [
  { icon: Shield,      title: "Patikimos klinikos",    description: "Visos klinikos yra licencijuotos ir atitinka aukščiausius standartus." },
  { icon: Star,        title: "Patyrę gydytojai",      description: "Sertifikuoti veterinarijos gydytojai su metų patirtimi." },
  { icon: Clock,       title: "Greita registracija",   description: "Rezervuokite vizitą vos keliais paspaudimais bet kuriuo metu." },
  { icon: Heart,       title: "Rūpestis augintiniais", description: "Individualus dėmesys kiekvienam augintiniui ir jo poreikiams." },
  { icon: CheckCircle, title: "Šiuolaikinė įranga",   description: "Naudojama naujausia diagnostikos ir gydymo įranga." },
  { icon: Percent,     title: "Skaidrios kainos",      description: "Aiškios kainos be papildomų mokesčių ir netikėtumų." },
];

/* ═══════════════════════════════════════════════════════════════════════════
   CLINIC CARD
═══════════════════════════════════════════════════════════════════════════ */
interface CardProps {
  clinic: Clinic & { id: number };
  index: number;
  viewMode: "grid" | "list";
  onViewDetails: (c: Clinic & { id: number }) => void;
}

const ClinicCard: React.FC<CardProps> = ({ clinic, index, viewMode, onViewDetails }) => {
  const image = clinic.image || FALLBACK_IMAGE;

  const StatusBadge = () => (
    <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm ${clinic.isOpen ? "bg-emerald-500/90 text-white" : "bg-red-500/90 text-white"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${clinic.isOpen ? "bg-white animate-pulse" : "bg-white"}`} />
      {clinic.isOpen ? "Atidaryta" : "Uždaryta"}
    </span>
  );

  const PriceBadge = () => (
    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
      <span className="text-xs font-bold text-[#6d0ef1]">{clinic.price.symbols}</span>
    </div>
  );

  const Tags = ({ max }: { max: number }) => (
    <div className="flex flex-wrap gap-2">
      {clinic.tags.slice(0, max).map((tag, i) => (
        <span key={i} className="text-xs text-purple-700 bg-purple-100 px-3 py-1 rounded-full font-medium capitalize">{tag}</span>
      ))}
      {clinic.tags.length > max && (
        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">+{clinic.tags.length - max}</span>
      )}
    </div>
  );

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#6d0ef1]/30"
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-72 h-56 md:h-auto flex-shrink-0">
            <img src={image} alt={clinic.name} className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 to-transparent" />
            <div className="absolute top-3 left-3"><StatusBadge /></div>
            <div className="absolute top-3 right-3"><PriceBadge /></div>
          </div>
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{clinic.name}</h3>
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-[#6d0ef1] flex-shrink-0" />
                <span>{clinic.city}</span>
              </div>
              <div className="mb-4"><Tags max={5} /></div>
              {clinic.phone && (
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-700">
                  <Phone className="w-4 h-4 text-[#6d0ef1]" />
                  <a href={`tel:${clinic.phone}`} className="hover:text-[#6d0ef1] transition font-medium">{clinic.phone}</a>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Kainų lygis</div>
                <div className="text-xl font-bold text-[#6d0ef1]">
                  {clinic.price.symbols}
                  {clinic.price.label && <span className="text-sm font-normal text-gray-500 ml-1">({clinic.price.label})</span>}
                </div>
              </div>
              <div className="flex gap-2">
                {clinic.phone && (
                  <a href={`tel:${clinic.phone}`}
                    className="flex items-center justify-center w-11 h-11 border-2 border-gray-200 text-gray-600 rounded-xl hover:border-[#6d0ef1] hover:text-[#6d0ef1] transition-all">
                    <Phone className="w-4 h-4" />
                  </a>
                )}
                <button onClick={() => onViewDetails(clinic)}
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative h-52 overflow-hidden">
        <img src={image} alt={clinic.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3"><StatusBadge /></div>
        <div className="absolute top-3 right-3"><PriceBadge /></div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-1">{clinic.name}</h3>
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-[#6d0ef1] flex-shrink-0" />
          <span>{clinic.city}</span>
        </div>
        <div className="mb-4"><Tags max={3} /></div>
        {clinic.phone && (
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-700">
            <Phone className="w-4 h-4 text-[#6d0ef1]" />
            <a href={`tel:${clinic.phone}`} className="hover:text-[#6d0ef1] transition font-medium">{clinic.phone}</a>
          </div>
        )}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Kainų lygis</div>
            <div className="text-lg font-bold text-[#6d0ef1]">
              {clinic.price.symbols}
              {clinic.price.label && <span className="text-xs font-normal text-gray-500 ml-1">({clinic.price.label})</span>}
            </div>
          </div>
          <div className="flex gap-2">
            {clinic.phone && (
              <a href={`tel:${clinic.phone}`}
                className="flex items-center justify-center w-11 h-11 border-2 border-gray-200 text-gray-600 rounded-xl hover:border-[#6d0ef1] hover:text-[#6d0ef1] transition-all">
                <Phone className="w-4 h-4" />
              </a>
            )}
            <button onClick={() => onViewDetails(clinic)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#6d0ef1] text-white rounded-xl font-bold hover:bg-[#5a0bc9] transition shadow-md text-sm">
              Plačiau <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════════════ */
const Veterinarian: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const [cityQuery, setCityQuery]     = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [tagFilter, setTagFilter]     = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode]       = useState<"grid" | "list">("grid");

  const [selectedClinic, setSelectedClinic] = useState<(Clinic & { id: number }) | null>(null);
  const [detailOpen, setDetailOpen]         = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loginMode, setLoginMode]         = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    ALL_CLINICS.forEach((c) => c.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, []);

  const filtered = useMemo(() => {
    let result = [...ALL_CLINICS];
    if (cityQuery.trim()) {
      const q = normalizeText(cityQuery);
      result = result.filter((c) => normalizeText(c.city).includes(q));
    }
    if (priceFilter !== "all") {
      result = result.filter((c) => c.price.symbols === priceFilter);
    }
    if (tagFilter !== "all") {
      result = result.filter((c) =>
        c.tags.some((t) => normalizeText(t).includes(normalizeText(tagFilter)))
      );
    }
    return result;
  }, [cityQuery, priceFilter, tagFilter]);

  const resetFilters = () => { setCityQuery(""); setPriceFilter("all"); setTagFilter("all"); };

  const activeFilterCount = (priceFilter !== "all" ? 1 : 0) + (tagFilter !== "all" ? 1 : 0);

  useEffect(() => {
    setCurrentPage(1);
  }, [cityQuery, priceFilter, tagFilter]);

  const totalPages = Math.ceil(filtered.length / CLINICS_PER_PAGE);
  const startIndex = (currentPage - 1) * CLINICS_PER_PAGE;
  const paginatedClinics = filtered.slice(startIndex, startIndex + CLINICS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ─── Cities present in the dataset, for local SEO copy. ─── */
  const topCities = Array.from(
    new Set(ALL_CLINICS.map((c) => c.city).filter(Boolean))
  ).slice(0, 8);

  /* ─── JSON-LD ──────────────────────────────────────────────────────── */
  const jsonLd = [
    veterinaryCareSchema([
      { name: "Veterinarinė konsultacija",       description: "Bendras augintinio sveikatos patikrinimas ir konsultacija." },
      { name: "Skiepai ir profilaktika",          description: "Šuniukų ir kačiukų vakcinacijos, čipavimas, parazitų profilaktika." },
      { name: "Sterilizacija ir kastracija",      description: "Saugios chirurginės sterilizacijos ir kastracijos procedūros." },
      { name: "Skubi veterinarinė pagalba 24/7",  description: "Skubūs atvejai, traumos, apsinuodijimai – pagalba augintiniui dieną ir naktį." },
      { name: "Chirurgija ir diagnostika",        description: "Šiuolaikinė chirurgija, kraujo tyrimai, rentgenas, echoskopija, USG." },
      { name: "Dantų priežiūra",                  description: "Profesionalus dantų valymas ir burnos ertmės priežiūra ultragarsu." },
      { name: "Onkologija ir dermatologija",      description: "Specializuotos klinikos navikų gydymui ir odos ligoms." },
    ]),
    breadcrumbSchema([
      { name: "Pradžia", path: "/" },
      { name: "Veterinarai", path: "/veterinaras" },
    ]),
    ...(filtered.length > 0
      ? [
          itemListSchema(
            cityQuery
              ? `Veterinarijos klinikos – ${cityQuery}`
              : "Veterinarijos klinikos Lietuvoje",
            filtered.slice(0, 30).map((c) => ({
              name: c.name,
              path: `/veterinaras#${c.id}`,
            }))
          ),
        ]
      : []),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/veterinaras#collection`,
      name: "Veterinarai ir veterinarijos klinikos Lietuvoje",
      description:
        "Patikrintos veterinarijos klinikos visoje Lietuvoje – konsultacijos, skiepai, chirurgija, skubi pagalba 24/7. Palyginkite kainas ir užsiregistruokite vizitui.",
      inLanguage: "lt-LT",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      numberOfItems: ALL_CLINICS.length,
    },
  ];

  return (
    <main className="pt-140 overflow-hidden">
      <Seo
        title="Veterinarai Lietuvoje | Veterinarijos klinikos Vilnius, Kaunas, Klaipėda | Skubi pagalba 24/7 | PetLietuva"
        description={`${ALL_CLINICS.length}+ patikrintų veterinarijos klinikų Lietuvoje vienoje vietoje. Skubi veterinarinė pagalba 24/7, chirurgija, skiepai, sterilizacija, dantų valymas, onkologija. Palyginkite kainas, atsiliepimus ir užsiregistruokite vizitui internetu.`}
        path="/veterinaras"
        keywords="veterinaras, veterinarijos klinika, skubus veterinaras, gyvūnų gydytojas, veterinaras Vilniuje, veterinaras Kaune, veterinaras Klaipėdoje, veterinaras Šiauliuose, veterinaras Panevėžyje, naktinis veterinaras, 24/7 veterinaras, gyvūnų chirurgija, šunų skiepai, kačių skiepai, sterilizacija, kastracija, augintinio skubi pagalba, gyvūnų dantų valymas, gyvūnų rentgenas, gyvūnų echoskopija"
        jsonLd={jsonLd}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[540px] flex items-center justify-center text-center overflow-hidden">
        <img
          src={bannerImage}
          alt="Veterinarijos klinikos Lietuvoje – skubi pagalba augintiniui Vilniuje, Kaune, Klaipėdoje"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-5xl px-6 text-white">
          <div className="mb-6 inline-flex items-center justify-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
              🏥 Patikimos klinikos visoje Lietuvoje
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Veterinarai Lietuvoje –{" "}
            <span className="block md:inline text-amber-300">skubi pagalba, klinikos, vizito rezervacija</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-3xl mx-auto">
            Raskite patikimą <strong>veterinarą Vilniuje, Kaune, Klaipėdoje</strong> ar bet kuriame kitame Lietuvos
            mieste. <strong>Skubi veterinarinė pagalba 24/7</strong>, chirurgija, skiepai, sterilizacija ir
            profilaktinė priežiūra – palyginkite klinikas vienoje vietoje.
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
            </div>
            <button className="ml-2 px-7 py-3 rounded-full bg-[#6d0ef1] text-white font-semibold text-sm hover:bg-[#5b0bd0] transition-colors flex-shrink-0">
              Ieškoti
            </button>
          </div>
        </div>
      </section>

      {/* ── INTRO (LLM + Featured Snippet friendly) ───────────────────────
          Short factual summary so Google AI Overviews, ChatGPT, Perplexity
          etc. can cite a clean answer without scraping the entire clinic
          list. Internal links to article hub + city-based keywords. */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Kaip rasti veterinarą Lietuvoje?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          <strong>PetLietuva veterinarų katalogas</strong> – tai{" "}
          <strong>{ALL_CLINICS.length}+ patikrintų veterinarijos klinikų</strong> visoje Lietuvoje
          vienoje vietoje. Įveskite miestą, filtruokite pagal kainą ar paslaugą ir
          rezervuokite vizitą per kelias minutes.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Klinikose teikiamos paslaugos: <strong>veterinarinė konsultacija</strong>,{" "}
          <Link to="/care/skiepai" className="text-purple-700 underline hover:text-purple-900">skiepai ir profilaktika</Link>,{" "}
          <Link to="/care/kastracija" className="text-purple-700 underline hover:text-purple-900">sterilizacija ir kastracija</Link>,{" "}
          chirurgija, dantų valymas, rentgenas, echoskopija (USG), kraujo tyrimai bei{" "}
          <Link to="/health/skubus-atvejai" className="text-purple-700 underline hover:text-purple-900">skubi pagalba 24/7</Link>.
          Daugiau apie augintinio sveikatą rasite mūsų{" "}
          <Link to="/vaistai" className="text-purple-700 underline hover:text-purple-900">vaistų ir sveikatos vadovuose</Link>.
        </p>
        {topCities.length > 0 && (
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong>Veterinarai pagal miestą:</strong>{" "}
            {topCities.map((city, i) => (
              <React.Fragment key={city}>
                <button
                  type="button"
                  onClick={() => setCityQuery(city)}
                  className="text-purple-700 underline hover:text-purple-900"
                >
                  veterinaras {city}
                </button>
                {i < topCities.length - 1 ? ", " : "."}
              </React.Fragment>
            ))}
          </p>
        )}
      </section>

      {/* ── FILTERS BAR ───────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-sm transition"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtrai
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#6d0ef1] text-white text-xs flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  {/* Price filters */}
                  {PRICE_FILTERS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setPriceFilter(f.id)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                        priceFilter === f.id ? "bg-[#6d0ef1] text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}

                  {/* Tag filters */}
                  {uniqueTags.slice(0, 5).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setTagFilter(tagFilter === tag ? "all" : tag)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition capitalize ${
                        tagFilter === tag ? "bg-[#6d0ef1] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}

                  {(activeFilterCount > 0 || cityQuery) && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-1 px-3 py-2 rounded-full text-xs text-red-500 border border-red-200 hover:bg-red-50 transition font-semibold"
                    >
                      <X className="w-3 h-3" /> Išvalyti
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-3 ml-auto">
              <div className="text-sm text-gray-600 font-medium">
                Rasta: <span className="text-[#6d0ef1] font-bold">{filtered.length}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition ${viewMode === "grid" ? "bg-white shadow" : "hover:bg-gray-200"}`}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition ${viewMode === "list" ? "bg-white shadow" : "hover:bg-gray-200"}`}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLINICS GRID ──────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Veterinarijos klinikos
              {cityQuery && <span className="text-[#6d0ef1]"> · {cityQuery}</span>}
            </h2>
            <p className="text-gray-600">Raskite geriausią veterinarijos kliniką savo augintiniui</p>
          </motion.div>

          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-3xl">🏥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Klinikų nerasta</h3>
              <p className="text-gray-600 max-w-md mb-6">Pagal pasirinktus filtrus klinikų neradome.</p>
              <button onClick={resetFilters} className="px-6 py-3 rounded-xl bg-[#6d0ef1] text-white font-semibold hover:bg-[#5a0bc9] transition">
                Išvalyti filtrus
              </button>
            </motion.div>
          ) : (
            <>
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                {paginatedClinics.map((clinic, index) => (
                  <ClinicCard
                    key={clinic.id}
                    clinic={clinic}
                    index={index}
                    viewMode={viewMode}
                    onViewDetails={(c) => { setSelectedClinic(c); setDetailOpen(true); }}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pt-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">Kodėl rinktis mus?</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Jūsų augintinis nusipelno geriausio</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Mes sujungiame geriausias Lietuvos veterinarijos klinikas vienoje platformoje</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-11 h-11 rounded-xl bg-[#f2eef6] flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-[#6d0ef1]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
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

      {/* ── CLINIC DETAIL MODAL ───────────────────────────────────────────── */}
      <ClinicDetailModal
        clinic={selectedClinic}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
      />

      {/* ── AUTH MODAL ────────────────────────────────────────────────────── */}
      <Modal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)}>
        {loginMode ? (
          <LoginForm onClose={() => setAuthModalOpen(false)} onSuccess={() => setAuthModalOpen(false)} switchToRegister={() => setLoginMode(false)} />
        ) : (
          <RegistrationForm onClose={() => setAuthModalOpen(false)} onSuccess={() => setAuthModalOpen(false)} switchToLogin={() => setLoginMode(true)} />
        )}
      </Modal>
    </main>
  );
};

export default Veterinarian;