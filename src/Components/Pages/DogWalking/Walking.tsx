import React, { useMemo, useState } from "react";
import Donation from "../../Donation/Donation";
import SearchBarCity from "../../Search/SearchBarCity";
import BookingModal from "../../Booking/BookingModal";
import ServicesModal from "../../Booking/VeterinarianModal";  
import Modal from "../../Modal/Modal";
import LoginForm from "../../../Login/LoginForm";
import RegistrationForm from "../../../Registration/RegistrationForm";
import donationImage from "../../../assets/donationImage.png";
import bannerImage from "../../../assets/pets-banner.jpg";
import { useAuth } from "../../../context/AuthContext";
import { isOpenNow } from "../../../utils/openingHours";
import { normalizeText } from "../../../utils/normalizeText";

/* ================= TYPES ================= */

interface DogWalker {
  id: number;
  name: string;
  services: string[];
  city: string;
  address: string;
  distanceKm: number;
  priceFrom: number;
  rating: number;
  image: string;
  phone?: string;
  workingHours?: string;
}

/* ================= MOCK DATA ================= */

const DOG_WALKERS: DogWalker[] = [
  {
    id: 1,
    name: "John's Dog Walking",
    services: ["Daily walks", "Puppy training", "Pet sitting"],
    city: "Vilnius",
    address: "Gedimino pr. 12",
    distanceKm: 2.4,
    priceFrom: 15,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=800&q=80",
    phone: "+37060000001",
    workingHours: "Mon–Fri 08:00–20:00",
  },
  {
    id: 2,
    name: "Happy Paws Walker",
    services: ["Group walks", "Solo walks", "Weekend care"],
    city: "Vilnius",
    address: "Ozo g. 18",
    distanceKm: 5.1,
    priceFrom: 20,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1611095973510-b79a1ecb5fdf?auto=format&fit=crop&w=800&q=80",
    phone: "+37060000002",
    workingHours: "Mon–Sat 09:00–18:00",
  },
];

/* ================= COMPONENT ================= */

const DogWalking: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const [cityQuery, setCityQuery] = useState("Vilnius");
  const [selectedWalker, setSelectedWalker] = useState<DogWalker | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [servicesModalOpen, setServicesModalOpen] = useState(false); // ✅ services modal

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loginMode, setLoginMode] = useState(true);

  const handleLoginClick = () => {
    setIsBookingOpen(false);
    setLoginMode(true);
    setAuthModalOpen(true);
  };

  /* ================= FILTERING ================= */

  const filteredWalkers = useMemo(() => {
    if (!cityQuery.trim()) return DOG_WALKERS;

    const query = normalizeText(cityQuery);

    return DOG_WALKERS.filter((walker) =>
      normalizeText(walker.city).includes(query)
    );
  }, [cityQuery]);

  return (
    <main className="bg-[#fafafa] min-h-screen space-y-24">
      {/* ================= HERO ================= */}
      <section className="relative h-[540px] flex items-center justify-center text-center">
        <img
          src={bannerImage}
          alt="Dog Walking"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-4xl px-4 text-white">
          <h1 className="text-4xl font-bold mb-4">Find Dog Walkers Near You</h1>

          <p className="opacity-90 mb-8 text-lg">
            Book trusted walkers and enjoy 5% off via Pawns
          </p>

          <SearchBarCity
            cityQuery={cityQuery}
            onCityChange={setCityQuery}
            onSearch={() => setCityQuery((v) => v.trim())}
          />
        </div>
      </section>

      {/* ================= LIST ================= */}
      <section className="max-w-7xl mx-auto px-6 mb-5">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold mt-5">
            Dog Walkers in {cityQuery || "your area"}
          </h2>

          <span className="text-gray-600">{filteredWalkers.length} walkers found</span>
        </div>

        {filteredWalkers.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No dog walkers found
            </h3>

            <p className="text-gray-500 max-w-md">
              Try another location to see available walkers.
            </p>

            <button
              onClick={() => setCityQuery("")}
              className="mt-6 px-6 py-3 rounded-lg bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200 transition"
            >
              Reset search
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWalkers.map((walker) => {
              const open = isOpenNow(walker.workingHours);

              return (
                <div
                  key={walker.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={walker.image}
                    alt={walker.name}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{walker.name}</h3>

                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          open
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {open ? "Open now" : "Closed"}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500">
                      📍 {walker.city}, {walker.address} • {walker.distanceKm} km
                    </p>

                    <p className="text-sm">
                      ⭐ {walker.rating} • from €{walker.priceFrom}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {walker.services.map((service) => (
                        <span
                          key={service}
                          className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 pt-4 sm:flex-row">

                      <button
                        onClick={() => {
                          setSelectedWalker(walker);
                          setServicesModalOpen(true);
                        }}
                        className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-semibold sm:flex-1"
                      >
                        More info / All services
                      </button>

                      {walker.phone && (
                        <a
                          href={`tel:${walker.phone}`}
                          className="w-full text-center py-3 px-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition text-sm font-semibold sm:flex-1"
                        >
                          Call
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Donation
        image={donationImage}
        title="Help Pets Get Active"
        text="Your donation supports dog walkers and pet care programs."
        cta="Donate Now"
      />

      {/* ================= SERVICES MODAL ================= */}
      <ServicesModal
        provider={selectedWalker}
        isOpen={servicesModalOpen}
        onClose={() => setServicesModalOpen(false)}
        onBook={(provider) => {
            setSelectedWalker(provider as DogWalker); 
            setServicesModalOpen(false);
            setIsBookingOpen(true);
        }}
        />

      {/* ================= BOOKING MODAL ================= */}
      <BookingModal
        vet={selectedWalker}
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

export default DogWalking;