// src/components/features/Filter/PokemonFilters.jsx
import { usePokemon } from "../../../contexts/PokemonContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

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

const PokemonFilters = () => {
  const {
    searchTerm,
    selectedTypes,
    sortBy,
    itemsPerPage,
    setSearchTerm,
    setSelectedTypes,
    setSortBy,
    setItemsPerPage,
    setCurrentPage,
  } = usePokemon();

  const handleReset = () => {
    setSearchTerm("");
    setSelectedTypes([]);
    setSortBy("id");
    setItemsPerPage(20);
    setCurrentPage(1);
  };

  const removeType = (typeToRemove) => {
    setSelectedTypes((prev) => prev.filter((type) => type !== typeToRemove));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={handleReset}
          className="text-red-500 hover:text-red-600 flex items-center gap-1"
        >
          <XMarkIcon className="w-5 h-5" />
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Selected Types */}
        {selectedTypes.length > 0 && (
          <div className="sm:col-span-full lg:col-span-full space-y-2">
            <div className="flex flex-wrap gap-2">
              {selectedTypes.map((type) => (
                <span
                  key={type}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: typeColors[type] }}
                >
                  {type}
                  <button
                    onClick={() => removeType(type)}
                    className="hover:text-gray-200"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter Pokémon name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Types
          </label>
          <select
            multiple
            value={selectedTypes}
            onChange={(e) => {
              const selected = Array.from(
                e.target.selectedOptions,
                (o) => o.value
              );
              setSelectedTypes(selected);
            }}
            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 custom-scrollbar"
          >
            {Object.entries(typeColors).map(([type, color]) => (
              <option
                key={type}
                value={type}
                style={{ backgroundColor: color }}
                className="text-white px-3 py-1 m-1 rounded-full text-sm"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="id">Number</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Items Per Page */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Per Page
          </label>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PokemonFilters;
