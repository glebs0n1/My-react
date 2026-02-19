import { mapAnimalSize } from "../../utils/sizeMapper";
import React from "react";
import { Link } from "react-router-dom";
import LikeButton from "../Like/LikeButton";
import { MapPin, Heart, Calendar, User, Ruler } from "lucide-react";
import { Pet } from "../../types/Pet";

const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  const {
    slug,
    name,
    image,
    breed,
    age,
    gender,
    size,
    foundOnStreet,
    city,
    traits = [],
  } = pet;

  // 🔴 Kritinė apsauga
  if (!slug) {
    console.warn("PetCard: missing slug", pet);
    return null;
  }

  return (
    <Link to={`/pet/${slug}`} className="block h-full group">
      <article className="relative flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

        {/* IMAGE */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
          {foundOnStreet && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                <Heart className="w-3 h-3 fill-white" />
                Rescued
              </span>
            </div>
          )}

          <LikeButton
            item={pet}
            className="absolute top-3 right-3 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg z-10 hover:scale-110 transition-all"
          />

          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute inset-x-0 bottom-0 p-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-2xl font-bold text-white drop-shadow-2xl mb-1">
              {name}
            </h3>
            {breed && (
              <p className="text-sm font-medium text-white/95 drop-shadow-lg">
                {breed}
              </p>
            )}
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1 flex flex-col p-4 bg-white">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
              {name}
            </h3>
            {breed && (
              <p className="text-sm text-gray-600 line-clamp-1">
                {breed}
              </p>
            )}
          </div>

          {city && (
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-purple-100 p-1.5 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 truncate">
                {city}
              </span>
            </div>
          )}

          {traits.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                Charakteris
              </p>
              <p className="text-xs text-gray-600 line-clamp-2">
                {traits[0]}
              </p>
            </div>
          )}

          {/* ATTRIBUTES */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <Info icon={<Calendar size={16} />} label="Amžius" value={age || "?"} />
            <Info icon={<User size={16} />} label="Lytis" value={gender || "?"} />
            <Info
              icon={<Ruler size={16} />}
              label="Dydis"
              value={mapAnimalSize(size)}
            />
          </div>
        </div>

        {/* HOVER RING */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </article>
    </Link>
  );
};

const Info: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 flex-1">
    <div className="bg-gray-50 p-2 rounded-lg text-purple-600">
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-gray-500 font-semibold uppercase">
        {label}
      </p>
      <p className="text-xs font-bold text-gray-900">
        {value}
      </p>
    </div>
  </div>
);

export default PetCard;