// src/components/features/Pokemon/PokemonCard.jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../../../contexts/FavoritesContext";

// Add typeColors definition here
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

const PokemonCard = ({ pokemon }) => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <span className="text-gray-500 text-sm font-medium">
            #{pokemon.id.toString().padStart(3, "0")}
          </span>
          <button
            onClick={() => toggleFavorite(pokemon.id)}
            className="text-red-500 hover:text-red-600"
          >
            {favorites.includes(pokemon.id) ? "❤️" : "🤍"}
          </button>
        </div>

        <Link to={`/pokemon/${pokemon.id}`}>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-full h-48 object-contain mb-4"
          />

          <h3 className="text-lg font-semibold text-gray-800 capitalize mb-2">
            {pokemon.name}
          </h3>

          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: typeColors[type.type.name] }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PokemonCard;
