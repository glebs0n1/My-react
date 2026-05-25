// src/Components/Booking/GroomingModal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Star,
  User,
  Scissors,
  Sparkles,
  Droplets,
  Heart,
} from "lucide-react";
import { GroomingSalon } from "../../data/grooming/groomingData";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80";

const getServiceIcon = (service: string) => {
  const s = service.toLowerCase();
  if (s.includes("kerp") || s.includes("kirp")) return Scissors;
  if (s.includes("maud") || s.includes("vand") || s.includes("šampū"))
    return Droplets;
  if (s.includes("nag") || s.includes("dant") || s.includes("aus"))
    return Sparkles;
  return Heart;
};

interface GroomingModalProps {
  provider: GroomingSalon | null;
  isOpen: boolean;
  onClose: () => void;
}

const GroomingModal: React.FC<GroomingModalProps> = ({
  provider,
  isOpen,
  onClose,
}) => {
  if (!provider) return null;

  const name = provider.businessName || provider.title || "Kirpykla";
  const image = provider.image || FALLBACK_IMAGE;

  const cleanEmail = (() => {
    const email = (provider as any).email;
    if (!email) return null;
    const raw = String(email).trim();
    const noMailto = raw.startsWith("mailto:") ? raw.replace("mailto:", "") : raw;
    return noMailto.split("?")[0];
  })();

  const emailSubject = encodeURIComponent(`Užklausa dėl ${name}`);
  const emailHref = cleanEmail && `mailto:${cleanEmail}?subject=${emailSubject}`;

  const cleanWebsite = (() => {
    if (!provider.url) return null;
    if (
      provider.url.startsWith("http://") ||
      provider.url.startsWith("https://")
    ) {
      return provider.url;
    }
    return `https://${provider.url}`;
  })();

  const mapsQuery = encodeURIComponent(
    [name, provider.city].filter(Boolean).join(" ")
  );
  const mapsLink = `https://maps.google.com/?q=${mapsQuery}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden mb-8">

              {/* ── Hero image ──────────────────────────────────────────────── */}
              <div className="relative h-64 md:h-80">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                {provider.rating != null && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold bg-amber-400/95 text-amber-950 backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-amber-900 text-amber-900" />
                      {provider.rating}
                      {provider.reviewCount > 0 && ` · ${provider.reviewCount}`}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {provider.price && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-medium backdrop-blur-sm">
                        {provider.price}
                      </span>
                    )}
                    {provider.city && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-medium backdrop-blur-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {provider.city}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                    {name}
                  </h2>
                </div>
              </div>

              {/* ── Body ────────────────────────────────────────────────────── */}
              <div className="p-6 md:p-8 space-y-8">

                {/* ── Contact row ─────────────────────────────────────────── */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {provider.phone && (
                    <a
                      href={`tel:${provider.phone}`}
                      className="flex items-center gap-4 p-4 rounded-xl bg-[#f3f3f6] hover:bg-gray-200 transition"
                    >
                      <div className="p-2.5 rounded-lg bg-white text-[#6d0ef1]">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0d0c22]">
                          {provider.phone}
                        </p>
                        <p className="text-xs text-gray-500">Telefonas</p>
                      </div>
                    </a>
                  )}

                  {cleanEmail && (
                    <a
                      href={emailHref!}
                      className="flex items-center gap-4 p-4 rounded-xl bg-[#f3f3f6] hover:bg-gray-200 transition"
                    >
                      <div className="p-2.5 rounded-lg bg-white text-[#6d0ef1]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#0d0c22] truncate text-sm">
                          {cleanEmail}
                        </p>
                        <p className="text-xs text-gray-500">El. paštas</p>
                      </div>
                    </a>
                  )}

                  {provider.city && (
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f3f3f6] sm:col-span-2">
                      <div className="p-2.5 rounded-lg bg-white text-[#6d0ef1] flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#0d0c22]">{name}</p>
                        <p className="text-sm text-gray-500">{provider.city}</p>
                        <a
                          href={mapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#6d0ef1] hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Rasti žemėlapyje
                        </a>
                      </div>
                    </div>
                  )}

                  {cleanWebsite && (
                    <a
                      href={cleanWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-[#f3f3f6] hover:bg-gray-200 transition sm:col-span-2"
                    >
                      <div className="p-2.5 rounded-lg bg-white text-[#6d0ef1]">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0d0c22]">Svetainė</p>
                        <p className="text-xs text-gray-500">
                          Apsilankykite internete
                        </p>
                      </div>
                    </a>
                  )}
                </div>

                {/* ── Description ─────────────────────────────────────────── */}
                {provider.description && (
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0d0c22] mb-3">
                      Apie mus
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {provider.description}
                    </p>
                  </div>
                )}

                {/* ── Services (icon grid) ─────────────────────────────────── */}
                {provider.serviceTypes?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0d0c22] mb-4">
                      Teikiamos paslaugos
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {provider.serviceTypes.map((service) => {
                        const Icon = getServiceIcon(service);
                        return (
                          <div
                            key={service}
                            className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f3f3f6]"
                          >
                            <div className="p-2 rounded-lg bg-white flex-shrink-0">
                              <Icon className="w-4 h-4 text-[#0d0c22]" />
                            </div>
                            <span className="font-semibold text-[#0d0c22] text-sm capitalize">
                              {service}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── Gallery ─────────────────────────────────────────────── */}
                {provider.galleryImages?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0d0c22] mb-4">
                      Darbų galerija
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {provider.galleryImages.slice(0, 8).map((src, i) => (
                        <a
                          key={src}
                          href={src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block aspect-square rounded-xl overflow-hidden bg-[#f3f3f6] hover:opacity-90 transition"
                        >
                          <img
                            src={src}
                            alt={`${name} – darbas ${i + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover"
                            onError={(e) =>
                              ((e.target as HTMLImageElement).style.display =
                                "none")
                            }
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Reviews ─────────────────────────────────────────────── */}
                {provider.reviews?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0d0c22] mb-4">
                      Atsiliepimai ({provider.reviews.length})
                    </h3>
                    <div className="space-y-3">
                      {provider.reviews.map((review, i) => {
                        const reviewKey = `${review.author ?? "anon"}-${review.date ?? i}`;
                        const ratingValue = Number(review.rating);
                        return (
                        <div key={reviewKey} className="p-4 rounded-xl bg-[#f3f3f6]">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-[#6d0ef1]" />
                              <span className="font-bold text-sm text-[#0d0c22]">
                                {review.author || "Anonimas"}
                              </span>
                            </div>

                            {review.rating && (
                              <div className="flex">
                                {["s1", "s2", "s3", "s4", "s5"].map((starId, s) => (
                                  <Star
                                    key={starId}
                                    className={`w-3 h-3 ${
                                      s < ratingValue
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>

                          {review.content && (
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {review.content}
                            </p>
                          )}
                        </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── CTA ─────────────────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
                  {provider.phone && (
                    <a
                      href={`tel:${provider.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-[#6d0ef1] text-[#6d0ef1] font-bold hover:bg-purple-50 transition"
                    >
                      <Phone className="w-4 h-4" />
                      Skambinti dabar
                    </a>
                  )}
                  {cleanWebsite && (
                    <a
                      href={cleanWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#6d0ef1] text-white font-bold hover:bg-[#5a0bc9] transition shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Peržiūrėti puslapį
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GroomingModal;
