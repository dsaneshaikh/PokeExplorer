// src/hooks/useRandomPokemon.js
import { useNavigate } from "react-router-dom";
import { getRandomPokemonId } from "../utils/pokemon";

export const useRandomPokemon = () => {
  const navigate = useNavigate();

  const getRandomPokemon = () => {
    const randomId = getRandomPokemonId();
    navigate(`/pokemon/${randomId}`);
  };

  return { getRandomPokemon };
};
