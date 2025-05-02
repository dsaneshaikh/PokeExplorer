// src/utils/api.js
const BASE_URL = "https://pokeapi.co/api/v2";

// Generic fetch helper with error handling
async function fetchFromApi(endpoint) {
  const res = await fetch(`${BASE_URL}/${endpoint}`);
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Get paginated list of Pokémon (with optional pagination and filtering)
export async function getPokemonList({
  limit = 20,
  offset = 0,
  types = [],
  name = "",
} = {}) {
  // If filtering by type, fetch each type’s list then intersect
  if (types.length > 0) {
    // fetch all matching types, collect unique IDs, then page/filter by name
    const typeResults = await Promise.all(
      types.map((t) => fetchFromApi(`type/${t}`))
    );
    const allPokemon = typeResults
      .flatMap((tr) => tr.pokemon.map((p) => p.pokemon))
      .reduce((acc, p) => {
        acc[p.name] = p.url;
        return acc;
      }, {});
    const filtered = Object.entries(allPokemon).filter(([nameKey]) =>
      nameKey.includes(name.toLowerCase())
    );
    const paged = filtered.slice(offset, offset + limit);
    return {
      count: filtered.length,
      results: paged.map(([name, url]) => ({ name, url })),
    };
  }

  // No type filtering: use the standard listing endpoint
  return fetchFromApi(`pokemon?limit=${limit}&offset=${offset}`);
}

// Fetch full details for one Pokémon by name or ID
export async function getPokemonDetail(idOrName) {
  return fetchFromApi(`pokemon/${idOrName}`);
}

// Fetch evolution chain given a Pokémon-species URL
export async function getEvolutionChain(speciesUrl) {
  const species = await fetchFromApi(speciesUrl.replace(BASE_URL + "/", ""));
  if (!species.evolution_chain?.url) return null;
  const chainData = await fetchFromApi(
    species.evolution_chain.url.replace(BASE_URL + "/", "")
  );
  return chainData.chain;
}

// Helper to flatten the evolution chain into an array of species names
export function parseEvolutionChain(chain, accum = []) {
  accum.push(chain.species.name);
  if (chain.evolves_to.length > 0) {
    // handle only first branch for simplicity, or iterate all branches
    chain.evolves_to.forEach((next) => parseEvolutionChain(next, accum));
  }
  return accum;
}
