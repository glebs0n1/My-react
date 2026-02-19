import React, { useState, useEffect } from "react";
import { Copy, Check, CreditCard, Building2, Wallet } from "lucide-react";

const DonateModal = ({ onClose, donationInfo, petName }) => {
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [purpose, setPurpose] = useState("general");
  const [shelter, setShelter] = useState("most-needed");
  const [activeTab, setActiveTab] = useState("card"); // 'card', 'bank', 'paysera'
  const [copiedField, setCopiedField] = useState("");
  const [tipPercentage, setTipPercentage] = useState(0);
  const [showCustomTip, setShowCustomTip] = useState(false);
  const [customTipAmount, setCustomTipAmount] = useState("");

  const presetAmounts = [10, 25, 50, 100];

  // Bank details for direct transfer
  const bankDetails = donationInfo
  ? {
      name: donationInfo.organizationName,
      address: donationInfo.address,
      accounts: donationInfo.banks || [],
    }
  : null;

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getDonationAmount = () => {
    return parseFloat(customAmount) || amount;
  };

  const calculateTip = () => {
    const donationAmount = getDonationAmount();
    return (donationAmount * tipPercentage / 100).toFixed(2);
  };

  const calculateTotal = () => {
    const donationAmount = getDonationAmount();
    return (donationAmount + parseFloat(calculateTip())).toFixed(2);
  };

  const setFixedTip = (tipAmount) => {
    const donationAmount = getDonationAmount();
    const percentage = Math.round((tipAmount / donationAmount) * 100);
    setTipPercentage(percentage);
  };

  const handleCustomTipSubmit = () => {
    if (customTipAmount && !isNaN(customTipAmount)) {
      const donationAmount = getDonationAmount();
      const percentage = Math.round((parseFloat(customTipAmount) / donationAmount) * 100);
      setTipPercentage(Math.min(percentage, 100)); // Cap at 100%
      setShowCustomTip(false);
      setCustomTipAmount("");
    }
  };

  const handleDonate = () => {
    const finalAmount = getDonationAmount();
    console.log("Auka:", { amount: finalAmount, purpose, shelter, tip: calculateTip() });
    alert(`Ačiū už €${finalAmount} auką ${shelter}!`);
    onClose();
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4"
      style={{ margin: 0 }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Paremti {donationInfo?.organizationName || "prieglaudą"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              100% jūsų aukos sumos bus tiesiogiai pervestos į patikrintas prieglaudas Lietuvoje.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Uždaryti"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("card")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                activeTab === "card"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <CreditCard size={18} />
              Greita auka
            </button>
            <button
              onClick={() => setActiveTab("bank")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                activeTab === "bank"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Building2 size={18} />
              Banko pavedimas
            </button>
            <button
              onClick={() => setActiveTab("paysera")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                activeTab === "paysera"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Wallet size={18} />
              Paysera
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Donate Tab */}
          {activeTab === "card" && (
            <>
              {/* Donation Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Aukos suma
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  Pasirinkite iš anksto nustatytą sumą arba įveskite pasirinktą vertę
                </p>

                {/* Preset Amounts */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setAmount(preset);
                        setCustomAmount("");
                      }}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                        amount === preset && !customAmount
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      €{preset}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    €
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Pasirinkta suma"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Tip Services Section */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Paremti Pet Lietuva paslaugas
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                Pet Lietuva ima 0% platformos mokestį nuo prieglaudų. Pet Lietuva tęs savo paslaugas dėka aukotojų, kurie palieka pasirinktinę sumą čia:
                </p>
                
                {/* Tip Percentage Display */}
                <div className="text-center py-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {tipPercentage}%
                  </span>
                  <span className="text-lg text-gray-600 ml-2">
                    (€{calculateTip()})
                  </span>
                </div>

                {/* Tip Progress Bar */}
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={tipPercentage}
                    onChange={(e) => setTipPercentage(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    style={{
                      background: `linear-gradient(to right, #9333ea 0%, #9333ea ${(tipPercentage / 30) * 100}%, #e5e7eb ${(tipPercentage / 30) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>

                

                {/* Thank You Message */}
                {tipPercentage > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                    <p className="text-lg font-semibold text-amber-900">
                      Ačiū už jūsų dosnumą!
                    </p>
                  </div>
                )}
              </div>

              {/* Tip Prompt (when tip is 0) */}
              {tipPercentage === 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <h4 className="text-base font-bold text-gray-900 mb-2 text-center">
                    Ar galite pridėti arbatpinigius?
                  </h4>
                  <p className="text-sm text-gray-700 mb-4 text-center">
                    Arbatpinigiai padeda Pet Lietuva veikti, kad žmonės galėtų gauti reikiamą pagalbą.
                  </p>
                  <div className="flex gap-3 justify-center">
                    {[1, 2, 4].map((tip) => (
                      <button
                        key={tip}
                        onClick={() => setFixedTip(tip)}
                        className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full font-semibold transition-all hover:border-purple-600 hover:bg-purple-50 hover:text-purple-700"
                      >
                        €{tip}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Jūsų arbatpinigiai: <strong>€0</strong>
                  </p>
                </div>
              )}

              {/* Donation Purpose */}
              <div>
                <label htmlFor="purpose" className="block text-sm font-semibold text-gray-900 mb-3">
                  Paramos paskirtis
                </label>
                <select
                  id="purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="general">Bendra pagalba</option>
                  <option value="medical">Medicininė priežiūra ir veterinarijos paslaugos</option>
                  <option value="food">Maistas ir kasdienės prekės</option>
                  <option value="rescue">Gelbėjimo operacijos</option>
                  <option value="shelter">Prieglobsčio priežiūra ir gerinimas</option>
                </select>
              </div>

              {/* Choose Shelter */}
              <div>
                <label htmlFor="shelter" className="block text-sm font-semibold text-gray-900 mb-3">
                  Pasirinkite prieglobstį
                </label>
                <select
                  id="shelter"
                  value={shelter}
                  onChange={(e) => setShelter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="most-needed">Ten, kur labiausiai reikia</option>
                  <option value="vilnius">Vilniaus gyvūnų prieglauda</option>
                  <option value="kaunas">Kauno gyvūnų gelbėjimas</option>
                  <option value="klaipeda">Klaipėdos gyvūnų priežiūra</option>
                  <option value="siauliai">Šiaulių prieglauda</option>
                  <option value="panevezys">Panevėžio prieglauda</option>
                </select>
              </div>

              {/* Donation Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Jūsų auka
                </h3>
                
                <div className="flex justify-between text-base text-gray-600">
                  <span>Jūsų auka</span>
                  <span className="font-semibold text-gray-900">€{getDonationAmount().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-base text-gray-600">
                  <span>Pet Lietuva arbatpinigiai</span>
                  <span className="font-semibold text-gray-900">€{calculateTip()}</span>
                </div>

                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Viso mokėti šiandien</span>
                  <span>€{calculateTotal()}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-purple-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-purple-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Tik patikrintos Lietuvos prieglaudos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>100% aukos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Saugūs mokėjimai (netrukus "Stripe")</span>
                </div>
              </div>

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                Paaukoti €{calculateTotal()}
              </button>
            </>
          )}

          {/* Bank Transfer Tab */}
          {activeTab === "bank" && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Building2 size={18} />
                  Tiesioginė parama į banko sąskaitą
                </h3>
                <p className="text-sm text-blue-700">
                  Pervedkite lėšas tiesiai į mūsų patvirtintą prieglaudos sąskaitą. Mokėjimo aprašyme nurodykite pasirinktos prieglaudos pavadinimą, kad jūsų auka būtų tinkamai paskirstyta.
                </p>
              </div>

              {/* Organization Details */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <h4 className="font-semibold text-gray-900 mb-3">Rekvizitai {donationInfo?.organizationName}</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Pavadinimas:</strong> {bankDetails?.name}</p>
                  <p><strong>Adresas:</strong> {bankDetails?.address}</p>
                  <p><strong>Registracija:</strong> Lietuva</p>
                </div>
              </div>

              {/* Bank Accounts */}
              {bankDetails?.accounts?.map((account, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 space-y-3">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <Building2 size={16} className="text-purple-600" />
                    {account.bank} banko sąskaita
                  </h4>
                  
                  {/* IBAN */}
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">IBAN</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="flex-1 bg-white px-3 py-2 rounded-lg border border-gray-300 font-mono text-sm">
                        {account.iban}
                      </code>
                      <button
                        onClick={() => copyToClipboard(account.iban, `iban-${index}`)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Kopijuoti IBAN"
                      >
                        {copiedField === `iban-${index}` ? (
                          <Check size={18} className="text-green-600" />
                        ) : (
                          <Copy size={18} className="text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* SWIFT */}
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">SWIFT kodas</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="flex-1 bg-white px-3 py-2 rounded-lg border border-gray-300 font-mono text-sm">
                        {account.swift}
                      </code>
                      <button
                        onClick={() => copyToClipboard(account.swift, `swift-${index}`)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Kopijuoti SWIFT"
                      >
                        {copiedField === `swift-${index}` ? (
                          <Check size={18} className="text-green-600" />
                        ) : (
                          <Copy size={18} className="text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {account.address && (
                    <p className="text-xs text-gray-600">
                      <strong>Banko adresas:</strong> {account.address}
                    </p>
                  )}
                </div>
              ))}

              {/* Note about payment description */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                  <strong>💡 Svarbu:</strong> Mokėjimo aprašyme nurodykite pasirinktos prieglaudos pavadinimą (pvz., "Vilniaus gyvūnų prieglauda" ar "Kauno gyvūnų gelbėjimas"), kad jūsų auka pasiektų tinkamą vietą.
                </p>
              </div>
            </div>
          )}

          {/* Paysera Tab */}
          {activeTab === "paysera" && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <Wallet size={18} />
                  Aukoti per Paysera mokėjimų sistemą
                </h3>
                <p className="text-sm text-green-700">
                  Greitos, paprastos ir saugios aukos per patikimą Lietuvos Paysera mokėjimų platformą. Puikiai tinka tiek lietuviškiems, tiek tarptautiniams aukotojams.
                </p>
              </div>

              <div className="text-center py-8">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
                    <Wallet size={40} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Paremkite per Paysera</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Atlikite saugią auką per Paysera patikimą mokėjimo sistemą. Priimami mokėjimo būdai: banko pavedimas, kredito kortelė ir Lietuvos mobilusis bankininkystė.
                  </p>
                </div>

                {/* Amount Selection for Paysera */}
                <div className="max-w-sm mx-auto mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Pasirinkite aukos sumą
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => {
                          setAmount(preset);
                          setCustomAmount("");
                        }}
                        className={`py-2 px-3 rounded-lg font-semibold transition-all text-sm ${
                          amount === preset && !customAmount
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        €{preset}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Pasirinkta suma"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <a
                  href={`https://www.paysera.com/donate?amount=${getDonationAmount()}&currency=EUR`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
                >
                  <Wallet size={20} />
                  Aukoti €{getDonationAmount()} per Paysera
                </a>

                <p className="text-xs text-gray-500 mt-4">
                  Būsite nukreipti į Paysera saugų mokėjimo puslapį
                </p>
              </div>

              {/* Paysera Benefits */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Kodėl Paysera?</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Licencijuota mokėjimų įstaiga Lietuvoje ir ES</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Momentinės aukos su bankų nuorodomis (Swedbank, SEB, Luminor)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Saugus šifravimas ir PCI DSS atitiktis</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
        }
        input[type="range"]::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
        }
        input[type="range"]::-moz-range-track {
          height: 8px;
          border-radius: 4px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
          margin-top: -8px;
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default DonateModal;