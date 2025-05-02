// src/features/pokemon/components/EvolutionChain.jsx
import { useQuery } from "@tanstack/react-query";
import { animated, useSpring } from "@react-spring/web";

const fetchEvolutionChain = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
  if (!res.ok) throw new Error("Failed to fetch evolution chain");
  return res.json();
};

const EvolutionChain = ({ pokemonId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["evolution", pokemonId],
    queryFn: () => fetchEvolutionChain(pokemonId),
    staleTime: Infinity,
  });
  const springs = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 300, friction: 20 },
  });

  const renderChain = (chain) => {
    if (!chain) return null;
    return (
      <animated.div
        style={springs}
        className="flex items-center justify-center gap-4"
      >
        <div className="text-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              chain.species.url.split("/")[6]
            }.png`}
            alt={chain.species.name}
            className="mx-auto w-20 h-20"
          />
          <p className="capitalize">{chain.species.name}</p>
        </div>
        {chain.evolves_to.map((evo, i) => (
          <div key={i} className="flex items-center">
            <span className="mx-4">→</span>
            {renderChain(evo)}
          </div>
        ))}
      </animated.div>
    );
  };

  if (isLoading)
    return <div className="animate-pulse h-24 bg-gray-100 rounded" />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <section aria-labelledby="evolution-chain-heading" className="mt-8">
      <h2 id="evolution-chain-heading" className="text-xl font-bold mb-4">
        Evolution Chain
      </h2>
      {renderChain(data?.chain)}
    </section>
  );
};

export default EvolutionChain;
