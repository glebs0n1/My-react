import React, { useState } from "react";

interface AdoptBundleModalProps {
  petName: string;
  petId: number;
  onClose: () => void;
}

const AdoptBundleModal: React.FC<AdoptBundleModalProps> = ({ petName, petId, onClose }) => {
  const [bundle, setBundle] = useState({
    vetCheck: { id: "vet", name: "Vet check", description: "First health check within 7 days", price: 50, selected: true },
    training: { id: "training", name: "Training session", description: "One gentle behavior support session", price: 40, selected: false },
    starterKit: { id: "kit", name: "Starter kit", description: "Food, bed, toys for comfort", price: 30, selected: false },
  });

  const toggleOption = (key: keyof typeof bundle) => {
    setBundle(prev => ({ ...prev, [key]: { ...prev[key], selected: !prev[key].selected } }));
  };

  const totalPrice = Object.values(bundle).reduce((sum, option) => sum + (option.selected ? option.price : 0), 0);

  const handleAdopt = () => {
    // Business logic: send adoption + bundle to backend
    console.log("Adoption submitted:", { petId, petName, bundle });
    alert(`You adopted ${petName}!\nTotal: €${totalPrice}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Adopt {petName} with Care Bundle</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-gray-700">
            Enhance {petName}'s adoption experience with optional care services and essentials.
          </p>

          {/* Bundle options */}
          {Object.entries(bundle).map(([key, option]) => (
            <div
              key={key}
              className="flex justify-between items-center border p-4 rounded-xl cursor-pointer hover:shadow-md transition"
              onClick={() => toggleOption(key as keyof typeof bundle)}
            >
              <div>
                <h3 className="font-semibold text-gray-900">{option.name}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-800 font-medium">€{option.price}</span>
                <input type="checkbox" checked={option.selected} readOnly className="w-5 h-5 accent-purple-600" />
              </div>
            </div>
          ))}

          {/* Total + Adopt Button */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="text-right font-semibold text-lg">
              Total: €{totalPrice}
            </div>
            <button
              onClick={handleAdopt}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition shadow-lg"
            >
              Confirm Adoption
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptBundleModal;