import React, { useState } from "react";

interface Pet {
  id: number;
  name: string;
  breed?: string;
  age?: string;
  image: string;
  shelterId?: string;
  shelterName?: string;
  shelterEmail?: string;
  shelterPhone?: string;
  city?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pet: Pet;
  isLoggedIn: boolean;
  userEmail?: string;
}

const AdoptionInquiryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  pet,
  isLoggedIn,
  userEmail = "",
}) => {
  const [formData, setFormData] = useState({
    // Asmeninė informacija
    firstName: "",
    lastName: "",
    email: userEmail || "",
    phone: "",
    
    // Adresas
    address: "",
    city: "",
    zipCode: "",
    
    // Gyvenimo situacija
    housingType: "house",
    ownRent: "own",
    hasYard: "yes",
    landlordApproval: "yes",
    
    // Patirtis su gyvūnais
    hasPets: "no",
    currentPets: "",
    petExperience: "",
    
    // Gyvenimo būdas
    workSchedule: "",
    hoursAlone: "",
    familyMembers: "",
    
    // Kodėl šis gyvūnas
    whyAdopt: "",
    expectations: "",
    
    // Sutikimai
    agreeHomeVisit: false,
    agreeReference: false,
    agreeAdoptionFee: false,
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Paruošti užklausos duomenis
    const inquiryData = {
      petId: pet.id,
      petName: pet.name,
      petBreed: pet.breed,
      shelterId: pet.shelterId,
      shelterName: pet.shelterName,
      shelterEmail: pet.shelterEmail,
      foundVia: "Foothills Gyvūnų Įsivaikinimo Platforma",
      submittedAt: new Date().toISOString(),
      ...formData,
    };

    try {
      // TODO: Pakeisti į tikrą API endpoint
      const response = await fetch("/api/adoption-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryData),
      });

      if (response.ok) {
        // Rodyti sėkmės pranešimą
        alert(
          isLoggedIn
            ? `Ačiū! Jūsų užklausa dėl ${pet.name} pateikta. Patikrinkite "Mano užsakymai" norėdami stebėti būseną.`
            : `Ačiū! Išsiuntėme patvirtinimą į ${formData.email}. Prieglauda netrukus su Jumis susisieks.`
        );
        
        onClose();
      } else {
        throw new Error("Nepavyko pateikti užklausos");
      }
    } catch (error) {
      console.error("Klaida pateikiant užklausą:", error);
      alert("Kažkas nutiko ne taip. Bandykite dar kartą arba susisiekite su palaikymo komanda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.firstName && formData.lastName && formData.email && formData.phone;
    }
    if (step === 2) {
      return formData.address && formData.city && formData.zipCode;
    }
    if (step === 3) {
      return formData.petExperience && formData.workSchedule;
    }
    return true;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Antraštė */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl z-10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Įsivaikinimo užklausa dėl {pet.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {step} žingsnis iš {totalSteps}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progreso juosta */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Gyvūno informacijos kortelė */}
        <div className="px-6 py-4 bg-purple-50 border-b border-purple-100">
          <div className="flex items-center gap-4">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{pet.name}</h3>
              <p className="text-sm text-gray-600">
                {pet.breed} • {pet.age} • {pet.city}
              </p>
            </div>
          </div>
        </div>

        {/* Formos turinys */}
        <form onSubmit={handleSubmit} className="p-6">
          
          {/* 1 žingsnis: Asmeninė informacija */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Asmeninė informacija
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    Vardas *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Pavardė *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  El. pašto adresas *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoggedIn}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                />
                {!isLoggedIn && (
                  <p className="text-xs text-gray-500 mt-1">
                    Čia gausite atnaujinimus apie savo užklausą
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefono numeris *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+370 600 00000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* 2 žingsnis: Gyvenimo situacija */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Jūsų adresas
              </h3>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Gatvės adresas*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    Miestas *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Pašto kodas *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="housingType" className="block text-sm font-medium text-gray-700 mb-2">
                    Būsto tipas
                  </label>
                  <select
                    id="housingType"
                    name="housingType"
                    value={formData.housingType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="house">Namas</option>
                    <option value="apartment">Butas</option>
                    <option value="condo">Kotedžas</option>
                    <option value="farm">Ūkis</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ownRent" className="block text-sm font-medium text-gray-700 mb-2">
                    Nuosavybė ar nuoma?
                  </label>
                  <select
                    id="ownRent"
                    name="ownRent"
                    value={formData.ownRent}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="own">Nuosavybė</option>
                    <option value="rent">Nuoma</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hasYard" className="block text-sm font-medium text-gray-700 mb-2">
                    Ar turite kiemą?
                  </label>
                  <select
                    id="hasYard"
                    name="hasYard"
                    value={formData.hasYard}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="yes">Taip, aptverta</option>
                    <option value="unfenced">Taip, neaptverta</option>
                    <option value="no">Ne</option>
                  </select>
                </div>

                {formData.ownRent === "rent" && (
                  <div>
                    <label htmlFor="landlordApproval" className="block text-sm font-medium text-gray-700 mb-2">
                      Šeimininko leidimas?
                    </label>
                    <select
                      id="landlordApproval"
                      name="landlordApproval"
                      value={formData.landlordApproval}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="yes">Taip</option>
                      <option value="pending">Laukiama</option>
                      <option value="no">Ne</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3 žingsnis: Patirtis su gyvūnais ir gyvenimo būdas */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Patirtis su gyvūnais ir gyvenimo būdas
              </h3>

              <div>
                <label htmlFor="hasPets" className="block text-sm font-medium text-gray-700 mb-2">
                  Ar šiuo metu turite gyvūnų?
                </label>
                <select
                  id="hasPets"
                  name="hasPets"
                  value={formData.hasPets}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="no">Ne</option>
                  <option value="yes">Taip</option>
                </select>
              </div>

              {formData.hasPets === "yes" && (
                <div>
                  <label htmlFor="currentPets" className="block text-sm font-medium text-gray-700 mb-2">
                    Aprašykite savo dabartinius gyvūnus
                  </label>
                  <textarea
                    id="currentPets"
                    name="currentPets"
                    value={formData.currentPets}
                    onChange={handleChange}
                    rows={3}
                    placeholder="pvz., 2 šunys (Labradorai ir Biglis), abu sterilizuoti"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>
              )}

              <div>
                <label htmlFor="petExperience" className="block text-sm font-medium text-gray-700 mb-2">
                  Aprašykite savo patirtį su gyvūnais *
                </label>
                <textarea
                  id="petExperience"
                  name="petExperience"
                  value={formData.petExperience}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Ar anksčiau turėjote gyvūnų? Kokių tipų?"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label htmlFor="workSchedule" className="block text-sm font-medium text-gray-700 mb-2">
                  Koks Jūsų įprastas darbo grafikas? *
                </label>
                <textarea
                  id="workSchedule"
                  name="workSchedule"
                  value={formData.workSchedule}
                  onChange={handleChange}
                  required
                  rows={2}
                  placeholder="pvz., Darbas iš namų, 9-17 val. biure, ne visą darbo dieną"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label htmlFor="hoursAlone" className="block text-sm font-medium text-gray-700 mb-2">
                  Kiek valandų per dieną gyvūnas bus vienas?
                </label>
                <select
                  id="hoursAlone"
                  name="hoursAlone"
                  value={formData.hoursAlone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Pasirinkite...</option>
                  <option value="0-2">0-2 valandos</option>
                  <option value="3-4">3-4 valandos</option>
                  <option value="5-6">5-6 valandos</option>
                  <option value="7-8">7-8 valandos</option>
                  <option value="9+">9+ valandos</option>
                </select>
              </div>

              <div>
                <label htmlFor="familyMembers" className="block text-sm font-medium text-gray-700 mb-2">
                  Šeimos nariai (amžius, jei yra vaikų)
                </label>
                <input
                  type="text"
                  id="familyMembers"
                  name="familyMembers"
                  value={formData.familyMembers}
                  onChange={handleChange}
                  placeholder="pvz., 2 suaugę, 2 vaikai (8 ir 10 metų)"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* 4 žingsnis: Baigiamieji klausimai ir sutikimai */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Papasakokite apie savo planus
              </h3>

              <div>
                <label htmlFor="whyAdopt" className="block text-sm font-medium text-gray-700 mb-2">
                  Kodėl norite įsivaikinti {pet.name}? *
                </label>
                <textarea
                  id="whyAdopt"
                  name="whyAdopt"
                  value={formData.whyAdopt}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Papasakokite, kas jus patraukė šiame gyvūne ir ką tikitės suteikti..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label htmlFor="expectations" className="block text-sm font-medium text-gray-700 mb-2">
                  Kokie Jūsų lūkesčiai šiam įsivaikinimui?
                </label>
                <textarea
                  id="expectations"
                  name="expectations"
                  value={formData.expectations}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Kokio kompanijono ieškote?"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="bg-purple-50 rounded-xl p-4 space-y-3 mt-6">
                <p className="text-sm font-semibold text-gray-900">Būtini sutikimai:</p>
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeHomeVisit"
                    checked={formData.agreeHomeVisit}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Sutinku, kad prieglauda galėtų aplankyti mano namus prieš baigiant įsivaikinimą
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeReference"
                    checked={formData.agreeReference}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Galiu pateikti veterinarijos ir/ar asmeninius rekomendacijas
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeAdoptionFee"
                    checked={formData.agreeAdoptionFee}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Suprantu, kad yra įsivaikinimo mokestis ir nuolatinės gyvūno priežiūros išlaidos
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigacijos mygtukai */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Atgal
              </button>
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tęsti
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !formData.agreeHomeVisit || !formData.agreeReference || !formData.agreeAdoptionFee}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Siunčiama...
                  </>
                ) : (
                  "Pateikti užklausą"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionInquiryModal;