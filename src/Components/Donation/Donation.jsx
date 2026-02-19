import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import DonateModal from "../Donation/DonateModal";

import { 
  Heart, 
} from "lucide-react";

const Donation = ({ image, title, text, cta }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden max-w-[1400px] mx-auto my-20 rounded-3xl shadow-2xl">
        {/* Background Image with Dark Overlay */}
        <div className="relative h-[400px] sm:h-[450px] md:h-[500px]">
          <img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Dark gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          
          {/* Content Container */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
              <div className="max-w-2xl">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[white] mt-0.5 flex-shrink-0" />
                    Parama
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {title}
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed max-w-xl">
                  {text}
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => setOpen(true)}
                  className="
                    inline-flex items-center gap-2
                    px-8 py-4
                    rounded-full
                    bg-amber-500
                    text-white font-semibold text-lg
                    hover:bg-amber-600
                    shadow-xl hover:shadow-2xl
                    transition-all
                    transform hover:scale-105
                  "
                >
                   <Heart className="w-4 h-4 text-[white] mt-0.5 flex-shrink-0" />
                  {cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donate Popup */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <DonateModal onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
};

Donation.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
};

export default Donation;