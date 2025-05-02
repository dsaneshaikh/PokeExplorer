// src/pages/RandomPage.jsx
import { useRandomPokemon } from "../hooks/useRandomPokemon";
import PokemonCard from "../Components/features/Pokemon/PokemonCard";
import StatBar from "../Components/features/Pokemon/StatBar";
import TypeBadge from "../Components/common/TypeBadge";
import LoadingSpinner from "../Components/common/LoadingSpinner";

const RandomPage = () => {
  const { randomPokemon, getRandomPokemon, loading } = useRandomPokemon();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Random Pokémon Generator</h1>
          <button
            onClick={getRandomPokemon}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Generate New
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : randomPokemon ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PokemonCard pokemon={randomPokemon} />
            <div className="space-y-4">
              <StatBar stats={randomPokemon.stats} />
              <div className="flex flex-wrap gap-2">
                {randomPokemon.types.map((type) => (
                  <TypeBadge key={type.type.name} type={type.type.name} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Click the button to generate a random Pokémon!
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomPage;
