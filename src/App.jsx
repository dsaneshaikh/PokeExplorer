// src/App.jsx (updated routes)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import { PokemonProvider } from "./contexts/PokemonContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import ErrorBoundary from "./Components/common/ErrorBoundary";
import ComparePage from "./pages/ComparePage";
function App() {
  return (
    <Router>
      <PokemonProvider>
        <FavoritesProvider>
          <ErrorBoundary>
            <div className="min-h-screen bg-[#E0F7FA]">
              <Header />
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/pokemon/:id" element={<DetailPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/compare" element={<ComparePage />} />
                </Routes>
              </main>
            </div>
          </ErrorBoundary>
        </FavoritesProvider>
      </PokemonProvider>
    </Router>
  );
}

export default App;
