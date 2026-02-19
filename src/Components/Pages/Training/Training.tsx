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
import TrainingModal from "../../Booking/TrainingModal";
import Modal from "../../Modal/Modal";
import LoginForm from "../../../Login/LoginForm";
import RegistrationForm from "../../../Registration/RegistrationForm";
import donationImage from "../../../assets/donationImage.png";
import bannerImage from "../../../assets/pets-banner.jpg";
import { useAuth } from "../../../context/AuthContext";
import { normalizeText } from "../../../utils/normalizeText";

// Import JSON data - transformer handles all structures
import canisData from "../../../data/training/canis/canis.json";
import greatpetData from "../../../data/training/greatpet/greatpet.json";
import memelhundData from "../../../data/training/memelhund/memelhund.json";
import mokyksuniData from "../../../data/training/mokyksuni/mokyksuni.json";
import gabusdresuraiData from "../../../data/training/gabusdresurai/gabusdresurai.json";
import loretaData from "../../../data/training/loreta/loreta.json";
import olgapData from "../../../data/training/olgap/olgap.json";
import reksasData from "../../../data/training/reksas/reksas.json";
import martynapaliulyteData from "../../../data/training/martyna-paliulyte/martyna-paliulyte.json";
import kinologekonsultuojaData from "../../../data/training/kinologe-konsultuoja/kinologe-konsultuoja.json";
import sunudarzelispovilasData from "../../../data/training/sunu-darzelis-povilas/sunu-darzelis-povilas.json";
import treniruoksuniData from "../../../data/training/treniruoksuni/treniruoksuni.json";
import pethouseData from "../../../data/training/pethouse/pethouse.json";

import Nasrai from "../../../data/training/Nasrai/Nasrai.json";
import Bestas from "../../../data/training/Bestas/Bestas.json";
import LidijosDresuroMokykla from "../../../data/training/Lidijos-dresuros-mokykla/Lidijos-dresuros-mokykla.json";
import dresuroIinstruktorius from "../../../data/training/dresuros-instruktorius/dresuros-instruktorius.json";
import UrbanDog from "../../../data/training/UrbanDog/UrbanDog.json";

// Import transformation function
import { transformJSONToTrainingSchool, TrainingSchool, Price } from "../../../utils/transformTrainingData";

// Debug: Log JSON data to see what we have
console.log('=== Training School JSON Data ===');
console.log('Canis:', canisData);
console.log('Greatpet:', greatpetData);
console.log('Memelhund:', memelhundData);
console.log('Mokyksuni:', mokyksuniData);
console.log('Gabusdresurai:', gabusdresuraiData);
console.log('Loreta:', loretaData);
console.log('Olga P:', olgapData);
console.log('Reksas:', reksasData);
console.log('Martyna Paliulytė:', martynapaliulyteData);
console.log('Kinologė Konsultuoja:', kinologekonsultuojaData);
console.log('Šunų Darželis Povilas:', sunudarzelispovilasData);

/* ================= FILTER CONFIGS ================= */

const PRICE_RANGES = [
  { id: "all", label: "Visos kainos" },
  { id: "budget", label: "Iki €100" },
  { id: "mid", label: "€100–€300" },
  { id: "premium", label: "Virš €300" },
];

const SERVICE_TYPES = [
  { id: "all", label: "Visi tipai" },
  { id: "group", label: "Grupiniai" },
  { id: "private", label: "Privatūs" },
  { id: "boarding", label: "Apgyvendinimas" },
  { id: "behavior", label: "Elgesio korekcija" },
];

/* ================= TRAINING DATA ================= */

// Placeholder images - replace with actual images
const canisImage = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80";
const greatpetImage = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80";
const memelhundImage = "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80";
const mokyksuniImage = "https://images.unsplash.com/photo-1611003228941-98852ba62227?w=800&q=80";
const gabusdresuraiImage = "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80";
const loretaImage = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80";
const olgapImage = "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80";
const reksasImage = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80";
const martynaImage = "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80";
const kinologeImage = "https://images.unsplash.com/photo-1611003228941-98852ba62227?w=800&q=80";
const sunudarzelisImage = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80";
const treniruoksuniImage = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80";
const pethouseImage = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80";
/* ================= HELPER FUNCTIONS ================= */

/**
 * Transform multi-location school into separate school entries
 */
const transformMultiLocationSchool = (
  data: any,
  baseId: number,
  baseImage: string,
  schoolName: string
): TrainingSchool[] => {
  try {
    // Unwrap if needed (e.g., {gabusdresurai: {...}} or {reksas: {...}})
    const unwrapped = data[Object.keys(data)[0]]?.locations ? data[Object.keys(data)[0]] : data;
    
    // Check if this is a multi-location school
    if (!unwrapped.locations || !Array.isArray(unwrapped.locations)) {
      // Not multi-location, return single school
      return [transformJSONToTrainingSchool(data, baseId, baseImage)];
    }

    // Create separate school for each location
    const schools: TrainingSchool[] = [];
    
    unwrapped.locations.forEach((location: any, index: number) => {
      const cityName = location.city || `Location ${index + 1}`;
      
      // Create modified data for this location
      const locationData = {
        ...unwrapped,
        school: `${schoolName} - ${cityName}`,
        location: {
          city: location.city,
          district: location.district,
        },
        contact: {
          ...unwrapped.contact,
          phone: location.contact?.phone || unwrapped.contact?.phone,
          address: location.contact?.address || unwrapped.contact?.address,
        },
        prices: location.prices,
        // Don't include locations array in individual school
        locations: undefined,
      };

      try {
        const school = transformJSONToTrainingSchool(
          locationData,
          baseId + index,
          baseImage
        );
        schools.push(school);
      } catch (error) {
        console.warn(`Failed to transform ${cityName}:`, error);
      }
    });

    return schools;
  } catch (error) {
    console.warn(`Failed to process multi-location school ${schoolName}:`, error);
    return [];
  }
};

// Helper function to safely transform data
const safeTransform = (data: any, id: number, image: string, name: string) => {
  try {
    return transformJSONToTrainingSchool(data, id, image);
  } catch (error) {
    console.warn(`Failed to transform ${name} data:`, error);
    return null;
  }
};

/* ================= BUILD TRAINING SCHOOLS ARRAY ================= */

const TRAINING_SCHOOLS: TrainingSchool[] = [];

// Single-location schools
const canisSchool = safeTransform(canisData, 1, canisImage, 'Canis');
const greatpetSchool = safeTransform(greatpetData, 2, greatpetImage, 'Greatpet');
const memelhundSchool = safeTransform(memelhundData, 3, memelhundImage, 'Memelhund');
const mokyksuniSchool = safeTransform(mokyksuniData, 4, mokyksuniImage, 'Mokyk Šunį');
const loretaSchool = safeTransform(loretaData, 8, loretaImage, 'Loreta Puskunigė');
const olgapSchool = safeTransform(olgapData, 9, olgapImage, 'Olga P');
const martynaSchool = safeTransform(martynapaliulyteData, 11, martynaImage, 'Martyna Paliulytė');
const kinologeSchool = safeTransform(kinologekonsultuojaData, 12, kinologeImage, 'Kinologė Konsultuoja');
const sunudarzelisSchool = safeTransform(sunudarzelispovilasData, 13, sunudarzelisImage, 'Šunų Darželis');
const treniruoksuniSchool = safeTransform(treniruoksuniData, 15, treniruoksuniImage, 'Svajonių Šuo');
const pethouseSchool = safeTransform(pethouseData, 16, pethouseImage, 'Pet House');

// Multi-location schools (split into separate cards)
const gabusdresuraiSchools = transformMultiLocationSchool(
  gabusdresuraiData,
  5, // Base ID: 5, 6, 7
  gabusdresuraiImage,
  'Gabus Dresurai'
);

const reksasSchools = transformMultiLocationSchool(
  reksasData,
  10, // Base ID: 10, 11
  reksasImage,
  'Reksas'
);

// Add all schools to array
if (canisSchool) TRAINING_SCHOOLS.push(canisSchool);
if (greatpetSchool) TRAINING_SCHOOLS.push(greatpetSchool);
if (memelhundSchool) TRAINING_SCHOOLS.push(memelhundSchool);
if (mokyksuniSchool) TRAINING_SCHOOLS.push(mokyksuniSchool);
if (loretaSchool) TRAINING_SCHOOLS.push(loretaSchool);
if (olgapSchool) TRAINING_SCHOOLS.push(olgapSchool);
if (martynaSchool) TRAINING_SCHOOLS.push(martynaSchool);
if (kinologeSchool) TRAINING_SCHOOLS.push(kinologeSchool);
if (sunudarzelisSchool) TRAINING_SCHOOLS.push(sunudarzelisSchool);
if (treniruoksuniSchool) TRAINING_SCHOOLS.push(treniruoksuniSchool);
if (pethouseSchool) TRAINING_SCHOOLS.push(pethouseSchool);

// Add multi-location schools
gabusdresuraiSchools.forEach(school => {
  if (school) TRAINING_SCHOOLS.push(school);
});

reksasSchools.forEach(school => {
  if (school) TRAINING_SCHOOLS.push(school);
});

console.log(`✅ Successfully loaded ${TRAINING_SCHOOLS.length} training schools`);
console.log(`   - Gabus Dresurai: ${gabusdresuraiSchools.length} locations`);
console.log(`   - Reksas: ${reksasSchools.length} locations`);

/* ================= BENEFITS DATA ================= */

const benefits = [
  {
    icon: CheckCircle,
    title: "Greiti rezultatai",
    description: "Pirmi rezultatai jau po kelių užsiėmimų su profesionaliais treneriais.",
  },
  {
    icon: Star,
    title: "Patyrę treneriai",
    description: "Sertifikuoti specialistai su metų patirtimi ir tarptautiniais sertifikatais.",
  },
  {
    icon: Heart,
    title: "Stipresnis ryšys",
    description: "Geresnė sąveika tarp jūsų ir šuns, pagrįsta pasitikėjimu.",
  },
  {
    icon: Clock,
    title: "Protinė stimuliacija",
    description: "Šuo tampa labiau įsitraukęs ir laimingesnis.",
  },
  {
    icon: Shield,
    title: "Socialumas",
    description: "Šuo išmoksta elgtis su kitais gyvūnais ir žmonėmis.",
  },
  {
    icon: Percent,
    title: "Individuali programa",
    description: "Mokymai pritaikomi jūsų ir augintinio poreikiams.",
  },
];

/* ================= UTILITY FUNCTIONS ================= */

const extractPrice = (priceStr: string): number => {
  const match = priceStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

const getLowestPrice = (prices: Price[]): number => {
  if (!prices.length) return 0;
  return Math.min(...prices.map(p => extractPrice(p.price)));
};

/* ================= TRAINING CARD COMPONENT ================= */

interface TrainingCardProps {
  school: TrainingSchool;
  index: number;
  viewMode: "grid" | "list";
  onViewDetails: (school: TrainingSchool) => void;
  onBook: (school: TrainingSchool) => void;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ school, index, viewMode, onViewDetails, onBook }) => {
  const lowestPrice = getLowestPrice(school.prices);

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
              src={school.image}
              alt={school.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 to-transparent" />

            {/* Top Badge */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm bg-[#f99e1f]/90 text-white">
                <Star className="w-3 h-3 fill-white" />
                Top
              </span>
            </div>

            {/* Price Badge */}
            {lowestPrice > 0 && (
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                <span className="text-xs font-bold text-[#6d0ef1]">Nuo €{lowestPrice}</span>
              </div>
            )}
          </div>

          {/* Content - Right Side */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{school.name}</h3>
              
              <div className="flex items-start gap-2 mb-4 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-[#6d0ef1] mt-0.5 flex-shrink-0" />
                <span>{school.city}, {school.address.split(',')[0]}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {school.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-purple-700 bg-purple-100 px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price Preview */}
              {school.prices.length > 0 && (
                <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                  <h4 className="text-xs font-semibold text-purple-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    Paslaugos
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    {school.prices.slice(0, 4).map((price, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-medium truncate mr-2">
                          {price.service || price.program}
                        </span>
                        <span className="text-[#6d0ef1] font-bold whitespace-nowrap">
                          {price.price}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {school.prices.length > 4 && (
                    <button
                      onClick={() => onViewDetails(school)}
                      className="w-full text-xs text-purple-700 hover:text-purple-900 font-semibold pt-2 mt-2 border-t border-purple-200 flex items-center justify-center gap-1 transition"
                    >
                      <span>+{school.prices.length - 4} daugiau</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Price & Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
              {lowestPrice > 0 && (
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Nuo</div>
                  <div className="text-2xl font-bold text-gray-900">€{lowestPrice}</div>
                </div>
              )}
              
              <div className="flex gap-2 ml-auto">
                <a
                  href={`tel:${school.phone}`}
                  className="flex items-center justify-center w-11 h-11 border-2 border-gray-200 text-gray-600 rounded-xl hover:border-[#6d0ef1] hover:text-[#6d0ef1] transition-all"
                  title="Skambinti"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onViewDetails(school)}
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
          src={school.image}
          alt={school.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Top Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm bg-[#f99e1f]/90 text-white">
            <Star className="w-3 h-3 fill-white" />
            Top
          </span>
        </div>

        {/* Price Badge */}
        {lowestPrice > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
            <span className="text-xs font-bold text-[#6d0ef1]">Nuo €{lowestPrice}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 text-gray-900">{school.name}</h3>
        
        <div className="flex items-start gap-2 mb-3 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-[#6d0ef1] mt-0.5 flex-shrink-0" />
          <span>{school.city}, {school.address.split(',')[0]}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {school.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs text-purple-700 bg-purple-100 px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
          {school.tags.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
              +{school.tags.length - 3}
            </span>
          )}
        </div>

        {/* Price Preview */}
        {school.prices.length > 0 && (
          <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
            <h4 className="text-xs font-semibold text-purple-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              Paslaugos
            </h4>

            <div className="space-y-2">
              {school.prices.slice(0, 3).map((price, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium truncate mr-2">
                    {price.service || price.program}
                  </span>
                  <span className="text-[#6d0ef1] font-bold whitespace-nowrap">
                    {price.price}
                  </span>
                </div>
              ))}
              
              {school.prices.length > 3 && (
                <button
                  onClick={() => onViewDetails(school)}
                  className="w-full text-xs text-purple-700 hover:text-purple-900 font-semibold pt-2 border-t border-purple-200 flex items-center justify-center gap-1 transition"
                >
                  <span>+{school.prices.length - 3} daugiau paslaugų</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Price & Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {lowestPrice > 0 && (
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Nuo</div>
              <div className="text-2xl font-bold text-gray-900">€{lowestPrice}</div>
            </div>
          )}
          
          <div className="flex gap-2 ml-auto">
            <a
              href={`tel:${school.phone}`}
              className="flex items-center justify-center w-11 h-11 border-2 border-gray-200 text-gray-600 rounded-xl hover:border-[#6d0ef1] hover:text-[#6d0ef1] transition-all"
              title="Skambinti"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => onViewDetails(school)}
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

const Training: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const [cityQuery, setCityQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [serviceType, setServiceType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const [selectedSchool, setSelectedSchool] = useState<TrainingSchool | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [trainingModalOpen, setTrainingModalOpen] = useState(false);

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

  const filteredSchools = useMemo(() => {
    let filtered = [...TRAINING_SCHOOLS];

    // City filter
    if (cityQuery.trim()) {
      const query = normalizeText(cityQuery);
      filtered = filtered.filter((school) =>
        normalizeText(school.city).includes(query)
      );
    }

    // Price range filter
    if (priceRange !== "all") {
      filtered = filtered.filter(school => {
        const lowest = getLowestPrice(school.prices);
        if (priceRange === "budget") return lowest <= 100;
        if (priceRange === "mid") return lowest > 100 && lowest <= 300;
        if (priceRange === "premium") return lowest > 300;
        return true;
      });
    }

    // Service type filter
    if (serviceType !== "all") {
      const typeMap: Record<string, string[]> = {
        group: ["grupiniai", "grupė", "grupėje"],
        private: ["privatūs", "asmeninės", "individuali"],
        boarding: ["apgyvendinimas", "darželis"],
        behavior: ["elgesio korekcija", "elgesio"],
      };
      
      const keywords = typeMap[serviceType] || [];
      filtered = filtered.filter(school => 
        school.tags.some(tag => 
          keywords.some(kw => normalizeText(tag).includes(kw))
        ) ||
        school.prices.some(price => 
          keywords.some(kw => 
            normalizeText(price.service || price.program || "").includes(kw)
          )
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
          alt="Šunų dresūra"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 max-w-5xl px-6 text-white">
          <div className="mb-6 inline-flex items-center justify-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
              🐕 Profesionali šunų dresūra visoje Lietuvoje
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Geriausiai įvertinti{" "}
            <span className="block md:inline">dresūros specialistai</span>
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-10">
            Patikimi treneriai su metų patirtimi. Raskite idealią dresavimo mokyklą savo šuniui.
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
                  Visi tipai
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
                Rasta: <span className="text-[#6d0ef1] font-bold">{filteredSchools.length}</span>
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

      {/* ================= TRAINING SCHOOLS GRID ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Geriausiai įvertintos dresūros mokyklos
              {cityQuery && <span className="text-[#6d0ef1]"> {cityQuery}</span>}
            </h2>
            <p className="text-gray-600">
              Profesionalūs treneriai visoje Lietuvoje
            </p>
          </motion.div>

          {filteredSchools.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-20 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-3xl">🐕</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Mokyklų nerasta
              </h3>
              <p className="text-gray-600 max-w-md mb-6">
                Pagal pasirinktus filtrus mokyklų neradome. Pabandykite pakeisti paieškos kriterijus.
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
              {filteredSchools.map((school, index) => (
                <TrainingCard
                  key={school.id}
                  school={school}
                  index={index}
                  viewMode={viewMode}
                  onViewDetails={(school) => {
                    setSelectedSchool(school);
                    setTrainingModalOpen(true);
                  }}
                  onBook={(school) => {
                    setSelectedSchool(school);
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
              Kodėl verta rinktis profesionalią dresūrą?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Investuokite į savo augintinio ateitį
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Profesionalūs treneriai padės jums ir jūsų šuniui pasiekti geriausius rezultatus
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

      {/* ================= TRAINING MODAL ================= */}
      <TrainingModal
        provider={selectedSchool}
        isOpen={trainingModalOpen}
        onClose={() => setTrainingModalOpen(false)}
        onBook={(provider: any) => {
          setSelectedSchool(provider as any);
          setTrainingModalOpen(false);
          setIsBookingOpen(true);
        }}
      />

      {/* ================= BOOKING MODAL ================= */}
      <BookingModal
        vet={selectedSchool}
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

export default Training;