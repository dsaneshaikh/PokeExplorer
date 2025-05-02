import React from "react";

const allTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export default function SearchControls({
  searchTerm,
  setSearchTerm,
  selectedTypes,
  setSelectedTypes,
  sortBy,
  setSortBy,
  itemsPerPage,
  setItemsPerPage,
  handleRandom,
  resetFilters,
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Type Filter */}
        <select
          multiple
          value={selectedTypes}
          onChange={(e) =>
            setSelectedTypes(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="h-[120px] min-w-[120px] px-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="sortBy" className="text-sm mb-1">
            Sort by:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 py-1 border rounded-md shadow-sm"
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Items Per Page Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="perPage" className="text-sm mb-1">
            Per page:
          </label>
          <select
            id="perPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-2 py-1 border rounded-md shadow-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button
            onClick={handleRandom}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Random Pokémon
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
