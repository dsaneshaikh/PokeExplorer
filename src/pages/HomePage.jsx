// src/pages/HomePage.jsx
import { usePokemon } from "../contexts/PokemonContext";
import PokemonFilters from "../components/features/Filter/PokemonFilters";
import PokemonCard from "../Components/features/Pokemon/PokemonCard";
import { useMemo } from "react";
import LoadingSpinner from "../Components/common/LoadingSpinner";

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

  // Ensure selectedTypes is always an array
  const types = Array.isArray(selectedTypes) ? selectedTypes : [];

  const filteredList = useMemo(() => {
    return pokemonList
      .filter((pokemon) => {
        const matchesSearch = pokemon.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesTypes =
          types.length === 0 ||
          types.every((type) =>
            pokemon.types.some((t) => t.type.name === type)
          );
        return matchesSearch && matchesTypes;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return a.id - b.id;
      });
  }, [pokemonList, searchTerm, types, sortBy]);

  const paginatedList = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredList, currentPage, itemsPerPage]);

  // Calculate display indices
  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage + 1,
    [currentPage, itemsPerPage]
  );

  const endIndex = useMemo(
    () => Math.min(currentPage * itemsPerPage, filteredList.length),
    [currentPage, itemsPerPage, filteredList.length]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mx-4 mt-4">
        Error loading Pokémon: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PokemonFilters />

      <div className="my-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600">
          {filteredList.length === 0 ? (
            "No results found"
          ) : (
            <>
              Showing <span className="font-medium">{startIndex}</span> -{" "}
              <span className="font-medium">{endIndex}</span> of{" "}
              <span className="font-medium">{filteredList.length}</span> results
            </>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= filteredList.length}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:hover:bg-red-500 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">
            No Pokémon found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
