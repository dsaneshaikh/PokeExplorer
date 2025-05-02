import { useParams } from "react-router-dom";
import { usePokemon } from "../contexts/PokemonContext";
import { useMemo } from "react";

const DetailPage = () => {
  const { id } = useParams();
  const { pokemonList } = usePokemon();

  const pokemon = useMemo(
    () => pokemonList.find((p) => p.id === Number(id)),
    [id, pokemonList]
  );

  if (!pokemon)
    return <div className="p-4 text-red-600">Pokémon not found</div>;

  // Function to get type color classes
  const getTypeColor = (type) => {
    const colors = {
      fire: "bg-orange-500",
      water: "bg-blue-500",
      grass: "bg-green-500",
      electric: "bg-yellow-400",
      psychic: "bg-purple-500",
      normal: "bg-gray-400",
      fighting: "bg-red-700",
      flying: "bg-blue-300",
      poison: "bg-purple-600",
      ground: "bg-yellow-700",
      rock: "bg-yellow-800",
      bug: "bg-lime-600",
      ghost: "bg-purple-800",
      steel: "bg-gray-400",
      dragon: "bg-indigo-600",
      dark: "bg-gray-800",
      fairy: "bg-pink-400",
      ice: "bg-cyan-400",
    };
    return colors[type] || "bg-gray-500";
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-8 bg-gray-50 rounded-xl shadow-lg">
      {/* Pokémon Image */}
      <div className="flex justify-center mb-6">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
          className="w-64 h-64 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
        />
      </div>

      {/* Name and Types */}
      <h1 className="text-4xl font-bold text-center capitalize mb-4 drop-shadow-md">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-500">
          {pokemon.name}
        </span>
      </h1>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {pokemon.types?.map((type) => (
          <span
            key={type.type.name}
            className={`${getTypeColor(
              type.type.name
            )} text-white px-4 py-2 rounded-full text-sm font-medium capitalize shadow-md`}
          >
            {type.type.name}
          </span>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {pokemon.stats.map((stat) => (
          <div
            key={stat.stat.name}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium capitalize">
                {stat.stat.name}
              </span>
              <span className="text-red-600 font-semibold">
                {stat.base_stat}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-300"
                style={{ width: `${(stat.base_stat / 255) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Abilities Section */}
      <h3 className="text-2xl text-gray-700 text-center my-6">Abilities</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {pokemon.abilities.map((ability) => (
          <span
            key={ability.ability.name}
            className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium capitalize shadow-md"
          >
            {ability.ability.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DetailPage;
