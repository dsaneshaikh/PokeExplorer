// src/components/features/Pokemon/StatBar.jsx
const StatBar = ({ stats }) => {
  const statNames = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };

  return (
    <div className="space-y-2">
      {stats.map((stat) => (
        <div key={stat.stat.name} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="capitalize">
              {statNames[stat.stat.name] || stat.stat.name}
            </span>
            <span className="font-medium">{stat.base_stat}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${(stat.base_stat / 255) * 100}%` }}
              role="progressbar"
              aria-valuenow={stat.base_stat}
              aria-valuemin="0"
              aria-valuemax="255"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatBar;
