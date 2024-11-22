import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCredits } from "../Api/tmdbAPI";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieData = await fetchMovieDetails(id);
        const creditsData = await fetchMovieCredits(id);

        const director = creditsData.crew.find(
          (member) => member.job === "Director"
        );
        setMovie({
          ...movieData,
          director: director ? director.name : "Desconocido",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>No se encontró la película.</p>;

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>
        <strong>Géneros:</strong>{" "}
        {movie.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p>
        <strong>Fecha de lanzamiento:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <p>
        <strong>Descripción:</strong> {movie.overview}
      </p>
    </div>
  );
};

export default Movie;
