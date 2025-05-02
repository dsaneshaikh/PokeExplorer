// src/pages/HomePage.jsx
import { usePokemon } from "../contexts/PokemonContext";
import PokemonFilters from "../components/features/Filter/PokemonFilters";
import PokemonCard from "../components/features/Pokemon/PokemonCard";
import { useMemo } from "react";
const HomePage = () => {
  const {
    pokemonList,
    loading,
    error,
    searchTerm,
    selectedTypes,
    sortBy,
    itemsPerPage,
    currentPage,
    setSearchTerm,
    setSelectedTypes,
    setSortBy,
    setItemsPerPage,
    setCurrentPage,
  } = usePokemon();

  const filteredList = useMemo(() => {
    return pokemonList
      .filter((pokemon) => {
        const matchesSearch = pokemon.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesTypes =
          selectedTypes.length === 0 ||
          selectedTypes.every((type) =>
            pokemon.types.some((t) => t.type.name === type)
          );
        return matchesSearch && matchesTypes;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return a.id - b.id;
      });
  }, [pokemonList, searchTerm, selectedTypes, sortBy]);

  const paginatedList = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredList, currentPage, itemsPerPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        Error loading Pokémon: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PokemonFilters />

      <div className="my-4 flex justify-between items-center">
        <span className="text-gray-600">
          Showing {paginatedList.length} of {filteredList.length} results
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredList.length}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
