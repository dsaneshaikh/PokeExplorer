import { useState, useEffect } from "react";
import Card from "./Components/Card";
import SearchFilter from "./Components/SearchFilter";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
        if (!res.ok) throw new Error("Failed to fetch Pokémon");
        const { results } = await res.json();
        const detailed = await Promise.all(
          results.map((p) => fetch(p.url).then((r) => r.json()))
        );
        setPokemonList(detailed);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  // Filter the list based on search and type
  const filteredList = pokemonList.filter((p) => {
    const matchesName = p.name.includes(searchTerm.toLowerCase());
    const matchesType =
      !selectedType || p.types.some((t) => t.type.name === selectedType);
    return matchesName && matchesType;
  });

  // Update total pages whenever filtered list changes
  useEffect(() => {
    if (!loading) {
      setTotalPages(Math.ceil(filteredList.length / itemsPerPage));
      setCurrentPage(1);
    }
  }, [selectedType, searchTerm, loading]);

  // Slice current page data
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen bg-[#e0f7fa] text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-[#ef4444] border-b border-gray-200 py-5 shadow-sm">
        <h1 className="text-center text-3xl font-semibold text-white">
          PokéExplorer
        </h1>
        <p className="text-center text-sm text-gray-100 mt-1">
          Browse the original 150 Pokémon
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search & Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {/* States */}
        {loading && (
          <div className="text-center text-gray-600 text-sm">
            Loading Pokémon…
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 font-medium">
            Error: {error}
          </div>
        )}
        {!loading && !error && filteredList.length === 0 && (
          <div className="text-center text-gray-500 text-sm">
            No Pokémon found.
          </div>
        )}

        {/* Pokémons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {paginatedList.map((p) => (
            <Card
              key={p.id}
              id={p.id}
              name={p.name}
              sprite={
                p.sprites.other.dream_world.front_default ||
                p.sprites.front_default
              }
              types={p.types.map((t) => t.type.name)}
              height={p.height}
              weight={p.weight}
              speed={p.stats.find((s) => s.stat.name === "speed")?.base_stat}
              experience={p.base_experience}
              attack={p.stats.find((s) => s.stat.name === "attack")?.base_stat}
              ability={p.abilities[0]?.ability.name}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#ef4444] text-white rounded-lg disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="self-center text-gray-700">
            {totalPages === 0
              ? "No pages"
              : `Page ${currentPage} of ${totalPages}`}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#ef4444] text-white rounded-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
