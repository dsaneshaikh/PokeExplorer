import React from "react";

export default function PokemonList({ pokemon }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
      {pokemon.map((p, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold capitalize">{p.name}</h3>
          {/* Add more Pokémon details here if available */}
        </div>
      ))}
    </div>
  );
}
