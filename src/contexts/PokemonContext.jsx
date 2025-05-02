// src/contexts/PokemonContext.jsx
import { createContext, useContext, useMemo, useState, useEffect } from "react";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [state, setState] = useState({
    pokemonList: [],
    searchTerm: "",
    selectedTypes: [], // Ensured array initialization
    sortBy: "id",
    itemsPerPage: 20,
    currentPage: 1,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // First fetch the list of Pokémon
        const listResponse = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        if (!listResponse.ok) throw new Error("Failed to fetch Pokémon list");
        const listData = await listResponse.json();

        // Fetch detailed data in batches to avoid rate limiting
        const batchSize = 20;
        const detailedPokemon = [];

        for (let i = 0; i < listData.results.length; i += batchSize) {
          const batch = listData.results.slice(i, i + batchSize);
          const batchPromises = batch.map((p) =>
            fetch(p.url).then((res) => {
              if (!res.ok) throw new Error("Failed to fetch Pokémon details");
              return res.json();
            })
          );

          const batchResults = await Promise.all(batchPromises);
          detailedPokemon.push(...batchResults);
        }

        setState((prev) => ({
          ...prev,
          pokemonList: detailedPokemon,
          loading: false,
          error: null,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error.message || "Failed to load Pokémon data",
        }));
      }
    };

    fetchPokemonData();
  }, []);

  const value = useMemo(
    () => ({
      // State values
      ...state,

      // State setters with validation
      setSearchTerm: (term) =>
        setState((prev) => ({
          ...prev,
          searchTerm: typeof term === "string" ? term : "",
        })),

      setSelectedTypes: (types) =>
        setState((prev) => ({
          ...prev,
          selectedTypes: Array.isArray(types) ? types : [],
        })),

      setSortBy: (sort) =>
        setState((prev) => ({
          ...prev,
          sortBy: ["id", "name"].includes(sort) ? sort : "id",
        })),

      setItemsPerPage: (size) =>
        setState((prev) => ({
          ...prev,
          itemsPerPage:
            Number.isInteger(size) && [10, 20, 50].includes(size) ? size : 20,
        })),

      setCurrentPage: (page) =>
        setState((prev) => ({
          ...prev,
          currentPage: Number.isInteger(page) && page > 0 ? page : 1,
        })),
    }),
    [state]
  );

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
}

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};
