// src/Components/Toast/ToastContainer.tsx
import React from 'react';

import { Toast, useToast } from '../../context/ToastContext'; 
import ToastItem from '../Toast/ToastItem';

const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-md px-4 pointer-events-none">
      <div className="flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;