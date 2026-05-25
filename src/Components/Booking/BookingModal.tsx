// src/Components/Pages/Veterinarian/BookingModal.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Phone, Copy, Check, Lock, Ticket, ExternalLink,
} from "lucide-react";

interface Vet {
  id: number;
  name: string;
  phone?: string;
  website?: string;
  city: string;
}

interface Props {
  vet: Vet | null;
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLoginClick?: () => void;
}

const generateReferralCode = (vetId: number) => {
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PAWNS-VET-${vetId}-${random}`;
};

const BookingModal: React.FC<Props> = ({
  vet,
  isOpen,
  onClose,
  isLoggedIn,
  onLoginClick,
}) => {
  const [copied, setCopied] = useState(false);
  const [showStickyPromo, setShowStickyPromo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const referralCode = useMemo(() => {
    if (!vet) return "";
    return generateReferralCode(vet.id);
  }, [vet]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setShowStickyPromo(false);
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      }, 50);
    }
  }, [isOpen]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowStickyPromo(el.scrollTop + el.clientHeight >= el.scrollHeight - 100);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleLoginClick = () => {
    if (onLoginClick) onLoginClick();
    else onClose();
  };

  if (!vet) return null;

  const promoProps = { isLoggedIn, vetId: vet.id, referralCode, copied, onCopy: handleCopyCode, onLoginClick: handleLoginClick };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">

              {/* ── Header ─────────────────────────────────────────────── */}
              <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0d0c22] leading-tight">
                      {vet.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">{vet.city}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition"
                    aria-label="Uždaryti"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── Scrollable body ─────────────────────────────────────── */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
              >
                {/* Info strip */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold bg-emerald-100 text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Priima pacientus</span>
                  </span>
                  <span className="text-xs px-3 py-1.5 rounded-full bg-[#f3f3f6] text-gray-600 font-medium">
                    Veterinarijos klinika
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  Užsiregistruokite vizitui šioje klinikoje ir gaukite specialią nuolaidą naudodami savo asmeninį nuolaidos kodą.
                </p>

                {/* Promo — inline at bottom of scroll */}
                <PromoBlock {...promoProps} />

                {/* Scroll hint */}
                {!showStickyPromo && (
                  <p className="text-center text-xs text-gray-400 pb-1 select-none">
                    ↓ Slinkite žemyn, kad pamatytumėte nuolaidą
                  </p>
                )}
              </div>

              {/* ── Sticky footer ───────────────────────────────────────── */}
              <div className="flex-shrink-0 border-t border-gray-200 bg-white px-5 py-4 space-y-3">

                {/* Promo slides up after scrolling */}
                <AnimatePresence>
                  {showStickyPromo && (
                    <motion.div
                      key="sticky-promo"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    >
                      <PromoBlock {...promoProps} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA buttons — always enabled */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  {vet.phone && (
                    <a
                      href={`tel:${vet.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#6d0ef1] text-[#6d0ef1] font-bold hover:bg-purple-50 transition"
                    >
                      <Phone className="w-4 h-4" />
                      Skambinti
                    </a>
                  )}
                  {vet.website && (
                    <a
                      href={
                        isLoggedIn
                          ? `${vet.website}?ref=${referralCode}`
                          : vet.website
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#6d0ef1] text-white font-bold hover:bg-[#5a0bc9] transition shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Klinikos puslapis
                    </a>
                  )}
                </div>

                <p className="text-[11px] text-gray-400 text-center">
                  PetLietuva gauna rekomendacinę komisiją iš partnerinių klinikų.
                </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ─── PromoBlock ────────────────────────────────────────────────────────── */

const PromoBlock: React.FC<{
  isLoggedIn: boolean;
  vetId: number;
  referralCode: string;
  copied: boolean;
  onCopy: () => void;
  onLoginClick: () => void;
}> = ({ isLoggedIn, vetId, referralCode, copied, onCopy, onLoginClick }) => (
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

    {isLoggedIn ? (
      <div className="flex items-stretch gap-2">
        <div className="flex-1 bg-white border border-purple-300 rounded-lg px-4 py-2.5 flex items-center justify-center shadow-sm min-w-0">
          <p className="text-base font-bold text-purple-800 tracking-wider font-mono truncate">
            {referralCode}
          </p>
        </div>
        <button
          onClick={onCopy}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg transition flex items-center justify-center gap-1.5 font-semibold text-sm min-w-[110px] shadow-sm flex-shrink-0"
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
            PAWNS-VET-{vetId}-<span className="text-purple-300">XXXX</span>
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

export default BookingModal;