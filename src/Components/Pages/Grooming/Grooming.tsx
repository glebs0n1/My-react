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
  Search,
  SlidersHorizontal,
  ArrowRight
} from "lucide-react";

import BookingModal from "../../Booking/BookingModal";
import ServicesModal from "../../Booking/GroomingModal"; 
import Modal from "../../Modal/Modal";
import LoginForm from "../../../Login/LoginForm";
import RegistrationForm from "../../../Registration/RegistrationForm";
import donationImage from "../../../assets/donationImage.png";
import bannerImage from "../../../assets/pets-banner.jpg";
import { useAuth } from "../../../context/AuthContext";
import { isOpenNow } from "../../../utils/openingHours";
import { normalizeText } from "../../../utils/normalizeText";

/* ================= TYPES ================= */

interface ServicePrice {
  service: string;
  priceFrom: number;
}

interface GroomingSalon {
  id: number;
  name: string;
  services: string[];
  prices: ServicePrice[];
  city: string;
  address: string;
  distanceKm: number;
  priceFrom: number;
  rating: number;
  reviewCount?: number;
  image: string;
  phone?: string;
  email?: string;
  workingHours?: string;
  description?: string;
  whyUs?: string;
}

/* ================= FILTER CONFIGS ================= */

const PRICE_RANGES = [
  { id: "all", label: "Visos kainos" },
  { id: "budget", label: "Iki €35" },
  { id: "mid", label: "€35–€50" },
  { id: "premium", label: "Virš €50" },
];

const SERVICE_TYPES = [
  { id: "all", label: "Visos paslaugos" },
  { id: "grooming", label: "Kirpimas" },
  { id: "bathing", label: "Maudymas" },
  { id: "nails", label: "Nagų kirpimas" },
  { id: "spa", label: "SPA" },
];

/* ================= MOCK DATA ================= */

const GROOMING_SALONS: GroomingSalon[] = [
  {
    id: 1,
    name: "Happy Paws Grooming",
    services: ["Pilnas kirpimas", "Nagų kirpimas", "Maudymas"],
    prices: [
      { service: "Kirpimas", priceFrom: 25 },
      { service: "Šukavimas", priceFrom: 15 },
      { service: "Nagų kirpimas", priceFrom: 10 },
      { service: "Maudymas", priceFrom: 20 },
      { service: "Ausų valymas", priceFrom: 8 },
    ],
    city: "Vilnius",
    address: "Gedimino pr. 12",
    distanceKm: 2.4,
    priceFrom: 8,
    rating: 4.8,
    reviewCount: 127,
    image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&q=80",
    phone: "+37060000000",
    email: "info@happypaws.lt",
    workingHours: "Pr–Pn 09:00–19:00",
    description: "Profesionali gyvūnų kirpykla su 10 metų patirtimi. Teikiame visas grooming paslaugas jūsų augintiniams - nuo paprasto kirpimo iki SPA procedūrų.",
    whyUs: "Naudojame tik aukščiausios kokybės kosmetiką ir įrangą. Mūsų komanda reguliariai tobulėja dalyvaudama tarptautiniuose mokymuose. Kiekvienas augintinys mums yra svarbus!",
  },
  {
    id: 2,
    name: "PetCare Grooming Center",
    services: ["Šukuosena", "Maudymas", "Nagų kirpimas"],
    prices: [
      { service: "Pilnas kirpimas", priceFrom: 40 },
      { service: "Šukuosena", priceFrom: 25 },
      { service: "Maudymas", priceFrom: 22 },
      { service: "Nagų kirpimas", priceFrom: 12 },
    ],
    city: "Vilnius",
    address: "Ozo g. 18",
    distanceKm: 5.1,
    priceFrom: 12,
    rating: 4.6,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
    phone: "+37060111111",
    email: "info@petcare.lt",
    workingHours: "Pr–Št 10:00–20:00",
    description: "Moderni gyvūnų kirpykla su profesionalia įranga ir patirusia komanda. Specializuojamės šukuosenų kūrime ir kompleksinėje priežiūroje.",
    whyUs: "Individuali prieiga kiekvienam klientui. Naudojame ekologišką kosmetiką, kuri netinka jautrią gyvūnų odą. Galime pasiimti ir parvežti jūsų augintinį!",
  },
  {
    id: 3,
    name: "Furry Friends Spa",
    prices: [
      { service: "SPA procedūros", priceFrom: 35 },
      { service: "Kirpimas", priceFrom: 30 },
      { service: "Ausų valymas", priceFrom: 10 },
      { service: "Masažas", priceFrom: 45 },
      { service: "Aromatherapija", priceFrom: 40 },
    ],
    services: ["SPA procedūros", "Kirpimas", "Ausų valymas"],
    city: "Kaunas",
    address: "Laisvės al. 53",
    distanceKm: 8.2,
    priceFrom: 10,
    rating: 4.9,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=80",
    phone: "+37061111111",
    email: "info@furryfriends.lt",
    workingHours: "Pr–Pn 08:00–20:00",
    description: "Prabangus SPA centras jūsų augintiniams. Teikiame unikalias relaksacines ir terapines procedūras, kurios padeda augintiniams atsipalaiduoti.",
    whyUs: "Vienintelis tikras gyvūnų SPA Kaune! Naudojame aromatherapiją, masažą ir specialias procedūras, kurios gerina augintinio savijautą ir išvaizdą.",
  },
  {
    id: 4,
    name: "Paws & Claws Studio",
    services: ["Dizaineris kirpimas", "Spalvinimas", "Priežiūra"],
    prices: [
      { service: "Dizaineris kirpimas", priceFrom: 50 },
      { service: "Spalvinimas", priceFrom: 60 },
      { service: "Šukavimas", priceFrom: 35 },
      { service: "Priežiūra", priceFrom: 45 },
    ],
    city: "Vilnius",
    address: "Konstitucijos pr. 7",
    distanceKm: 3.8,
    priceFrom: 35,
    rating: 4.7,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    phone: "+37062222222",
    email: "studio@pawsclaws.lt",
    workingHours: "Pr–Št 09:00–19:00",
    description: "Dizainerinė gyvūnų kirpykla, kuri kuria unikalias šukuosenas. Specializuojamės veislinių šunų kirpime ir dalyvaujame parodose.",
    whyUs: "Mūsų specialistai turi tarptautinius sertifikatus ir dalyvavo užsienio konkursuose. Galime sukurti bet kokią šukuoseną pagal standartą arba jūsų pageidavimą!",
  },
  {
    id: 5,
    name: "Gentle Touch Pet Salon",
    services: ["Švelnus kirpimas", "Maudymas", "Kojų priežiūra"],
    prices: [
      { service: "Švelnus kirpimas", priceFrom: 30 },
      { service: "Maudymas", priceFrom: 18 },
      { service: "Kojų priežiūra", priceFrom: 15 },
      { service: "Nagų kirpimas", priceFrom: 10 },
    ],
    city: "Klaipėda",
    address: "Taikos pr. 21",
    distanceKm: 12.5,
    priceFrom: 10,
    rating: 4.5,
    reviewCount: 73,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    phone: "+37063333333",
    email: "info@gentletouch.lt",
    workingHours: "Pr–Pn 10:00–18:00",
    description: "Šeimyninis salonas su jaukia atmosfera. Specializuojamės darbui su nervingais ir vyresniais gyvūnais, kuriems reikia ypatingos priežiūros.",
    whyUs: "Švelni prieiga ir rami aplinka padeda net labai nervingiems augintiniams jaustis saugiai. Turime daug patirties su vyresniukais ir specialių poreikių gyvūnais.",
  },
  {
    id: 6,
    name: "Royal Grooming House",
    services: ["Premium kirpimas", "Aromatherapija", "Masažas"],
    prices: [
      { service: "Premium kirpimas", priceFrom: 60 },
      { service: "Aromatherapija", priceFrom: 45 },
      { service: "Masažas", priceFrom: 50 },
      { service: "SPA paketas", priceFrom: 80 },
    ],
    city: "Vilnius",
    address: "Pylimo g. 34",
    distanceKm: 4.2,
    priceFrom: 45,
    rating: 4.9,
    reviewCount: 142,
    image: "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?w=800&q=80",
    phone: "+37064444444",
    email: "royal@grooming.lt",
    workingHours: "Pr–Št 08:00–21:00",
    description: "Prabangus grooming centras su premium paslaugomis. Dirbame tik su aukščiausios klasės produktais ir teikiame VIP aptarnavimą.",
    whyUs: "Ekskluzyvios paslaugos ir individualus dėmesys kiekvienam klientui. Naudojame tik premium kosmetiką ir siūlome unikalias SPA programas, kurių nerasite kitur.",
  },
];

const benefits = [
  {
    icon: Percent,
    title: "5% nuolaida su Pawns",
    description: "Gaukite garantuotą nuolaidą kiekvienai rezervacijai su mūsų promo kodu.",
  },
  {
    icon: Shield,
    title: "Patikrinti salonai",
    description: "Visi salonai yra kruopščiai atrinkti ir patikrinti mūsų komandos.",
  },
  {
    icon: Star,
    title: "Tikri atsiliepimai",
    description: "Skaitykite tikrus klientų atsiliepimus ir rinkitės geriausią paslaugą.",
  },
  {
    icon: Clock,
    title: "Greita rezervacija",
    description: "Rezervuokite vizitą vos keliais paspaudimais bet kuriuo paros metu.",
  },
  {
    icon: Heart,
    title: "Meilė gyvūnams",
    description: "Dirbame tik su salonais, kurie tikrai myli ir rūpinasi augintiniais.",
  },
  {
    icon: CheckCircle,
    title: "Kokybės garantija",
    description: "Jei paslauga neatitinka standartų – grąžinsime pinigus be klausimų.",
  },
];

/* ================= GROOMING CARD COMPONENT ================= */

interface GroomingCardProps {
  salon: GroomingSalon;
  index: number;
  viewMode: "grid" | "list";
  onViewDetails: (salon: GroomingSalon) => void;
  onBook: (salon: GroomingSalon) => void;
}

const GroomingCard: React.FC<GroomingCardProps> = ({ salon, index, viewMode, onViewDetails, onBook }) => {
  const open = isOpenNow(salon.workingHours);

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image - Left Side */}
          <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0">
            <img
              src={salon.image}
              alt={salon.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 to-transparent" />

            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <span
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm ${
                  open
                    ? "bg-emerald-500/90 text-white"
                    : "bg-red-500/90 text-white"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-white animate-pulse" : "bg-white"}`} />
                {open ? "Atidaryta" : "Uždaryta"}
              </span>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-gray-900">{salon.rating}</span>
              {salon.reviewCount && (
                <span className="text-xs text-gray-500">({salon.reviewCount})</span>
              )}
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{salon.name}</h3>
              
              <div className="flex items-start gap-2 mb-4 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-[#6d0ef1] mt-0.5 flex-shrink-0" />
                <span>{salon.city}, {salon.address}</span>
                <span className="text-gray-400 ml-auto">{salon.distanceKm} km</span>
              </div>

              {/* Services Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {salon.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-purple-700 bg-purple-100 px-3 py-1 rounded-full font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Price Preview */}
              <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                <h4 className="text-xs font-semibold text-purple-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  Kainos
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  {salon.prices.slice(0, 4).map((price, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 font-medium truncate mr-2">{price.service}</span>
                      <span className="text-[#6d0ef1] font-bold whitespace-nowrap">€{price.priceFrom}</span>
                    </div>
                  ))}
                </div>
                
                {salon.prices.length > 4 && (
                  <button
                    onClick={() => onViewDetails(salon)}
                    className="w-full text-xs text-purple-700 hover:text-purple-900 font-semibold pt-2 mt-2 border-t border-purple-200 flex items-center justify-center gap-1 transition"
                  >
                    <span>+{salon.prices.length - 4} daugiau</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Price & Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Nuo</div>
                <div className="text-2xl font-bold text-gray-900">€{salon.priceFrom}</div>
              </div>
              
              <div className="flex gap-2">
                <a
                  href={`tel:${salon.phone}`}
                  className="flex items-center justify-center w-11 h-11 border-2 border-gray-200 text-gray-600 rounded-xl hover:border-[#6d0ef1] hover:text-[#6d0ef1] transition-all"
                  title="Skambinti"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onViewDetails(salon)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#6d0ef1] text-white rounded-xl font-bold hover:bg-[#5a0bc9] transition shadow-md"
                >
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
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm ${
              open
                ? "bg-emerald-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-white animate-pulse" : "bg-white"}`} />
            {open ? "Atidaryta" : "Uždaryta"}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-gray-900">{salon.rating}</span>
          {salon.reviewCount && (
            <span className="text-xs text-gray-500">({salon.reviewCount})</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 text-gray-900">{salon.name}</h3>
        
        <div className="flex items-start gap-2 mb-3 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-[#6d0ef1] mt-0.5 flex-shrink-0" />
          <span>{salon.city}, {salon.address}</span>
          <span className="text-gray-400 ml-auto">{salon.distanceKm} km</span>
        </div>

        {/* Services Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {salon.services.slice(0, 3).map((service, idx) => (
            <span
              key={idx}
              className="text-xs text-purple-700 bg-purple-100 px-3 py-1 rounded-full font-medium"
            >
              {service}
            </span>
          ))}
          {salon.services.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
              +{salon.services.length - 3}
            </span>
          )}
        </div>

        {/* Price Preview - NEW LIST FORMAT */}
        <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
          <h4 className="text-xs font-semibold text-purple-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            Kainos
          </h4>

          <div className="space-y-2">
            {salon.prices.slice(0, 3).map((price, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 font-medium">{price.service}</span>
                <span className="text-[#6d0ef1] font-bold whitespace-nowrap">
                  nuo €{price.priceFrom}
                </span>
              </div>
            ))}
            
            {salon.prices.length > 3 && (
              <button
                onClick={() => onViewDetails(salon)}
                className="w-full text-xs text-purple-700 hover:text-purple-900 font-semibold pt-2 border-t border-purple-200 flex items-center justify-center gap-1 transition"
              >
                <span>+{salon.prices.length - 3} daugiau paslaugų</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-purple-200 flex items-center gap-2 text-xs text-purple-700">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-medium">5% nuolaida su Pawns</span>
          </div>
        </div>

        {/* Price & Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Nuo</div>
            <div className="text-2xl font-bold text-gray-900">€{salon.priceFrom}</div>
          </div>
          
          <div className="flex gap-2">
            <a
              href={`tel:${salon.phone}`}
              className="flex items-center justify-center w-11 h-11 border-2 border-gray-200 text-gray-600 rounded-xl hover:border-[#6d0ef1] hover:text-[#6d0ef1] transition-all"
              title="Skambinti"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => onViewDetails(salon)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#6d0ef1] text-white rounded-xl font-bold hover:bg-[#5a0bc9] transition shadow-md"
            >
              Plačiau <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ================= MAIN COMPONENT ================= */

const Grooming: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const [cityQuery, setCityQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [serviceType, setServiceType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const [selectedSalon, setSelectedSalon] = useState<GroomingSalon | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [servicesModalOpen, setServicesModalOpen] = useState(false);

  // Auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loginMode, setLoginMode] = useState(true);

  const handleLoginClick = () => {
    setIsBookingOpen(false);
    setLoginMode(true);
    setAuthModalOpen(true);
  };

  const resetFilters = () => {
    setCityQuery("");
    setPriceRange("all");
    setServiceType("all");
  };

  /* ================= FILTERING ================= */

  const filteredSalons = useMemo(() => {
    let filtered = [...GROOMING_SALONS];

    // City filter
    if (cityQuery.trim()) {
      const query = normalizeText(cityQuery);
      filtered = filtered.filter((salon) =>
        normalizeText(salon.city).includes(query)
      );
    }

    // Price range filter
    if (priceRange !== "all") {
      if (priceRange === "budget") filtered = filtered.filter(s => s.priceFrom <= 35);
      if (priceRange === "mid") filtered = filtered.filter(s => s.priceFrom > 35 && s.priceFrom <= 50);
      if (priceRange === "premium") filtered = filtered.filter(s => s.priceFrom > 50);
    }

    // Service type filter
    if (serviceType !== "all") {
      const typeMap: Record<string, string[]> = {
        grooming: ["kirpimas", "kirpim"],
        bathing: ["maudymas", "maudy"],
        nails: ["nagų", "nag"],
        spa: ["spa", "procedūr"],
      };
      
      const keywords = typeMap[serviceType] || [];
      filtered = filtered.filter(s => 
        s.services.some(service => 
          keywords.some(kw => normalizeText(service).includes(kw))
        )
      );
    }

    return filtered;
  }, [cityQuery, priceRange, serviceType]);

  return (
    <main className="pt-140 overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[540px] flex items-center justify-center text-center overflow-visible">
        <img
          src={bannerImage}
          alt="Gyvūnų kirpykla"
          className="absolute inset-0 w-full h-full object-cover"
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
            Palyginkite kainas, vertinimus ir gaukite <strong>5% nuolaidą</strong> su Pawns promo kodu
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl max-w-lg mx-auto">
            <div className="flex items-center gap-2 flex-1 px-4">
              <MapPin className="w-5 h-5 text-purple-600 shrink-0" />
              <input
                type="text"
                value={cityQuery}
                onChange={(e) => setCityQuery(e.target.value)}
                placeholder="Įveskite miestą..."
                className="w-full py-3 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm"
              />
            </div>
            <button className="px-8 py-3 bg-[#6d0ef1] text-white rounded-xl font-semibold text-sm hover:bg-[#5a0bc9] transition-all shadow-lg flex items-center gap-2 shrink-0">
              <Search className="w-4 h-4" />
              Ieškoti
            </button>
          </div>
        </div>
      </section>

      {/* ================= FILTERS BAR ================= */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full transition font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtrai
            </button>

            {showFilters && (
              <>
                <button
                  onClick={() => setPriceRange("all")}
                  className={`px-5 py-2.5 rounded-full transition font-semibold text-sm ${
                    priceRange === "all" ? "bg-[#6d0ef1] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Visos kainos
                </button>

                {PRICE_RANGES.filter(r => r.id !== "all").map(range => (
                  <button
                    key={range.id}
                    onClick={() => setPriceRange(range.id)}
                    className={`px-5 py-2.5 rounded-full transition font-semibold text-sm ${
                      priceRange === range.id ? "bg-[#6d0ef1] text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}

                <button
                  onClick={() => setServiceType("all")}
                  className={`px-5 py-2.5 rounded-full transition font-semibold text-sm ${
                    serviceType === "all" ? "bg-[#6d0ef1] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Visos
                </button>

                {SERVICE_TYPES.filter(t => t.id !== "all").map(type => (
                  <button
                    key={type.id}
                    onClick={() => setServiceType(type.id)}
                    className={`px-5 py-2.5 rounded-full transition font-semibold text-sm ${
                      serviceType === type.id ? "bg-[#6d0ef1] text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </>
            )}

            <div className="flex items-center gap-3 ml-auto">
              <div className="text-sm text-gray-600 font-medium">
                Rasta: <span className="text-[#6d0ef1] font-bold">{filteredSalons.length}</span>
              </div>

              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition ${viewMode === "grid" ? "bg-white shadow" : "hover:bg-gray-200"}`}
                  title="Kortelės"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition ${viewMode === "list" ? "bg-white shadow" : "hover:bg-gray-200"}`}
                  title="Sąrašas"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GROOMING SALONS GRID ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Geriausiai įvertintos kirpyklos
              {cityQuery && <span className="text-[#6d0ef1]"> {cityQuery}</span>}
            </h2>
            <p className="text-gray-600">
              Raskite tobulą kirpyklą savo augintiniui
            </p>
          </motion.div>

          {filteredSalons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-20 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-3xl">🐾</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Kirpyklų nerasta
              </h3>
              <p className="text-gray-600 max-w-md mb-6">
                Pagal pasirinktus filtrus kirpyklų neradome. Pabandykite pakeisti paieškos kriterijus.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 rounded-xl bg-[#6d0ef1] text-white font-semibold hover:bg-[#5a0bc9] transition"
              >
                Išvalyti filtrus
              </button>
            </motion.div>
          ) : (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
              {filteredSalons.map((salon, index) => (
                <GroomingCard
                  key={salon.id}
                  salon={salon}
                  index={index}
                  viewMode={viewMode}
                  onViewDetails={(salon) => {
                    setSelectedSalon(salon);
                    setServicesModalOpen(true);
                  }}
                  onBook={(salon) => {
                    setSelectedSalon(salon);
                    setIsBookingOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= BENEFITS SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
              Kodėl rinktis mus?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Jūsų augintinis nusipelno geriausio
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Mes sujungiame geriausias Lietuvos gyvūnų kirpyklas vienoje platformoje
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-11 h-11 rounded-xl bg-[#f2eef6] flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#6d0ef1]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DONATION BANNER ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-[45%,55%] gap-0">
            
            {/* Left - Image */}
            <div className="relative h-96 md:h-auto overflow-hidden">
              <img
                src={donationImage}
                alt="Support pets"
                className="w-full h-full object-cover rounded-l-3xl"
              />
            </div>

            {/* Right - Content */}
            <div className="p-12 md:p-16 flex flex-col justify-center bg-gray-50">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start mb-6 px-4 py-2 bg-red-50 rounded-full">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-red-600">Parama</span>
              </div>
              
              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Padėkite mums pakeisti gyvenimus
              </h2>
              
              {/* Description */}
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Jūsų parama padeda prieglaudoms teikti gyvybę gelbstinčią priežiūrą gyvūnams, kuriems to labiausiai reikia.
              </p>
              
              {/* CTA Button */}
              <div>
                <a
                  href="/donate"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#f99e1f] text-white rounded-xl font-bold text-lg hover:bg-[#e88d0e] transition-all shadow-lg hover:shadow-xl"
                >
                  Paaukoti dabar
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES MODAL ================= */}
      <ServicesModal
        provider={selectedSalon}
        isOpen={servicesModalOpen}
        onClose={() => setServicesModalOpen(false)}
        onBook={(provider: any) => {
          setSelectedSalon(provider as any);
          setServicesModalOpen(false);
          setIsBookingOpen(true);
        }}
      />

      {/* ================= BOOKING MODAL ================= */}
      <BookingModal
        vet={selectedSalon}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        isLoggedIn={isAuthenticated}
        onLoginClick={handleLoginClick}
      />

      {/* ================= AUTH MODAL ================= */}
      <Modal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)}>
        {loginMode ? (
          <LoginForm
            onClose={() => setAuthModalOpen(false)}
            onSuccess={() => setAuthModalOpen(false)}
            switchToRegister={() => setLoginMode(false)}
          />
        ) : (
          <RegistrationForm
            onClose={() => setAuthModalOpen(false)}
            onSuccess={() => setAuthModalOpen(false)}
            switchToLogin={() => setLoginMode(true)}
          />
        )}
      </Modal>
    </main>
  );
};

export default Grooming;