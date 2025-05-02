// src/pages/ComparePage.jsx
import { useState } from "react";
import { usePokemon } from "../contexts/PokemonContext";
import PokemonCard from "../Components/features/Pokemon/PokemonCard";
import TypeBadge from "../Components/common/TypeBadge";

const ComparePage = () => {
  const { pokemonList } = usePokemon();
  const [selectedPokemon, setSelectedPokemon] = useState([null, null]);

  const handleSelectPokemon = (index, pokemon) => {
    const newSelection = [...selectedPokemon];
    newSelection[index] = pokemon;
    setSelectedPokemon(newSelection);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Compare Pokémon</h2>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[0, 1].map((index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pokémon {index + 1}
              </label>
              <select
                value={selectedPokemon[index]?.id || ""}
                onChange={(e) => {
                  const pokemon = pokemonList.find(
                    (p) => p.id === Number(e.target.value)
                  );
                  handleSelectPokemon(index, pokemon);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select a Pokémon</option>
                {pokemonList.map((p) => (
                  <option key={p.id} value={p.id}>
                    #{p.id.toString().padStart(3, "0")} - {p.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {selectedPokemon.some((p) => p) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedPokemon.map((pokemon, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                {pokemon ? (
                  <>
                    <PokemonCard pokemon={pokemon} />
                    <div className="mt-4 space-y-2">
                      <h3 className="text-lg font-semibold">Stats</h3>
                      {pokemon.stats.map((stat) => (
                        <div
                          key={stat.stat.name}
                          className="flex justify-between"
                        >
                          <span className="capitalize">{stat.stat.name}</span>
                          <span>{stat.base_stat}</span>
                        </div>
                      ))}
                      <div className="flex justify-between">
                        <span>Height</span>
                        <span>{pokemon.height / 10}m</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight</span>
                        <span>{pokemon.weight / 10}kg</span>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">
                          Abilities
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {pokemon.abilities.map((ability) => (
                            <span
                              key={ability.ability.name}
                              className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                            >
                              {ability.ability.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    Select a Pokémon to compare
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
