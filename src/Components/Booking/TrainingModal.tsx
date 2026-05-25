import React from "react";
import { X, MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

interface TrainingModalProps {
  provider: any;
  isOpen: boolean;
  onClose: () => void;
  onBook: (provider: any) => void;
}

const TrainingModal: React.FC<TrainingModalProps> = ({
  provider,
  isOpen,
  onClose,
  onBook,
}) => {
  if (!isOpen || !provider) return null;

  /* ================= EMAIL CLEANING ================= */

  const getCleanEmail = () => {
    if (!provider?.email) return null;

    const raw = provider.email.trim();

    const withoutMailto = raw.startsWith("mailto:")
      ? raw.replace("mailto:", "")
      : raw;

    return withoutMailto.split("?")[0];
  };

  const cleanEmail = getCleanEmail();

  const emailHref =
    cleanEmail &&
    `mailto:${cleanEmail}?subject=${encodeURIComponent(
      `Užklausa dėl ${provider.name}`
    )}`;

  /* ================= WEBSITE CLEANING ================= */

  const getCleanWebsite = () => {
    if (!provider?.website) return null;

    const url = provider.website.trim();

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    return `https://${url}`;
  };

  const cleanWebsite = getCleanWebsite();

  /* ==================================================== */

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

          {/* HEADER */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{provider.name}</h2>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {provider.city}, {provider.address}
                </span>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="overflow-y-auto max-h-[calc(90vh-16rem)] p-6">

            {/* CONTACT */}
            <div className="grid grid-cols-2 gap-3 mb-6">

              {provider.phone && (
                <a
                  href={`tel:${provider.phone}`}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <div className="w-10 h-10 bg-[#6d0ef1] rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">
                      Skambinti
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {provider.phone}
                    </div>
                  </div>
                </a>
              )}

              {cleanEmail && (
                <a
                  href={emailHref!}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <div className="w-10 h-10 bg-[#6d0ef1] rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 font-medium">
                      Rašyti
                    </div>
                    <div className="text-sm font-bold text-gray-900 truncate">
                      {cleanEmail}
                    </div>
                  </div>
                </a>
              )}

            </div>

            {/* DESCRIPTION */}
            {provider.description && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Apie mus
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {provider.description}
                </p>
              </div>
            )}

            {/* WHY US */}
            {provider.whyUs && (
              <div className="p-4 bg-[#f2eef6] rounded-xl border border-[#6d0ef1]/20 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-[#6d0ef1] rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2">
                      Kodėl rinktis mus?
                    </h4>
                    <p className="text-sm text-gray-700">
                      {provider.whyUs}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* WEBSITE */}
            {cleanWebsite && (
              <div className="mb-6">
                <a
                  href={cleanWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6d0ef1] hover:text-[#5a0bc9] text-sm font-semibold"
                >
                  Aplankyti svetainę
                </a>
              </div>
            )}

            {/* CTA */}
            <div className="pt-6 border-t border-gray-200">
              {provider.registrationLink ? (
                <a
                  href={provider.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 bg-gradient-to-r from-[#6d0ef1] to-[#5a0bc9] text-white text-center rounded-xl font-bold hover:opacity-90 transition shadow-lg"
                >
                  Registruotis dabar
                </a>
              ) : (
                <button
                  onClick={() => onBook(provider)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#6d0ef1] to-[#5a0bc9] text-white rounded-xl font-bold hover:opacity-90 transition shadow-lg"
                >
                  Rezervuoti užsiėmimą
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingModal;