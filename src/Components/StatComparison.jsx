// src/components/StatComparison.jsx
import React, { useState, useEffect, useMemo } from "react";
import { getPokemonList, getPokemonDetail } from "../utils/api";

export default function StatComparison() {
  const [allNames, setAllNames] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [firstData, setFirstData] = useState(null);
  const [secondData, setSecondData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch list of first 150 Pokémon names on mount
  useEffect(() => {
    let cancelled = false;
    async function fetchNames() {
      try {
        const { results } = await getPokemonList({ limit: 150, offset: 0 });
        if (!cancelled) {
          setAllNames(results.map((p) => p.name));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchNames();
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch details whenever either selection changes
  useEffect(() => {
    let cancelled = false;
    async function fetchBoth() {
      setError(null);
      setLoading(true);
      try {
        const [d1, d2] = await Promise.all([
          firstName ? getPokemonDetail(firstName) : Promise.resolve(null),
          secondName ? getPokemonDetail(secondName) : Promise.resolve(null),
        ]);
        if (!cancelled) {
          setFirstData(d1);
          setSecondData(d2);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchBoth();
    return () => {
      cancelled = true;
    };
  }, [firstName, secondName]);

  // Stats keys (ensure both have same stats ordering)
  const statKeys = useMemo(() => {
    return firstData
      ? firstData.stats.map((s) => s.stat.name)
      : secondData
      ? secondData.stats.map((s) => s.stat.name)
      : [];
  }, [firstData, secondData]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Compare Pokémon Stats</h2>

      {/* Selectors */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {["first", "second"].map((pos) => (
          <div key={pos} className="flex-1">
            <label className="block text-sm font-medium mb-1 capitalize">
              {pos} Pokémon
            </label>
            <select
              value={pos === "first" ? firstName : secondName}
              onChange={(e) =>
                pos === "first"
                  ? setFirstName(e.target.value)
                  : setSecondName(e.target.value)
              }
              className="w-full px-3 py-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#ef4444] focus:border-[#ef4444] text-sm"
            >
              <option value="">Select a Pokémon</option>
              {allNames.map((n) => (
                <option key={n} value={n}>
                  {n.charAt(0).toUpperCase() + n.slice(1)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Loading / Error States */}
      {loading && (
        <p className="text-center text-gray-600">Loading comparison…</p>
      )}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      {/* Comparison Table */}
      {!loading && !error && firstData && secondData && (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b"></th>
              <th className="px-4 py-2 border-b text-center capitalize">
                {firstData.name}
              </th>
              <th className="px-4 py-2 border-b text-center capitalize">
                {secondData.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {statKeys.map((key) => {
              const stat1 =
                firstData.stats.find((s) => s.stat.name === key)?.base_stat ||
                0;
              const stat2 =
                secondData.stats.find((s) => s.stat.name === key)?.base_stat ||
                0;
              return (
                <tr key={key}>
                  <td className="px-4 py-2 border-b capitalize">{key}</td>
                  <td className="px-4 py-2 border-b text-center">{stat1}</td>
                  <td className="px-4 py-2 border-b text-center">{stat2}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
