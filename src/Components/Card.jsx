import React from "react";

// Type-to-color mapping
const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
};

export default function Card({ id, name, sprite, types }) {
  return (
    <div className="w-full max-w-xs bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center hover:shadow-lg transition duration-300 relative">
      {/* ID */}
      <div className="absolute top-2 right-4 text-gray-400 font-semibold text-sm">
        #{String(id).padStart(3, "0")}
      </div>

      {/*Image Background */}
      <div className="relative mb-4 flex justify-center items-center h-32">
        <div className="absolute w-32 h-16 bg-gray-100 rounded-full blur-sm"></div>
        <img
          src={sprite}
          alt={name}
          className="relative z-10 w-28 h-28 object-contain"
        />
      </div>

      {/* Name */}
      <h2 className="text-2xl font-bold capitalize text-gray-900">{name}</h2>

      {/* Type */}
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        {types.map((type) => (
          <span
            key={type}
            className="px-8 py-3 text-sm font-medium text-white rounded-full shadow-sm"
            style={{
              backgroundColor: typeColors[type],
              letterSpacing: "0.5px",
              padding: "0.4rem 0.5rem",
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
