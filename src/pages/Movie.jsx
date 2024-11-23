import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {
  fetchMovieDetails,
  fetchMovies,
  fetchMovieCredits,
} from "../Api/tmdbAPI";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);

        if (data) {
          const director = await fetchDirector(data.id);
          const similarByName = await fetchMovies({
            query: data.title.split(":")[0],
          });
          const similarByDirector = director
            ? await fetchMovies({ with_crew: director.id })
            : [];
          const similarByGenre =
            data.genres.length > 0
              ? await fetchMovies({ with_genres: data.genres[0].id })
              : [];

          const combinedMovies = [
            ...similarByName,
            ...similarByDirector,
            ...similarByGenre,
          ];
          const uniqueMovies = combinedMovies.filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.id === movie.id)
          );

          setSimilarMovies(uniqueMovies.slice(0, 5));
        }
      } catch (error) {
        console.error("Error al cargar detalles de la película:", error);
      }
    };

    getMovieDetails();
  }, [id]);

  const fetchDirector = async (movieId) => {
    const credits = await fetchMovieCredits(movieId);
    const director = credits.crew.find((person) => person.job === "Director");
    return director;
  };

  const handleAddToCart = () => {
    if (movie) {
      dispatch(addToCart(movie));
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-container">
      <div className="movie-row">
        <div className="movie-col">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
        </div>
        <div className="movie-col">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Fecha de lanzamiento:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Géneros:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <button className="movie-btn" onClick={handleAddToCart}>
            Agregar al Carrito
          </button>
        </div>
      </div>

      {}
      {similarMovies.length > 0 && (
        <div className="similar-movies-container">
          <h3>Películas Similares</h3>
          <div className="similar-movies-row">
            {similarMovies.map((similarMovie) => (
              <Link
                to={`/movie/${similarMovie.id}`}
                key={similarMovie.id}
                className="similar-movie-card"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                  alt={similarMovie.title}
                  className="similar-movie-poster"
                />
                <p className="similar-movie-title">{similarMovie.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
