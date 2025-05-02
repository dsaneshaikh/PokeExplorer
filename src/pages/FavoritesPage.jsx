import { useFavorites } from "../contexts/FavoritesContext";
import { usePokemon } from "../contexts/PokemonContext";
import PokemonCard from "../components/features/Pokemon/PokemonCard";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { pokemonList } = usePokemon();

  const favoritePokemon = pokemonList.filter((p) => favorites.includes(p.id));

  return (
    <div className="favorites-page">
      <h2 className="text-2xl font-bold mb-4">Favorite Pokémon</h2>
      {favoritePokemon.length === 0 ? (
        <p className="text-gray-500">No favorites yet. Start adding some!</p>
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
