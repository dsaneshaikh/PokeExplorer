// src/components/Header.jsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-red-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/pokeball.png" className="h-8 w-8 mr-3" alt="PokéBall" />
            <h1 className="text-white text-2xl font-bold tracking-tight">
              PokéExplorer
            </h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link
              to="/compare"
              className="text-white hover:text-red-100 transition-colors"
            >
              Compare
            </Link>
            <Link
              to="/favorites"
              className="text-white hover:text-red-100 transition-colors"
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
