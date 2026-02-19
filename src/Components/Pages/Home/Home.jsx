import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import petsRaw from "../../../data/shelters/lese/scraped_lese_vilnius.json";
import petsDataBeglobis from "../../../data/shelters/beglobis/beglobis.json";
import { loadScrapedPets } from "../../../utils/mapPet";

import SearchBar from "../../Search/SearchBar";
import Donation from "../../Donation/Donation";
import donationImage from "../../../assets/dog.jpeg";
import PetCard from "../../PetCard/PetCard";

import bannerImage from "../../../assets/hero-banner.jpeg";
import dogIcon from "../../../assets/dog.png";
import catIcon from "../../../assets/cat.png";
import animalsIcon from "../../../assets/animals.png";

/* -----------------------------
   Static config (scalable)
------------------------------ */

const PET_TYPES = [
  { label: "Šunys", icon: dogIcon, link: "/dogs" },
  { label: "Katės", icon: catIcon, link: "/cats" },
  { label: "Kiti gyvūnai", icon: animalsIcon, link: "/other-animals" },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    console.log("Searching for:", searchQuery);
  };

  useEffect(() => {
    const normalizedPets = loadScrapedPets(petsRaw, petsDataBeglobis);
    setPets(normalizedPets);
    setLoading(false);
  }, []);

  return (
    <main className="pt-140">
      {/* ================= HERO ================= */}
      <section className="relative h-[700px] md:h-[750px] flex items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={bannerImage}
            alt="Adopt a pet"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          {/* Purple badge */}
          <div className="mb-6 inline-flex items-center justify-center">
            <span className="px-5 py-2 bg-purple-600/90 backdrop-blur-sm rounded-full text-sm font-medium">
              Didžiausia gyvūnų bendruomenė Lietuvoje
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Raskite savo naują{" "}
            <span className="text-4xl md:text-5xl font-bold mb-4">geriausią draugą</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl mb-10 opacity-95 max-w-3xl mx-auto">
            Naršykite gyvūnus iš mūsų tinklo – daugiau nei{" "}
            <strong className="font-bold">14 500 prieglaudų</strong> ir gelbėtojų visoje Lietuvoje
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={(e) => setSearchQuery(e.target.value)}
              onSearchSubmit={handleSearchSubmit}
            />
          </div>
        </div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ================= PET TYPES ================= */}
      <section className="relative z-10 -mt-10 pb-12">
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
                  group-hover:shadow-[0_1px_50px_rgba(98,0,238,0.2)]
                  group-hover:border-[#6200EE]/40
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
        image={donationImage}
        title="Padėkite mums pakeisti gyvūnų likimus"
        text="Jūsų auka padeda rūpintis gyvūnais, kuriems reikia pagalbos – maistas, gydymas ir namai."
        cta="Paaukoti dabar"
      />

      {/* ================= WHY PET OWNERS TRUST US ================= */}
      <section className="relative bg-gray-50 border-t border-gray-200 py-24 overflow-hidden">
        {/* Decorative background */}
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
              alt="Dog adoption"
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
              alt="Cat adoption"
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
                <Link to="/articles/cats" className="font-semibold text-[#6200EE] hover:underline">
                  Kačių priežiūros vadovai
                </Link>
                <Link to="/veterinarian" className="text-sm hover:text-[#6200EE]">
                  Rasti veterinarus →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PLATFORM SERVICES ================= */}
      <section className="max-w-7xl mx-auto px-4 py-28">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Viskas, ko reikia jūsų augintiniui, vienoje vietoje
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mt-4">
            Nuo įvaikinimo iki kasdienės priežiūros – atraskite mūsų išsamią gyvūnų priežiūros paslaugų ekosistemą.
          </p>
        </header>

        {/* Quick Service Icons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            { icon: "🏠", label: "Prieglaudos", link: "/shelter" },
            { icon: "🐕‍🦺", label: "Dresavimas", link: "/training" },
            { icon: "🩺", label: "Veterinarija", link: "/veterinarian" },
            { icon: "💊", label: "Patarimai", link: "/medications" },
            { icon: "✂️", label: "Grooming", link: "/grooming" },
            { icon: "🚶", label: "Pasivaikščiojimai", link: "/walking" },
            { icon: "🏨", label: "Augintinių prižiūrėtojai", link: "/sitting" },
          ].map((service) => (
            <Link
              key={service.label}
              to={service.link}
              className="group flex flex-col items-center gap-2 p-4 w-24 sm:w-28 hover:bg-purple-50 rounded-xl transition-all"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-purple-100 flex items-center justify-center text-2xl sm:text-3xl group-hover:bg-purple-200 group-hover:scale-110 transition-all">
                {service.icon}
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 text-center group-hover:text-purple-600 transition-colors">
                {service.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            ["🏠", "Trusted Shelters", "Verified shelters committed to ethical adoption and animal welfare."],
            ["🐕", "Training Programs", "Professional trainers experienced with rescued and adopted pets."],
            ["💊", "Medications & Care", "Trusted products, prescriptions, and preventive care guidance."],
            ["🩺", "Veterinary Network", "Licensed clinics with access to your pet's adoption history."],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-200"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-white py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pasirengę pakeisti gyvenimą?
        </h2>

        <p className="text-gray-600 text-lg max-w-xl mx-auto mb-10">
          Tūkstančiai gyvūnėlių laukia mylinčių namų. Pradėkite savo įvaikinimo kelionę jau šiandien.
        </p>

        <Link
          to="/shelter"
          className="inline-flex items-center px-10 py-4 rounded-full bg-[#6200EE] text-white font-semibold text-lg hover:bg-[#5300d6] shadow-lg hover:shadow-xl transition-all"
        >
          Pradėkite taikyti jau šiandien
        </Link>
      </section>
    </main>
  );
};

export default Home;