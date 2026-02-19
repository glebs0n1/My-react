import React, { useState } from "react";
import { Copy, Check, CreditCard, Building2, Wallet } from "lucide-react";

interface DonateModalProps {
  onClose: () => void;
  petName?: string;
}

const DonateModal: React.FC<DonateModalProps> = ({ onClose, petName }) => {
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [purpose, setPurpose] = useState("general");
  const [activeTab, setActiveTab] = useState("card"); // 'card', 'bank', 'paysera'
  const [copiedField, setCopiedField] = useState("");

  const presetAmounts = [10, 25, 50, 100];

  // Bank details for direct transfer
  const bankDetails = {
    name: "Pet Shelter Foundation",
    address: "123 Animal Street, Pet City, PC12345",
    accounts: [
      {
        bank: "SEB",
        iban: "LT10 7044 0600 0766 9611",
        swift: "CBVILT2X"
      },
      {
        bank: "Swedbank",
        iban: "LT49 7300 0101 0620 6608",
        swift: "HABALT22",
        address: "Konstitucijos pr. 20A, 03502 Vilnius"
      }
    ]
  };

  const handleDonate = () => {
    const finalAmount = customAmount || amount;
    console.log("Donation:", { amount: finalAmount, purpose, petName });
    alert(`Thank you for donating €${finalAmount}${petName ? ` for ${petName}` : ''}!`);
    onClose();
  };

  const copyToClipboard = (text: string, field: string): void => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  return (
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Support Our Shelter</h2>
          <p className="text-sm text-gray-600 mt-1">
            {petName ? `Help ${petName} and other pets in need` : '100% of your donation goes directly to animal care'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
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
            Quick Donate
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
            Bank Transfer
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
                Donation amount
              </label>

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
                  placeholder="Custom amount"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Donation Purpose */}
            <div>
              <label htmlFor="purpose" className="block text-sm font-semibold text-gray-900 mb-3">
                Donation purpose
              </label>
              <select
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="general">General support</option>
                {petName && <option value="specific">Support for {petName}</option>}
                <option value="medical">Medical care</option>
                <option value="food">Food & supplies</option>
                <option value="rescue">Rescue operations</option>
              </select>
            </div>

            {/* Trust Badges */}
            <div className="bg-purple-50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-purple-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Verified shelter only</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>100% transparent donations</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Secure payments (Stripe coming soon)</span>
              </div>
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
            >
              Donate €{customAmount || amount}
            </button>
          </>
        )}

        {/* Bank Transfer Tab */}
        {activeTab === "bank" && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Building2 size={18} />
                Direct Bank Transfer
              </h3>
              <p className="text-sm text-blue-700">
                Transfer funds directly to our verified shelter account. Include the pet's name in the payment description if you wish to support a specific animal.
              </p>
            </div>

            {/* Organization Details */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <h4 className="font-semibold text-gray-900 mb-3">Organization Details</h4>
              <div className="space-y-1 text-sm">
                <p><strong>Name:</strong> {bankDetails.name}</p>
                <p><strong>Address:</strong> {bankDetails.address}</p>
              </div>
            </div>

            {/* Bank Accounts */}
            {bankDetails.accounts.map((account, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <Building2 size={16} className="text-purple-600" />
                  {account.bank}
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
                      title="Copy IBAN"
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
                  <label className="text-xs text-gray-500 uppercase tracking-wide">SWIFT Code</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 bg-white px-3 py-2 rounded-lg border border-gray-300 font-mono text-sm">
                      {account.swift}
                    </code>
                    <button
                      onClick={() => copyToClipboard(account.swift, `swift-${index}`)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy SWIFT"
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
                    <strong>Bank address:</strong> {account.address}
                  </p>
                )}
              </div>
            ))}

            {/* Note about payment description */}
            {petName && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                  <strong>💡 Tip:</strong> Include "<strong>{petName}</strong>" in your payment description to direct your donation to this specific pet.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Paysera Tab */}
        {activeTab === "paysera" && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <Wallet size={18} />
                Donate via Paysera
              </h3>
              <p className="text-sm text-green-700">
                Fast, simple, and transparent. Direct support through the Paysera payment system.
              </p>
            </div>

            <div className="text-center py-8">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
                  <Wallet size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Support Through Paysera</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Click the button below to make a secure donation through Paysera's trusted payment system.
                </p>
              </div>

              {/* Amount Selection for Paysera */}
              <div className="max-w-sm mx-auto mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Select amount
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
              </div>

              <a
                href={`https://www.paysera.com/donate?amount=${customAmount || amount}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                <Wallet size={20} />
                Donate €{customAmount || amount} via Paysera
              </a>

              <p className="text-xs text-gray-500 mt-4">
                You will be redirected to Paysera's secure payment page
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonateModal;