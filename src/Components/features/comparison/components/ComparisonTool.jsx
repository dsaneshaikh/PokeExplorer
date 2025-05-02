// src/features/comparison/components/ComparisonTool.jsx
import { useState } from "react";
import { usePokemon } from "../../../contexts/PokemonContext";
import StatRadarChart from "./StatRadarChart";

const ComparisonTool = () => {
  const { pokemonList } = usePokemon();
  const [selected, setSelected] = useState([null, null]);

  const handleCompare = (index, pokemon) => {
    const newSelection = [...selected];
    newSelection[index] = pokemon;
    setSelected(newSelection);
  };

  return (
    <div
      className="space-y-8"
      role="region"
      aria-labelledby="comparison-heading"
    >
      <h1 id="comparison-heading" className="text-2xl font-bold">
        Compare Pokémon
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        {[0, 1].map((index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <label className="block text-sm font-medium mb-2">
              Pokémon {index + 1}
            </label>
            <select
              value={selected[index]?.id || ""}
              onChange={(e) =>
                handleCompare(
                  index,
                  pokemonList.find((p) => p.id === Number(e.target.value))
                )
              }
              className="w-full px-4 py-2 border rounded-lg"
              aria-label={`Select Pokémon ${index + 1}`}
            >
              <option value="">Choose a Pokémon</option>
              {pokemonList.map((p) => (
                <option key={p.id} value={p.id}>
                  #{p.id} - {p.name}
                </option>
              ))}
            </select>

            {selected[index] && (
              <div className="mt-4">
                <StatRadarChart
                  stats={selected[index].stats}
                  name={selected[index].name}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {selected.every((p) => p) && (
        <section aria-labelledby="comparison-summary">
          <h2 id="comparison-summary" className="text-xl font-bold mb-4">
            Summary
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {selected.map((p, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <ul className="mt-2 space-y-1">
                  {p.stats.map((stat) => (
                    <li key={stat.stat.name} className="flex justify-between">
                      <span className="capitalize">{stat.stat.name}</span>
                      <span>{stat.base_stat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ComparisonTool;
