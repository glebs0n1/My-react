import React from "react";
import { X, MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

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

interface GroomingModalProps {
  provider: GroomingSalon | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (provider: GroomingSalon) => void;
}

const GroomingModal: React.FC<GroomingModalProps> = ({
  provider,
  isOpen,
  onClose,
  onBook,
}) => {
  if (!isOpen || !provider) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          
          {/* Header with Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition"
              >
            <svg className="w-4 h-4" fill="w-5 h-5 text-gray-700" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

            {/* Title & Location on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{provider.name}</h2>
              <div className="flex items-center gap-2 text-white/90 text-sm">
              <MapPin className="w-4 h-4" />
                <span className="text-sm">{provider.city}, {provider.address}</span>
              </div>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto max-h-[calc(90vh-16rem)] p-6">
            
            {/* Contact Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {provider.phone && (
                <a
                  href={`tel:${provider.phone}`}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="p-2 bg-[#6d0ef1] rounded-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 font-medium">Skambinti</div>
                    <div className="font-bold text-gray-900 text-sm">{provider.phone}</div>
                  </div>
                </a>
              )}

              {provider.email && (
                <a
                  href={`mailto:${provider.email}`}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                  >
                  <div className="p-2 bg-[#6d0ef1] rounded-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 font-medium">Rašyti</div>
                    <div className="font-bold text-gray-900 text-sm truncate">{provider.email}</div>
                  </div>
                </a>
              )}
            </div>

            {/* About Section */}
            {provider.description && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Apie mus</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {provider.description}
                </p>
              </div>
            )}

            {/* Why Choose Us - Green Box */}
            {provider.whyUs && (
              <div className="p-4 bg-[#f2eef6] rounded-xl border border-[#6d0ef1]/20 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-[#6d0ef1] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">
                      Kodėl rinktis mus?
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {provider.whyUs}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Specializacijos */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-[#6d0ef1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h3 className="text-lg font-bold text-gray-900">Specializacijos</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {provider.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white border border-[#6d0ef1]/30 text-[#6d0ef1] text-xs font-semibold rounded-lg"
                    >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Prices Section */}
            <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-[#6d0ef1]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                <h3 className="text-lg font-bold text-gray-900">Paslaugos ir kainos</h3>
              </div>

              <div className="space-y-3">
                {provider.prices.map((price, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-emerald-200 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm">
                          {price.service}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>45 min.</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#6d0ef1]">
                          €{price.priceFrom}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onBook(provider)}
              className="w-full py-3.5 bg-gradient-to-r from-[#6d0ef1] to-[#5a0bc9] text-white rounded-xl font-bold hover:opacity-90 transition shadow-lg"
              >
              Gauti nuolaidos kodą
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroomingModal;