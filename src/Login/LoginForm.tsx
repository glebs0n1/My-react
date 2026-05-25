import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface LoginFormProps {
  onClose?: () => void;
  onSuccess?: (user: { email: string }) => void;
  switchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSuccess, switchToRegister }) => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  /* ---------- VALIDATION ---------- */
  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!email) e.email = "Vartotojo vardas arba el. paštas yra privalomas";
    
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Neteisingas el. pašto adresas";

    if (!password) e.password = "Reikia nurodyti slaptažodį";
    else if (password.length < 6) e.password = "Mažiausiai 6 simboliai";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------- FORM SUBMIT ---------- */
  const handleSubmit = async () => {
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      // Call the actual login function from AuthContext
      const userData = await login(email, password);
      
      // Show success toast
      setShowSuccessToast(true);
      
      // Wait a moment to show the toast, then close
      setTimeout(() => {
        onSuccess?.({ email: userData.email });
        onClose?.();
      }, 1500);
      
    } catch (err: any) {
      setServerError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
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
          <span className="font-medium">Logged in successfully!</span>
        </div>
      )}
      
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
      )}

      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Prisijungtik</h2>
      <p className="text-center text-sm text-gray-600 mb-8">
      Norėdami prisijungti, įveskite savo el. pašto adresą ir slaptažodį:


      </p>

      <div className="space-y-5">

        {/* ---------- EMAIL ---------- */}
        <div>
          <input
            type="email"
            placeholder="El. paštas"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`w-full rounded-xl border px-4 py-3 transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        {/* ---------- PASSWORD WITH TOGGLE ---------- */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Slaptažodis"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`w-full rounded-xl border px-4 py-3 pr-12 transition-all ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
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
          {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
        </div>

        {/* ---------- SERVER ERROR ---------- */}
        {serverError && (
          <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-2 border border-red-200">
            {serverError}
          </div>
        )}

        {/* ---------- SUBMIT ---------- */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Prisijungti"}
        </button>
      </div>

      {/* ---------- SWITCH TO REGISTER ---------- */}
      {switchToRegister && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Neturite paskyros? {" "}
          <button
            onClick={switchToRegister}
            className="font-semibold text-purple-600 hover:underline transition-colors"
          >
            Užsiregistruoti
          </button>
        </div>
      )}

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

export default LoginForm;