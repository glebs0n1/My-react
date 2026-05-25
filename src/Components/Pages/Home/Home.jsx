import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import petsRaw from "../../../data/shelters/lese/scraped_lese_vilnius.json";
import petsDataBeglobis from "../../../data/shelters/beglobis/beglobis.json";
import { loadScrapedPets } from "../../../utils/mapPet";

import SearchBar from "../../Search/SearchBar";
import Donation from "../../Donation/Donation";
import donationPetImage from "../../../assets/dog.jpeg";
import donationImage from "../../../assets/donationImage.png";

import PetCard from "../../PetCard/PetCard";

import bannerImage from "../../../assets/hero-banner.jpeg";
import dogIcon from "../../../assets/dog.png";
import catIcon from "../../../assets/cat.png";
import animalsIcon from "../../../assets/animals.png";

import {
  Heart,
  ArrowRight,
} from "lucide-react";


import {
  Seo,
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
  itemListSchema,
} from "../../SEO";

/* ================= STATIC CONFIG ================= */

const PET_TYPES = [
  { label: "Šunys", icon: dogIcon, link: "/dogs" },
  { label: "Katės", icon: catIcon, link: "/cats" },
  { label: "Kiti gyvūnai", icon: animalsIcon, link: "/other-animals" },
];

const SERVICES = [
  {
    title: "Dresūra ir mokymai",
    description: "Profesionalūs treneriai padės jūsų augintiniui tapti klusnesniam ir laimingesniam. Individualūs ir grupiniai užsiėmimai.",
    link: "/training",
    accent: "from-blue-500 to-cyan-500",
    emoji: "🎓",
    stats: [
      { value: "200+", label: "Trenerių" },
      { value: "95%", label: "Sėkmė" },
      { value: "24/7", label: "Pagalba" },
    ],
  },
  {
    title: "Veterinarijos paslaugos",
    description: "Patikrintos klinikos su modernia įranga. Reguliarūs patikrinimai, vakcinacijos ir skubios pagalbos paslauga.",
    link: "/veterinarian",
    accent: "from-emerald-500 to-teal-500",
    emoji: "🏥",
    stats: [
      { value: "500+", label: "Klinikų" },
      { value: "4.8★", label: "Įvertinimas" },
      { value: "Emergency", label: "24/7" },
    ],
  },
  {
    title: "Priežiūra ir grooming",
    description: "Pilna grooming paslauga: kirpimas, maudymas, nagų priežiūra. Jūsų augintinis atrodys ir jaušis puikiai!",
    link: "/grooming",
    accent: "from-pink-500 to-rose-500",
    emoji: "✨",
    stats: [
      { value: "300+", label: "Salonų" },
      { value: "98%", label: "Klientų" },
      { value: "1h", label: "Vidutinė" },
    ],
  },
  {
    title: "Straipsniai ir patarimai",
    description: "Ekspertų straipsniai apie augintinių priežiūrą, mitybą, sveikatą ir elgesį. Nuolat atnaujinamas turinys.",
    link: "/articles",
    accent: "from-amber-500 to-orange-500",
    emoji: "📚",
    stats: [
      { value: "500+", label: "Straipsnių" },
      { value: "Daily", label: "Nauji" },
      { value: "Free", label: "Nemokama" },
    ],
  },
  {
    title: "Bendruomenė",
    description: "Prisijunkite prie augintinių savininkų bendruomenės. Dalinkitės patirtimi, užduokite klausimus, raskite draugų.",
    link: "/community",
    accent: "from-purple-500 to-indigo-500",
    emoji: "👥",
    stats: [
      { value: "15K+", label: "Narių" },
      { value: "Active", label: "Kasdien" },
      { value: "100+", label: "Events" },
    ],
  },
];

/* ================= MAIN COMPONENT ================= */

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const scrollerRef = useRef(null);

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    console.log("Searching for:", searchQuery);
  };

  useEffect(() => {
    const normalizedPets = loadScrapedPets(petsRaw, petsDataBeglobis);
    setPets(normalizedPets);
    setLoading(false);
  }, []);

  const scrollByCards = (direction) => {
    if (!scrollerRef.current) return;
    const cards = scrollerRef.current.querySelectorAll('[data-card]');
    if (cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * direction;
    scrollerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    breadcrumbSchema([{ name: "Pradžia", path: "/" }]),
    itemListSchema("PetLietuva pagrindinės paslaugos", [
      { name: "Gyvūnų prieglaudos ir įvaikinimas", path: "/prieglaudos" },
      { name: "Veterinarai Lietuvoje", path: "/veterinaras" },
      { name: "Šunų dresūra", path: "/dresura" },
      { name: "Gyvūnų kirpyklos", path: "/kirpimas" },
      { name: "Vaistai augintiniams", path: "/vaistai" },
    ]),
  ];

  return (
    <main className="pt-0">
      <Seo
        title="PetLietuva | Gyvūnų prieglaudos, veterinarai ir paslaugos Lietuvoje"
        description="Surask veterinarą, gyvūnų prieglaudą, dresuotoją ar kirpyklą savo mieste. PetLietuva – Nr. 1 gyvūnų platforma Lietuvoje. 14 500+ prieglaudų ir patikrintų specialistų vienoje vietoje."
        path="/"
        keywords="gyvūnų prieglauda Lietuvoje, veterinaras Vilniuje, šunų dresūra Kaunas, gyvūnų kirpykla Klaipėda, įvaikinti šunį, įvaikinti katę, pamesti augintiniai, augintinių priežiūra, skubi veterinarinė pagalba"
        jsonLd={jsonLd}
      />

      {/* ================= HERO ================= */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={bannerImage}
            alt="Įvaikinti gyvūną Lietuvoje – PetLietuva platforma"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          {/* Purple badge */}
          <div className="relative z-10 max-w-5xl px-6 text-white">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-sm font-semibold mb-8 shadow-lg">
              Didžiausia gyvūnų bendruomenė Lietuvoje

            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Raskite veterinarą, prieglaudą ir paslaugas{" "}
            <span className="text-amber-300">savo augintiniui</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl mb-10 opacity-95 max-w-3xl mx-auto">
            PetLietuva jungia gyvūnų savininkus su patikimais{" "}
            <strong className="font-bold">veterinarais, dresuotojais, kirpyklomis ir 14 500+ prieglaudomis</strong>{" "}
            visoje Lietuvoje – Vilniuje, Kaune, Klaipėdoje ir kituose miestuose.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={(e) => setSearchQuery(e.target.value)}
              onSearchSubmit={handleSearchSubmit}
            />
          </div>

          {/* Quick local-SEO CTAs */}
          <nav aria-label="Pagrindinės paslaugos" className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/veterinaras" className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-sm font-medium transition">
              Rask veterinarą netoli jūsų
            </Link>
            <Link to="/prieglaudos" className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-sm font-medium transition">
              Padėk gyvūnų prieglaudoms
            </Link>
            <Link to="/dresura" className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-sm font-medium transition">
              Šunų dresūra
            </Link>
            <Link to="/kirpimas" className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-sm font-medium transition">
              Gyvūnų kirpykla
            </Link>
          </nav>
        </div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ================= PET TYPES ================= */}
      <section className="relative z-10 -mt-24 pb-12">
        <div className="flex justify-center gap-4 sm:gap-6 px-4">
          {PET_TYPES.map(({ label, icon, link }) => (
            <Link
              key={label}
              to={link}
              className="group"
              aria-label={`Browse ${label}`}
            >
              <div
                className="
                  w-[130px] h-[130px]
                  sm:w-[170px] sm:h-[160px]
                  md:w-[210px] md:h-[180px]
                  bg-white rounded-3xl
                  flex flex-col items-center justify-center gap-2
                  shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                  border border-gray-100
                  transition-all duration-300
                  group-hover:shadow-[0_12px_50px_rgba(98,0,238,0.2)]
                  group-hover:border-[#6200EE]/40
                  group-hover:-translate-y-1
                "
              >
                <img
                  src={icon}
                  alt={label}
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-2 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="font-bold text-gray-900 text-sm sm:text-base md:text-lg">
                  {label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= PETS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Gyvūnai, kuriuos galima įsivaikinti
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Susipažinkite su kai kuriais iš mūsų mielų augintinių, kurie laukia amžino namų 🐾
          </p>
        </header>

        {/* Pets Grid */}
        <div
          className="
            grid
            gap-8
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-[repeat(4,minmax(317px,1fr))]
          "
        >
          {loading ? (
            <p className="col-span-full text-center text-gray-500">
              Loading pets...
            </p>
          ) : (
            pets.slice(0, 4).map((pet) => (
              <div
                key={`grid-${pet.id}`}
                className="
                  h-full
                  transition-transform
                  hover:-translate-y-2
                "
              >
                <PetCard pet={pet} />
              </div>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            to="/shelter"
            className="
              inline-flex items-center
              px-10 py-4
              rounded-full
              bg-[#6200EE]
              text-white font-semibold text-lg
              hover:bg-[#5300d6]
              shadow-lg hover:shadow-xl
              transition-all
            "
          >
            Peržiūrėti visus gyvūnus
          </Link>
        </div>
      </section>

      {/* ================= DONATION BANNER ================= */}
      <Donation
        image={donationPetImage}
        title="Padėkite mums pakeisti gyvūnų likimus"
        text="Jūsų auka padeda rūpintis gyvūnais, kuriems reikia pagalbos – maistas, gydymas ir namai."
        cta="Paaukoti dabar"
      />

      {/* ================= WHY PET OWNERS TRUST US ================= */}
      <section className="relative bg-gray-50 border-t border-gray-200 py-24 overflow-hidden">
        <div className="absolute -top-24 right-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-24 left-0 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-60" />

        <div className="relative max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block mb-3 px-4 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
              Patikimas gyvūnų savininkams
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kodėl gyvūnų savininkai pasitiki mūsų platforma
            </h2>

            <p className="text-gray-600 text-lg">
              Nuo įvaikinimo iki visą gyvenimą trunkančios priežiūros – mes bendradarbiaujame tik su patikrintais prieglaudomis, veterinarijos gydytojais ir gyvūnų priežiūros specialistais.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏥",
                title: "Patikrintos klinikos",
                text: "Kiekviena klinika ir prieglauda yra tikrinama, siekiant užtikrinti licencijuotą, profesionalią priežiūrą.",
              },
              {
                icon: "📍",
                title: "Netoliese ir lengvai pasiekiama",
                text: "Raskite patikimas paslaugas netoli jūsų su aiškiais nurodymais ir kontaktine informacija.",
              },
              {
                icon: "📅",
                title: "Lengvi susitikimai",
                text: "Užsisakykite vizitus arba susisiekite su klinikomis tiesiogiai, be laukimo ir ilgų skambučių.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-gray-200 text-center">
            {[
              ["500+", "Verified Clinics"],
              ["10,000+", "Pet Owners Helped"],
              ["24/7", "Care Availability"],
              ["4.8 ★", "Average Rating"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-gray-600 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ADOPTION CARE PATHS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-28">
        <header className="text-center mb-16">
          <span className="inline-block mb-3 px-4 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
            Parama po įvaikinimo
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sukurkite savo naujam augintiniui laimingą gyvenimą
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Įvaikinimas yra tik pradžia. Mes padėsime jums išmokyti naująjį augintinį, rūpintis jo sveikata ir kasdieniu gyvenimu.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Dog Path */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:-translate-y-1 transition">
            <img
              src="https://images.unsplash.com/photo-1601758064226-0c3eecf79c8b"
              className="h-64 w-full object-cover"
              alt="Įvaikintas šuo Lietuvoje su naująja šeima"
              loading="lazy"
              decoding="async"
            />

            <div className="p-8">
              <h3 className="text-xl font-semibold mb-3">Gyvenimas su nauju šunimi</h3>

              <p className="text-gray-600 mb-6">
                Mokymo programos, sveikatos patikrinimai, mitybos planai ir patikrinti veterinarai – pritaikyti įvaikintiems šunims.
              </p>

              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>✔ First vet visit & vaccination plan</li>
                <li>✔ Training for anxiety & behavior</li>
                <li>✔ Nutrition & medication guidance</li>
              </ul>

              <div className="flex justify-between items-center">
                <Link to="/articles/dogs" className="font-semibold text-[#6200EE] hover:underline">
                  Šunų priežiūros vadovai
                </Link>
                <Link to="/training" className="text-sm hover:text-[#6200EE]">
                  Rasti treniruotojus →
                </Link>
              </div>
            </div>
          </div>

          {/* Cat Path */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:-translate-y-1 transition">
            <img
              src="https://images.unsplash.com/photo-1595433707802-6b2626ef1c91"
              className="h-64 w-full object-cover"
              alt="Įvaikinta katė ramiai ilsisi naujuose namuose"
              loading="lazy"
              decoding="async"
            />

            <div className="p-8">
              <h3 className="text-xl font-semibold mb-3">Suprasti savo naują katę</h3>

              <p className="text-gray-600 mb-6">
                Be streso perėjimas, sveikatos stebėjimas ir katėms draugiška veterinarinė pagalba nuo pat pirmos dienos.
              </p>

              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>✔ Perkėlimas į naujus namus ir streso mažinimas</li>
                <li>✔ Mitybos ir kraiko rekomendacijos</li>
                <li>✔ Prevencinė sveikatos priežiūra</li>
              </ul>

              <div className="flex justify-between items-center">
                <Link to="/articles/cats" className="font-semibold text-[#9333ea] hover:underline">
                  Kačių priežiūros vadovai
                </Link>
                <Link to="/veterinarian" className="text-sm hover:text-[#9333ea]">
                  Rasti veterinarus →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PLATFORM SERVICES — EDITORIAL ================= */}
      <section className="relative overflow-hidden bg-[#fffff]">
        {/* Organic background shapes (deep forest + warm sand) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full bg-[#9333ea]/50 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32">
          {/* Eyebrow + Heading */}
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="block h-px w-12 bg-[#1e3a2f]/40" />
              <span className="text-xs tracking-[0.32em] uppercase text-[#1e3a2f]/70 font-medium">
                Mūsų ekosistema
              </span>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-stone-900 font-light">
              <span className="block">Viskas, ko reikia</span>
              <span className="block italic font-normal text-[#1e3a2f] mt-1">
                jūsų augintiniui.
              </span>
            </h2>

            <p className="mt-10 text-stone-600 text-lg md:text-xl max-w-xl leading-relaxed">
              Nuo įvaikinimo iki kasdienės priežiūros — viskas, ko reikia
              augintinio gerovei, sutelkta į vieną kruopščiai sudėliotą vietą.
            </p>

            {/* Quiet trust line */}
            <div className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-3 text-sm text-stone-500">
              {[
                { value: "15k+", label: "aktyvių šeimininkų" },
                { value: "4.9★", label: "įvertinimas" },
                { value: "120+", label: "patikrinti partneriai" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl text-stone-900">{item.value}</span>
                  <span className="tracking-wide">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Minimal controls */}
          <div className="flex items-center justify-end gap-2 mb-8">
            <button
              onClick={() => scrollByCards(-1)}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white/60 backdrop-blur-sm text-[#1e3a2f] hover:bg-[#1e3a2f] hover:text-[#f7f1e6] hover:border-[#1e3a2f] transition-all duration-300"
              aria-label="Atgal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollByCards(1)}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white/60 backdrop-blur-sm text-[#1e3a2f] hover:bg-[#1e3a2f] hover:text-[#f7f1e6] hover:border-[#1e3a2f] transition-all duration-300"
              aria-label="Pirmyn"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Editorial cards */}
          <div
            ref={scrollerRef}
            className="relative -mx-6 px-6 flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scroll-px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SERVICES.map((s, idx) => (
              <Link
                key={s.title}
                to={s.link}
                data-card="true"
                className="group snap-start min-w-[88%] sm:min-w-[58%] lg:min-w-[38%] relative bg-[#f6f3fd] border border-stone-200 overflow-hidden transition-all duration-500 hover:border-[#1e3a2f]/40 hover:-translate-y-1 hover:shadow-[0_25px_60px_-25px_rgba(30,58,47,0.35)]"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Number + image plate */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#f9f3fd] via-[#ede4f5] to-[#ece1f0]">
                  <div className="absolute inset-0 bg-[#1e3a2f]/5" />
                  <span className="absolute top-6 left-6 font-serif text-xs tracking-[0.3em] uppercase text-[#754d8c]/80">
                    {String(idx + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                  </span>

                  {/* Sculptural emoji — large, off-center */}
                  <div className="absolute inset-0 flex items-center justify-center text-[8rem] opacity-90 select-none group-hover:scale-[1.06] transition-transform duration-700">
                    {s.emoji || "🐾"}
                  </div>

                  {/* Bottom thin rule */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-[#1e3a2f]/30" />
                </div>

                <div className="p-8">
                  <h3 className="font-serif text-2xl md:text-3xl font-normal text-stone-900 leading-tight mb-4 group-hover:text-[#1e3a2f] transition-colors duration-300">
                    {s.title}
                  </h3>

                  <p className="text-stone-600 leading-relaxed text-[15px] mb-8 min-h-[3.5rem]">
                    {s.description}
                  </p>

                  {s.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-stone-200">
                      {s.stats.map((stat, i) => (
                        <div key={i}>
                          <div className="font-serif text-xl text-[#1e3a2f]">{stat.value}</div>
                          <div className="text-[11px] tracking-wider uppercase text-stone-500 mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[0.25em] uppercase font-medium text-[#1e3a2f]">
                      Sužinoti daugiau
                    </span>
                    <span className="inline-block w-12 h-px bg-[#1e3a2f] group-hover:w-20 transition-all duration-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
{/* DONATION */}
<section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-[45%,55%] gap-0">
            <div className="relative h-96 md:h-auto overflow-hidden">
              <img src={donationPetImage} alt="Support pets" className="w-full h-full object-cover rounded-l-3xl" />
            </div>
            <div className="p-12 md:p-16 flex flex-col justify-center bg-gray-50">
              <div className="inline-flex items-center gap-2 self-start mb-6 px-4 py-2 bg-red-50 rounded-full">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-red-600">Parama</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Padėkite mums pakeisti gyvenimus</h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Jūsų parama padeda prieglaudoms teikti gyvybę gelbstinčią priežiūrą gyvūnams, kuriems to labiausiai reikia.
              </p>
              <a href="/donate"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#f99e1f] text-white rounded-xl font-bold text-lg hover:bg-[#e88d0e] transition-all shadow-lg hover:shadow-xl">
                Paaukoti dabar <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;