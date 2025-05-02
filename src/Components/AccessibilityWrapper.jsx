// src/components/AccessibilityWrapper.jsx
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AccessibilityWrapper = ({ children }) => {
  const location = useLocation();

  // Manage focus on route changes
  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.setAttribute("tabIndex", -1);
    }
  }, [location.pathname]);

  // Add keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip navigation shortcut (CMD/Ctrl + K)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("skip-nav").focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <useQuery>
        <html lang="en" />
        <title>PokéExplorer</title>
        <meta name="theme-color" content="#EF4444" />
        <meta
          name="description"
          content="Accessible Pokémon database with advanced exploration features"
        />

        {/* iOS/Safari specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </useQuery>

      {/* Skip Navigation Link */}
      <a
        id="skip-nav"
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-white focus:p-4 focus:rounded-lg focus:z-50 focus:ring-2 focus:ring-red-500"
      >
        Skip to main content
      </a>

      {/* Semantic Page Structure */}
      <header role="banner" className="bg-red-600 shadow-sm">
        {/* Your existing header content */}
      </header>

      <main
        id="main-content"
        role="main"
        aria-label="Main content"
        tabIndex="-1"
        className="focus:outline-none"
      >
        {children}
      </main>

      <footer
        role="contentinfo"
        aria-label="Site footer"
        className="bg-gray-100 mt-8 py-4"
      >
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">
            Pokémon data from{" "}
            <a
              href="https://pokeapi.co"
              className="text-red-500 hover:text-red-600 underline"
              aria-label="PokeAPI website"
            >
              PokeAPI
            </a>
          </p>
        </div>
      </footer>

      {/* Focus Visible Polyfill */}
      <style>{`
        :focus-visible {
          outline: 2px solid #EF4444;
          outline-offset: 2px;
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </>
  );
};

export default AccessibilityWrapper;
