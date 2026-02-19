import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const RegisterForm = ({ onClose, onSuccess, switchToLogin }) => {
  const { register } = useAuth(); // Add this line to use AuthContext
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  /* ================= VALIDATION ================= */
  const validate = () => {
    const e = {};

    if (!username) {
      e.username = "Vardas yra privalomas";
    } else if (username.length < 3) {
      e.username = "Mažiausiai 3 simboliai";
    }

    if (!email) {
      e.email = "Reikia nurodyti el. pašto adresą";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "Neteisingas el. pašto formatast";
    }

    if (!password) {
      e.password = "Reikia nurodyti slaptažodį";
    } else if (password.length < 8) {
      e.password = "Minimum 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      e.password = "Turi būti didžiosios raidės, mažosios raidės ir skaičiai";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setServerError("");
  
    if (!validate()) return;
  
    setLoading(true);
    try {
      // Use the register function from AuthContext
      const userData = await register(username, email, password);
  
      // Show success toast
      setShowSuccessToast(true);
      
      // Wait a moment to show the toast, then close
      setTimeout(() => {
        onSuccess?.(userData.email || email);
        onClose?.();
      }, 1500);
      
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative rounded-2xl bg-white px-8 py-10 shadow-xl w-full">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-down">
          <CheckCircle size={20} />
          <span className="font-medium">Account created successfully!</span>
        </div>
      )}

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
        Užsiregistruoti
        </h2>
        <p className="mt-2 text-sm text-gray-600">
        Pradėkite savo kelionę su gyvūnais, kuriems jūs esate reikalingi!
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Vardas
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            placeholder="Jūsų vardas"
            className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.username
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-purple-200"
            }`}
          />
          {errors.username && (
            <p className="text-xs text-red-600">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">El. paštas
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            placeholder="you@email.com"
            className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.email
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-purple-200"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password with Eye Toggle */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">El. paštas
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              placeholder="Ne mažiau kaip 8 simboliai"
              className={`w-full rounded-xl border px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-purple-200"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Server error */}
        {serverError && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-xl bg-purple-600 py-3 text-base font-semibold text-white hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Creating account..." : "Kurti paskyrą"}
        </button>
      </div>

      {/* Swap to login */}
      <div className="mt-6 text-center text-sm text-gray-600">
      Jau turite paskyrą?{" "}
        <button
          onClick={switchToLogin}
          className="font-semibold text-purple-600 hover:underline transition-colors"
        >
           Prisijungti
        </button>
      </div>

      <p className="mt-6 text-center text-[11px] text-gray-400">
      Sukurdami paskyrą, jūs sutinkate su mūsų Sąlygos ir taisyklės ir Privatumo politika.
            </p>

      <style>{`
        @keyframes slide-down {
          from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RegisterForm;