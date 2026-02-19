import React, { useState } from "react";
import { useLikes } from "./LikesContext";
import { Heart } from "lucide-react";

const LikeButton = ({ item, className = "" }) => {
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
      onClick={handleClick}
      aria-label={liked ? "Pašalinti iš mėgstamiausių" : "Pridėti prie mėgstamiausių"}
      className={`
        absolute top-3 right-3 z-10
        flex items-center justify-center
        w-10 h-10 rounded-full
        bg-white shadow-md
        transition-all duration-200
        hover:scale-110 hover:shadow-lg
        active:scale-95
        ${justClicked && !isAuthenticated ? 'animate-shake' : ''}
        ${justClicked && liked ? 'animate-bounce' : ''}
        ${className}
      `}
    >
      <Heart
        size={20}
        className={`
          transition-all duration-200
          ${liked 
            ? 'fill-red-500 stroke-red-500' 
            : 'fill-none stroke-gray-700 hover:stroke-red-500'
          }
        `}
      />
      
      {/* Papildomas efektas kai pridedama prie mėgstamiausių */}
      {justClicked && liked && (
        <>
          <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
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
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fade-up {
          animation: fade-up 1s ease-out;
        }
      `}</style>
    </button>
  );
};

export default LikeButton;