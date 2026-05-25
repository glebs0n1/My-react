// src/Components/Toast/ToastItem.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  X,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Heart,
} from "lucide-react";

import { Toast, useToast } from "../../context/ToastContext";

interface ToastItemProps {
  toast: Toast;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const { removeToast } = useToast();
  const [isExiting, setIsExiting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => removeToast(toast.id), 300);
  };

  const handleAction = (action: () => void) => {
    action();
    handleClose();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    // Defer one tick so the click that opened the toast doesn't close it.
    const timer = window.setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const styles = {
    success: {
      bg: "bg-green-50 border-green-200",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      iconBg: "bg-green-100",
      text: "text-green-900",
      subtext: "text-green-700",
    },
    error: {
      bg: "bg-red-50 border-red-200",
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
      iconBg: "bg-red-100",
      text: "text-red-900",
      subtext: "text-red-700",
    },
    warning: {
      bg: "bg-amber-50 border-amber-200",
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      iconBg: "bg-amber-100",
      text: "text-amber-900",
      subtext: "text-amber-700",
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      icon: <Info className="w-5 h-5 text-blue-600" />,
      iconBg: "bg-blue-100",
      text: "text-blue-900",
      subtext: "text-blue-700",
    },
    "login-prompt": {
      bg: "bg-purple-50 border-purple-200",
      icon: <Heart className="w-5 h-5 text-purple-600" />,
      iconBg: "bg-purple-100",
      text: "text-purple-900",
      subtext: "text-purple-700",
    },
  }[toast.type];

  return (
    <div
      ref={ref}
      className={`
        pointer-events-auto border rounded-xl shadow-lg p-4
        transform transition-all duration-300
        ${styles.bg}
        ${isExiting ? "-translate-y-6 opacity-0" : "opacity-100"}
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`${styles.iconBg} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}
        >
          {styles.icon}
        </div>

        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm ${styles.text}`}>
            {toast.message}
          </p>

          {toast.type === "login-prompt" && (
            <p className={`text-xs mt-1 ${styles.subtext}`}>
              Prisijunkite arba užsiregistruokite
            </p>
          )}

          {(toast.action || toast.secondaryAction) && (
            <div className="flex gap-2 mt-3">
              {toast.action && (
                <button
                  onClick={() => handleAction(toast.action!.onClick)}
                  className="flex-1 bg-purple-600 text-white rounded-lg py-1.5 text-sm font-semibold"
                >
                  {toast.action.label}
                </button>
              )}
              {toast.secondaryAction && (
                <button
                  onClick={() =>
                    handleAction(toast.secondaryAction!.onClick)
                  }
                  className="flex-1 border-2 border-purple-600 text-purple-600 rounded-lg py-1.5 text-sm font-semibold"
                >
                  {toast.secondaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleClose}
          aria-label="Uždaryti"
          className="shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ToastItem;