import React from "react";

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

const TypeBadge = ({ type }) => (
  <span
    className="px-2 py-1 text-xs font-medium rounded-full capitalize"
    style={{ backgroundColor: typeColors[type] }}
  >
    {type}
  </span>
);

export default TypeBadge;
