import { useParams } from "react-router-dom";
import { usePokemon } from "../contexts/PokemonContext";
import { useMemo } from "react";

const DetailPage = () => {
  const { id } = useParams();
  const { pokemonList } = usePokemon();

  const pokemon = useMemo(
    () => pokemonList.find((p) => p.id === Number(id)),
    [id, pokemonList]
  );

  return (
    <div className="detail-container">
      <h1>{pokemon.name}</h1>
      <div className="stats-grid">
        {pokemon.stats.map((stat) => (
          <div key={stat.stat.name} className="stat-item">
            <span>{stat.stat.name}</span>
            <progress value={stat.base_stat} max="255" />
            <span>{stat.base_stat}</span>
          </div>
        ))}
      </div>
      <h3>Abilities</h3>
      <div className="abilities">
        {pokemon.abilities.map((ability) => (
          <span key={ability.ability.name}>{ability.ability.name}</span>
        ))}
      </div>
    </div>
  );
};

export default DetailPage;
