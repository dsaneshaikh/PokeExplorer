// src/contexts/PokemonContext.jsx
import { createContext, useContext, useMemo, useState, useEffect } from "react";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [state, setState] = useState({
    pokemonList: [],
    searchTerm: "",
    selectedTypes: [],
    sortBy: "id",
    itemsPerPage: 20,
    currentPage: 1,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Fetch basic list of first 150 Pokémon
        const listResponse = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        const listData = await listResponse.json();

        // Fetch detailed data in batches
        const batchSize = 20;
        const detailedPokemon = [];

        for (let i = 0; i < listData.results.length; i += batchSize) {
          const batch = listData.results.slice(i, i + batchSize);
          const batchRequests = batch.map((p) =>
            fetch(p.url).then((res) => res.json())
          );
          const batchResults = await Promise.all(batchRequests);
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
          error: error.message,
        }));
      }
    };

    fetchPokemonData();
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setSearchTerm: (term) =>
        setState((prev) => ({ ...prev, searchTerm: term })),
      setSelectedTypes: (types) =>
        setState((prev) => ({ ...prev, selectedTypes: types })),
      setSortBy: (sort) => setState((prev) => ({ ...prev, sortBy: sort })),
      setItemsPerPage: (size) =>
        setState((prev) => ({ ...prev, itemsPerPage: size })),
      setCurrentPage: (page) =>
        setState((prev) => ({ ...prev, currentPage: page })),
    }),
    [state]
  );

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
}

export const usePokemon = () => useContext(PokemonContext);
