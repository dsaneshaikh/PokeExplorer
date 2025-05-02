// src/pages/FavoritesPage.jsx
import { useFavorites } from "../contexts/FavoritesContext";
import { usePokemon } from "../contexts/PokemonContext";
import PokemonCard from "../Components/features/Pokemon/PokemonCard";
import LoadingSpinner from "../Components/common/LoadingSpinner";
import { useMemo } from "react";
const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { pokemonList, loading, error } = usePokemon();

  const favoritePokemon = useMemo(
    () => pokemonList.filter((p) => favorites.includes(p.id)),
    [pokemonList, favorites]
  );

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="text-red-500 text-center p-4">
        Error loading Pokémon: {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Favorite Pokémon</h2>

      {favoritePokemon.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No favorites yet. Click the ♡ on Pokémon cards to add some!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoritePokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
