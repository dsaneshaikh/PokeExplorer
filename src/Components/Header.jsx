// src/components/Header.jsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-red-600 shadow-sm h-25 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo container */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/pokemon-icon.png" className="h-10 w-10" alt="PokéBall" />
          </Link>

          {/* Centered title */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-white text-4xl font-bold tracking-tight text-center">
              PokéExplorer
            </h1>
            <p className="text-white text-sm text-center mt-1">
              Explore the original 150 Pokémon
            </p>
          </div>

          {/* Navigation links */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/random"
              className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors text-lg shadow-md"
            >
              Random
            </Link>
            <Link
              to="/compare"
              className="text-white hover:text-red-100 transition-colors text-lg"
            >
              Compare
            </Link>
            <Link
              to="/favorites"
              className="text-white hover:text-red-100 transition-colors text-lg"
            >
              Favorites
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
