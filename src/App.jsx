// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import { PokemonProvider } from "./contexts/PokemonContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

function App() {
  return (
    <Router>
      <PokemonProvider>
        <FavoritesProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pokemon/:id" element={<DetailPage />} />
              </Routes>
            </main>
          </div>
        </FavoritesProvider>
      </PokemonProvider>
    </Router>
  );
}

export default App;
