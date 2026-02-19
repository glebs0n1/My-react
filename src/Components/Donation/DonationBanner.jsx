import React from "react";
import PropTypes from "prop-types";

const DonationBanner = ({ image, title, text, cta, onClick }) => {
  return (
    <div className="relative overflow-hidden max-w-[860px] mx-auto my-20 rounded-2xl bg-white shadow-lg px-6 py-12 flex items-center">
      
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          className="hidden sm:block absolute bottom-0 left-0 w-[220px] object-contain"
        />
      )}

      <div className="relative z-10 w-full sm:ml-[240px] flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#6200EE]">
          {title}
        </h2>

        <p className="mt-4 mb-6 text-gray-700 text-base md:text-lg max-w-xl">
          {text}
        </p>

        <button
          onClick={onClick}
          className="
            inline-flex items-center justify-center
            px-8 py-3
            rounded-full
            bg-[#6200EE]
            text-white font-semibold
            transition
            hover:bg-[#5300d6]
            active:scale-95
          "
        >
          {cta}
        </button>
      </div>
    </div>
  );
};

DonationBanner.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DonationBanner;