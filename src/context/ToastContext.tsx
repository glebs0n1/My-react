// src/context/ToastContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'login-prompt';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  showLoginPrompt: (onLogin: () => void, onRegister: () => void) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 4000);
    }
  }, [removeToast]);

  const showSuccess = useCallback((message: string, duration = 3000) => {
    addToast({ type: 'success', message, duration });
  }, [addToast]);

  const showError = useCallback((message: string, duration = 4000) => {
    addToast({ type: 'error', message, duration });
  }, [addToast]);

  const showWarning = useCallback((message: string, duration = 4000) => {
    addToast({ type: 'warning', message, duration });
  }, [addToast]);

  const showInfo = useCallback((message: string, duration = 3000) => {
    addToast({ type: 'info', message, duration });
  }, [addToast]);

  const showLoginPrompt = useCallback((onLogin: () => void, onRegister: () => void) => {
    addToast({
      type: 'login-prompt',
      message: 'Norėdami išsaugoti mėgstamiausius',
      duration: 0, // Don't auto-dismiss
      action: {
        label: 'Prisijungti',
        onClick: onLogin,
      },
      secondaryAction: {
        label: 'Užsiregistruoti',
        onClick: onRegister,
      },
    });
  }, [addToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showLoginPrompt,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};