import React from "react";
import { X, MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

const TrainingModal = ({
  provider,
  isOpen,
  onClose,
  onBook,
}: {
  provider: any;
  isOpen: boolean;
  onClose: () => void;
  onBook: (provider: any) => void;
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
              className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Title & Location on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{provider.name}</h2>
              <div className="flex items-center gap-2 text-white/90">
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
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <div className="w-10 h-10 bg-[#6d0ef1] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 font-medium">Skambinti</div>
                    <div className="text-sm font-bold text-gray-900">{provider.phone}</div>
                  </div>
                </a>
              )}

              {provider.email && (
                <a
                  href={`mailto:${provider.email}`}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <div className="w-10 h-10 bg-[#6d0ef1] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-xs text-gray-500 font-medium">Rašyti</div>
                    <div className="text-sm font-bold text-gray-900 truncate">{provider.email}</div>
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

            {/* Why Choose Us - Purple Box */}
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

            {/* History/Achievements */}
            {provider.history && (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">
                      Pasiekimai
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {provider.history}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Specializacijos */}
            {provider.tags && provider.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-[#6d0ef1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-900">Specializacijos</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {provider.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white border border-[#6d0ef1]/30 text-[#6d0ef1] text-xs font-semibold rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prices Section */}
            {provider.prices && provider.prices.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-[#6d0ef1]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-900">Paslaugos ir kainos</h3>
                </div>

                <div className="space-y-3">
                  {provider.prices.map((price: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#6d0ef1]/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-sm mb-1">
                            {price.service || price.program}
                          </h4>
                          {price.serive_for && (
                            <p className="text-xs text-gray-500 mb-1">{price.serive_for}</p>
                          )}
                          {price.duration && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{price.duration}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#6d0ef1]">
                            {price.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Website Link */}
            {provider.website && (
              <div className="mb-6">
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#6d0ef1] hover:text-[#5a0bc9] transition text-sm font-semibold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Aplankyti svetainę
                </a>
              </div>
            )}

            {/* CTA Button */}
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