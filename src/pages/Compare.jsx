// src/pages/Compare.jsx
import React from "react";
import StatComparison from "../Components/StatComparison";

export default function Compare() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Compare Pokémon Stats</h1>
      <StatComparison />
    </div>
  );
}
