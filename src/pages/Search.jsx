import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../Api/tmdbAPI";
import MovieCard from "../components/MovieCard";

const Search = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

    const performSearch = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const results = await searchMovies(query);
        setSearchResults(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [location.search]);

  if (loading) return <div>Buscando películas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Resultados de búsqueda</h2>
      {searchResults.length === 0 ? (
        <p>No se encontraron películas.</p>
      ) : (
        <div className="row">
          {searchResults.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-3">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;