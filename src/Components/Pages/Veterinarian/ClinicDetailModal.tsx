// src/Components/Pages/Veterinarian/ClinicDetailModal.tsx
import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Phone, Mail, MapPin, Globe, Clock, Heart,
  Microscope, Scissors, Stethoscope, Pill,
  CheckCircle, ExternalLink, Lock, Copy, Check, ChevronDown, Ticket,
} from "lucide-react";
import { Clinic } from "../../../data/veterinarian/vetData";
import { useAuth } from "../../../context/AuthContext";

const generateReferralCode = (vetId: number) => {
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PAWNS-VET-${vetId}-${random}`;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80";

const getServiceIcon = (service: string) => {
  const s = service.toLowerCase();
  if (s.includes("chirurgija") || s.includes("steriliz") || s.includes("kastravim")) return Scissors;
  if (s.includes("laboratorija") || s.includes("tyrimas") || s.includes("diagnostika")) return Microscope;
  if (s.includes("vaist") || s.includes("vakcinacija")) return Pill;
  if (s.includes("kardio") || s.includes("ultragars") || s.includes("eutanaz")) return Heart;
  return Stethoscope;
};

const LT_DAYS = ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"];
const todayLt = LT_DAYS[new Date().getDay()];

type TabKey = "about" | "Open" | "location";

interface Props {
  clinic: (Clinic & { id: number }) | null;
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
}

const ClinicDetailModal: React.FC<Props> = ({ clinic, isOpen, onClose, onLoginClick }) => {
  const { isAuthenticated } = useAuth();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [showAllHours, setShowAllHours] = useState(false);
  // ── NEW: track whether user has scrolled near the bottom ──
  const [showStickyPromo, setShowStickyPromo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const referralCode = useMemo(
    () => (clinic ? generateReferralCode(clinic.id) : ""),
    [clinic]
  );

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // ── Show sticky promo only when near the bottom of scroll ──
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 100;
    setShowStickyPromo(nearBottom);
  };

  // Reset sticky promo when tab changes (user hasn't scrolled new tab yet)
  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    setShowStickyPromo(false);
    // Scroll back to top of content on tab switch
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  if (!clinic) return null;

  const image = clinic.image || FALLBACK_IMAGE;
  const todayHours = clinic.workingHours.find((r) => r.day === todayLt);
  const hasExtraInfo =
    clinic.animals.length > 0 ||
    clinic.languages.length > 0 ||
    clinic.payment.length > 0 ||
    clinic.amenities.length > 0;

  const TABS: { key: TabKey; label: string; show: boolean }[] = [
    { key: "about", label: "Apie", show: clinic.services.length > 0 || clinic.whyUs.length > 0 || hasExtraInfo },
    { key: "Open", label: "Darbo laikas", show: clinic.workingHours.length > 0 || !!clinic.phone || !!clinic.email || !!clinic.website },
    { key: "location", label: "Vieta", show: !!clinic.address || !!clinic.mapSrc },
  ];
  const visibleTabs = TABS.filter((t) => t.show);

  const promoProps = {
    isAuthenticated,
    clinicId: clinic.id,
    referralCode,
    copied,
    onCopy: handleCopyCode,
    onLoginClick: () => {
      if (onLoginClick) onLoginClick();
      else onClose();
    },
  };

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">

              {/* ── Hero ───────────────────────────────────────────────────── */}
              <div className="relative h-48 md:h-56 flex-shrink-0">
                <img
                  src={image}
                  alt={clinic.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition"
                  aria-label="Uždaryti"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm ${
                    clinic.isOpen ? "bg-emerald-500/90 text-white" : "bg-red-500/90 text-white"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${clinic.isOpen ? "bg-white animate-pulse" : "bg-white"}`} />
                    {clinic.isOpen ? "Atidaryta" : "Uždaryta"}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-medium backdrop-blur-sm">
                      {clinic.price.symbols}{clinic.price.label && ` · ${clinic.price.label}`}
                    </span>
                    {clinic.workingHoursLabel && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-medium backdrop-blur-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {clinic.workingHoursLabel}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                    {clinic.fullName || clinic.name}
                  </h2>
                </div>
              </div>

              {/* ── Tabs ──────────────────────────────────────────────────── */}
              {visibleTabs.length > 1 && (
                <div className="flex-shrink-0 border-b border-gray-200 bg-white">
                  <div className="flex px-6 md:px-8 gap-1 overflow-x-auto">
                    {visibleTabs.map((tab) => {
                      const isActive = activeTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          onClick={() => handleTabChange(tab.key)}
                          className={`relative px-4 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors
                            ${isActive ? "text-[#6d0ef1]" : "text-gray-500 hover:text-gray-800"}`}
                        >
                          {tab.label}
                          {isActive && (
                            <motion.span
                              layoutId="tab-underline"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6d0ef1]"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Body (scrollable) ─────────────────────────────────────── */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6"
              >
                {activeTab === "about" && (
                  <>
                    {clinic.services.length > 0 && (
                      <div>
                        <h3 className="text-lg font-extrabold text-[#0d0c22] mb-3">Teikiamos paslaugos</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                          {clinic.services.map((service) => {
                            const Icon = getServiceIcon(service);
                            return (
                              <div key={service} className="flex items-center gap-3 p-3 rounded-xl bg-[#f3f3f6]">
                                <div className="p-1.5 rounded-lg bg-white flex-shrink-0">
                                  <Icon className="w-4 h-4 text-[#0d0c22]" />
                                </div>
                                <span className="font-semibold text-[#0d0c22] text-sm capitalize">{service}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {clinic.whyUs.length > 0 && (
                      <div>
                        <h3 className="text-lg font-extrabold text-[#0d0c22] mb-3">Kodėl rinktis?</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {clinic.whyUs.map((item) => (
                            <div key={item.title} className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                              <h4 className="font-bold text-[#0d0c22] mb-1 text-sm">{item.title}</h4>
                              {item.description && (
                                <p className="text-xs text-gray-500">{item.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {hasExtraInfo && (
                      <div>
                        <h3 className="text-lg font-extrabold text-[#0d0c22] mb-3">Papildoma informacija</h3>
                        <div className="grid sm:grid-cols-2 gap-5">
                          {clinic.animals.length > 0 && (
                            <ChipGroup label="Gydomi gyvūnai" items={clinic.animals} />
                          )}
                          {clinic.amenities.length > 0 && (
                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Patogumas</p>
                              <div className="space-y-1.5">
                                {clinic.amenities.map((a) => (
                                  <div key={a} className="flex items-center gap-2 text-sm text-[#0d0c22]">
                                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    {a}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === "Open" && (
                  <>
                    {clinic.workingHours.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-5 h-5 text-[#6d0ef1]" />
                          <h3 className="text-lg font-extrabold text-[#0d0c22]">Darbo laikas</h3>
                        </div>

                        {todayHours && (
                          <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50 border-2 border-purple-200 mb-3">
                            <div>
                              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Šiandien</p>
                              <p className="font-bold text-purple-900 text-base">{todayHours.day}</p>
                            </div>
                            <p className="font-bold text-purple-900 text-lg">{todayHours.hours}</p>
                          </div>
                        )}

                        <button
                          onClick={() => setShowAllHours((v) => !v)}
                          className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-[#6d0ef1] hover:text-[#5a0bc9] py-2"
                          aria-expanded={showAllHours}
                        >
                          {showAllHours ? "Slėpti savaitės grafiką" : "Rodyti visą savaitę"}
                          <ChevronDown className={`w-4 h-4 transition-transform ${showAllHours ? "rotate-180" : ""}`} />
                        </button>

                        {showAllHours && (
                          <div className="space-y-1.5 mt-2">
                            {clinic.workingHours.map((row) => {
                              const isToday = row.day === todayLt;
                              return (
                                <div
                                  key={row.day}
                                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm ${
                                    isToday ? "bg-purple-50 font-semibold text-purple-900" : "bg-[#f3f3f6] text-gray-700"
                                  }`}
                                >
                                  <span>{row.day}</span>
                                  <span className={isToday ? "" : "text-gray-500"}>{row.hours}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    {(clinic.phone || clinic.email || clinic.website) && (
                      <div>
                        <h3 className="text-lg font-extrabold text-[#0d0c22] mb-3">Kontaktai</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {clinic.phone && (
                            <ContactCard href={`tel:${clinic.phone}`} Icon={Phone} primary={clinic.phone} secondary="Pagrindinis" />
                          )}
                          {clinic.email && (
                            <ContactCard href={`mailto:${clinic.email}`} Icon={Mail} primary={clinic.email} secondary="El. paštas" smallPrimary />
                          )}
                          {clinic.website && (
                            <ContactCard href={clinic.website} Icon={Globe} primary="Svetainė" secondary="Apsilankykite internete" external />
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === "location" && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-[#6d0ef1]" />
                      <h3 className="text-lg font-extrabold text-[#0d0c22]">Klinikos vieta</h3>
                    </div>

                    {clinic.address && (
                      <div className="p-4 rounded-xl bg-[#f3f3f6] mb-4">
                        <p className="font-bold text-[#0d0c22]">{clinic.address}</p>
                        {clinic.addressCity && (
                          <p className="text-sm text-gray-500 mt-0.5">{clinic.addressCity}</p>
                        )}
                        
                          href={`https://maps.google.com/?q=${encodeURIComponent(clinic.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-[#6d0ef1] hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Gauti kryptis Google Maps
                        </a>
                      </div>
                    )}

                    {clinic.mapSrc && (
                      <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
                        <iframe
                          src={clinic.mapSrc}
                          width="100%"
                          height="320"
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`${clinic.name} žemėlapis`}
                          className="border-0 w-full"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* ── Promo lives here, at the bottom of scrollable content ── */}
                <CompactPromo {...promoProps} />

                {/* Tiny scroll hint — only shown before user reaches bottom */}
                {!showStickyPromo && (
                  <p className="text-center text-xs text-gray-400 pb-1 select-none">
                    ↓ Slinkite žemyn, kad pamatytumėte nuolaidą
                  </p>
                )}
              </div>

              {/* ── Sticky footer: CTAs only ───────────────────────────────── */}
              <div className="flex-shrink-0 border-t border-gray-200 bg-white px-5 md:px-6 py-4 space-y-3">

                {/* Promo slides up into the footer only after scrolling to bottom */}
                <AnimatePresence>
                  {showStickyPromo && (
                    <motion.div
                      key="sticky-promo"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    >
                      <CompactPromo {...promoProps} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  {clinic.phone && (
                    
                      href={`tel:${clinic.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#6d0ef1] text-[#6d0ef1] font-bold hover:bg-purple-50 transition"
                    >
                      <Phone className="w-4 h-4" />
                      Skambinti
                    </a>
                  )}
                  {clinic.url && (
                    
                      href={clinic.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#6d0ef1] text-white font-bold hover:bg-[#5a0bc9] transition shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Klinikos puslapis
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

/* ─── Subcomponents ─────────────────────────────────────────────────────── */

const ChipGroup: React.FC<{ label: string; items: string[] }> = ({ label, items }) => (
  <div>
    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</p>
    <div className="flex flex-wrap gap-1.5">
      {items.map((it) => (
        <span key={it} className="px-2.5 py-1 bg-[#f3f3f6] text-[#0d0c22] rounded-lg text-xs font-medium">{it}</span>
      ))}
    </div>
  </div>
);

const ContactCard: React.FC<{
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  primary: string;
  secondary: string;
  smallPrimary?: boolean;
  external?: boolean;
}> = ({ href, Icon, primary, secondary, smallPrimary, external }) => (
  
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="flex items-center gap-3 p-3 rounded-xl bg-[#f3f3f6] hover:bg-gray-200 transition"
  >
    <div className="p-2 rounded-lg bg-white text-[#6d0ef1] flex-shrink-0">
      <Icon className="w-4 h-4" />
    </div>
    <div className="min-w-0">
      <p className={`font-bold text-[#0d0c22] truncate ${smallPrimary ? "text-sm" : ""}`}>{primary}</p>
      <p className="text-xs text-gray-500">{secondary}</p>
    </div>
  </a>
);

const CompactPromo: React.FC<{
  isAuthenticated: boolean;
  clinicId: number;
  referralCode: string;
  copied: boolean;
  onCopy: () => void;
  onLoginClick: () => void;
}> = ({ isAuthenticated, clinicId, referralCode, copied, onCopy, onLoginClick }) => {
  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-4 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-2 gap-3">
        <h3 className="text-sm font-bold text-purple-900 flex items-center gap-1.5">
          <Ticket className="w-4 h-4 text-purple-700" />
          Registruokitės vizitui ir sutaupykite 5%
        </h3>
        <span className="text-xs bg-purple-200 text-purple-700 px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">
          –5%
        </span>
      </div>

      <p className="text-xs text-purple-800/80 mb-3">
        Pateikite šį kodą registratūroje ir gaukite nuolaidą.
      </p>

      {isAuthenticated ? (
        <div className="flex items-stretch gap-2">
          <div className="flex-1 bg-white border border-purple-300 rounded-lg px-4 py-2.5 flex items-center justify-center shadow-sm min-w-0">
            <p className="text-base font-bold text-purple-800 tracking-wider font-mono truncate">
              {referralCode}
            </p>
          </div>
          <button
            onClick={onCopy}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg transition flex items-center justify-center gap-1.5 font-semibold text-sm min-w-[100px] shadow-sm flex-shrink-0"
            aria-label="Kopijuoti kodą"
          >
            {copied ? (
              <><Check className="w-4 h-4" />Nukopijuota</>
            ) : (
              <><Copy className="w-4 h-4" />Kopijuoti</>
            )}
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white border-2 border-purple-300 rounded-lg px-4 py-2.5 flex items-center justify-center relative overflow-hidden">
            <p className="text-base font-bold text-purple-800 tracking-wider font-mono">
              PAWNS-VET-{clinicId}-<span className="text-purple-300">XXXX</span>
            </p>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={onLoginClick}
            className="mt-2.5 w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 rounded-lg py-2.5 px-4 transition shadow-sm"
          >
            <Lock className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              Prisijunkite ir gaukite nuolaidos kodą
            </span>
          </button>

          <p className="text-[11px] text-purple-600 mt-1.5 text-center">
            Nemokama registracija · Greitas prisijungimas · Išskirtinės nuolaidos
          </p>
        </>
      )}
    </div>
  );
};

export default ClinicDetailModal;