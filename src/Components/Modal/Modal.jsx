import React from 'react';
import './Modal.css';

const Modal = ({ children, isOpen, onClose }) => {
  // If the modal is not open, return null to avoid rendering it
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // Close the modal when clicking outside the content
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
     
        {children}
      </div>
    </div>
  );
};

export default Modal;
