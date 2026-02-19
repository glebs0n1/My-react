import React, { useEffect, useMemo, useState } from "react";

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

/* ================= HELPERS ================= */

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
  const [isRevealing, setIsRevealing] = useState(false);
  
  const referralCode = useMemo(() => {
    if (!vet) return "";
    return generateReferralCode(vet.id);
  }, [vet]);

  useEffect(() => {
    if (isOpen && vet && isLoggedIn) {
      // Only log when user is authenticated
      console.log("Referral opened:", {
        vetId: vet.id,
        ref: referralCode,
      });
      
      // Auto-reveal animation for logged-in users
      setIsRevealing(true);
      setTimeout(() => setIsRevealing(false), 800);
    }
  }, [isOpen, vet, referralCode, isLoggedIn]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen || !vet) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4"
      style={{ margin: 0 }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">
          Registruotis vizitui ir sutaupyti 5% 
        </h2>

        {/* Referral section - REDESIGNED */}
        <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5 mb-6 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-purple-900">
            Pateikite šį kodą registratūroje ir gaukite nuolaidą
            </span>
            <span className="text-xs bg-purple-200 text-purple-700 px-2.5 py-1 rounded-full font-semibold">
            –5% 
            </span>
          </div>
          
          {/* Code Display Area */}
          <div className="relative">
            {isLoggedIn ? (
              // LOGGED IN - Show actual code with copy button
              <div className={`transition-all duration-500 ${isRevealing ? 'scale-105' : 'scale-100'}`}>
                <div className="flex items-stretch gap-2">
                  <div className="flex-1 bg-white border border-purple-300 rounded-lg px-4 py-3 flex items-center justify-center shadow-sm">
                    <p className="text-xl font-bold text-purple-800 tracking-wider font-mono">
                      {referralCode}
                    </p>
                  </div>
                  
                  <button
                    onClick={handleCopyCode}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm min-w-[80px] shadow-sm hover:shadow-md"
                    aria-label="Copy referral code"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                
                <p className="text-xs text-purple-600 mt-3 text-center">
                  Show this code at checkout to claim your discount
                </p>
              </div>
            ) : (
              // NOT LOGGED IN - Show preview with overlay
              <div className="relative">
                {/* Code Preview - Partially visible */}
                <div className="bg-white border-2 border-purple-300 rounded-lg px-4 py-3 flex items-center justify-center relative overflow-hidden">
                  <p className="text-xl font-bold text-purple-800 tracking-wider font-mono">
                    PAWNS-VET-{vet.id}-
                    <span className="inline-block relative">
                      <span className="text-purple-300">XXXX</span>
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
                    </span>
                  </p>
                  
                  {/* Gradient fade overlay on the right */}
                  <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none" />
                </div>

                {/* Unlock overlay */}
                <div 
                  className="mt-3 flex items-center justify-center gap-2 bg-purple-600 rounded-lg py-2.5 px-4 cursor-pointer hover:bg-purple-700 transition-colors" 
                  onClick={() => {
                    if (onLoginClick) {
                      onLoginClick();
                    } else {
                      onClose();
                    }
                  }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-semibold text-white">
                  Prisijunkite ir gaukite nuolaidos kodą                  </span>
                </div>
                
                <p className="text-xs text-purple-600 mt-2 text-center">
Nemokama registracija · Greitas prisijungimas · Išskirtinės nuolaidos

                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {vet.phone && (
            <a
              href={`tel:${vet.phone}`}
              className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-200 ${
                isLoggedIn
                  ? "bg-purple-600 text-white hover:bg-purple-700 shadow-sm hover:shadow-md"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
              }`}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                }
              }}
              aria-disabled={!isLoggedIn}
            >
              📞 Call clinic
            </a>
          )}

          {vet.website && (
            <a
              href={isLoggedIn ? `${vet.website}?ref=${referralCode}` : "#"}
              target={isLoggedIn ? "_blank" : undefined}
              rel={isLoggedIn ? "noopener noreferrer" : undefined}
              className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-200 ${
                isLoggedIn
                  ? "border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                  : "border-2 border-gray-300 text-gray-500 cursor-not-allowed opacity-60"
              }`}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                }
              }}
              aria-disabled={!isLoggedIn}
            >
              🌐 Visit website
            </a>
          )}

          {!vet.website && isLoggedIn && (
            <p className="text-xs text-gray-500 text-center">
              If asked, manually provide the referral code above.
            </p>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
PetLietuva gauna rekomendacinę komisiją iš partnerinių klinikų.        </p>
      </div>
      
      {/* Add shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default BookingModal;