import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLikes } from "./LikesContext";
import { Heart } from "lucide-react";

const LikeButton = ({
  item,
  className = "",
  iconSize = 20,
  showLabel = false,
  labelInactive = "Pridėti prie mėgstamiausių",
  labelActive = "Pridėta prie mėgstamiausių",
}) => {
  const { toggleLike, isLiked, isAuthenticated } = useLikes();
  const liked = isLiked(item.id);
  const [justClicked, setJustClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 600);

    toggleLike(item);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={liked ? "Pašalinti iš mėgstamiausių" : "Pridėti prie mėgstamiausių"}
      aria-pressed={liked}
      className={`
        relative inline-flex items-center justify-center
        transition-all duration-200
        active:scale-95
        ${justClicked && !isAuthenticated ? "animate-shake" : ""}
        ${justClicked && liked ? "animate-bounce" : ""}
        ${className}
      `}
    >
      <Heart
        size={iconSize}
        className={`
          transition-all duration-200
          ${liked ? "fill-red-500 stroke-red-500" : "fill-none stroke-current hover:stroke-red-500"}
        `}
      />

      {showLabel && (
        <span className="ml-2 font-semibold">
          {liked ? labelActive : labelInactive}
        </span>
      )}

      {justClicked && liked && (
        <>
          <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30 pointer-events-none" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
            <span className="text-xs font-semibold text-red-500 animate-fade-up">
              Pridėta! 💜
            </span>
          </div>
        </>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px) rotate(-5deg); }
          20%, 40%, 60%, 80% { transform: translateX(3px) rotate(5deg); }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 1; transform: translateY(-5px); }
          100% { opacity: 0; transform: translateY(-15px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-fade-up { animation: fade-up 1s ease-out; }
      `}</style>
    </button>
  );
};

LikeButton.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  className: PropTypes.string,
  iconSize: PropTypes.number,
  showLabel: PropTypes.bool,
  labelInactive: PropTypes.string,
  labelActive: PropTypes.string,
};

export default LikeButton;
