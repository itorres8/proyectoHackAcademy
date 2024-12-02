import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // Acción de Redux para agregar al carrito
import {
  fetchMovieDetails,
  fetchMovies,
  fetchMovieCredits,
} from "../Api/tmdbAPI"; // Funciones de la API de TMDb
import styles from "../styles/Movie.module.css"; // Estilos del componente
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Movie = () => {
  const { id } = useParams(); // Obtener el parámetro dinámico `id` de la URL
  const [movie, setMovie] = useState(null); // Estado para los detalles de la película
  const [similarMovies, setSimilarMovies] = useState([]); // Estado para las películas similares
  const dispatch = useDispatch(); // Hook de Redux para despachar acciones

  // Obtener detalles de la película y cargar películas similares
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id); // Llamada para obtener detalles de la película
        setMovie(data);

        if (data) {
          // Obtener el director y películas relacionadas
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

          // Combinar y filtrar las películas similares
          const combinedMovies = [
            ...similarByName,
            ...similarByDirector,
            ...similarByGenre,
          ];
          const uniqueMovies = combinedMovies.filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.id === movie.id)
          );

          setSimilarMovies(uniqueMovies.slice(0, 5)); // Mostrar solo las 5 primeras
        }
      } catch (error) {
        console.error("Error al cargar detalles de la película:", error);
      }
    };

    getMovieDetails();
  }, [id]);

  // Obtener el director de los créditos de la película
  const fetchDirector = async (movieId) => {
    const credits = await fetchMovieCredits(movieId);
    const director = credits.crew.find((person) => person.job === "Director");
    return director;
  };

  // Manejar la acción de agregar al carrito
  const handleAddToCart = () => {
    if (movie) {
      dispatch(addToCart(movie));
      toast.success("Película agregada al carrito con éxito!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  // Mostrar un mensaje de carga mientras no haya datos
  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.movieContainer}>
      {/* Detalles de la película */}
      <div className={styles.movieRow}>
        <div className={styles.movieColPoster}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.moviePoster}
          />
        </div>
        <div className={styles.movieColDetails}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Fecha de lanzamiento:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Géneros:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <button className={styles.movieBtn} onClick={handleAddToCart}>
            Agregar al Carrito
          </button>
        </div>
      </div>

      {/* Películas similares */}
      {similarMovies.length > 0 && (
        <div className={styles.similarMoviesContainer}>
          <h3>Películas Similares</h3>
          <div className={styles.similarMoviesRow}>
            {similarMovies.map((similarMovie) => (
              <Link
                to={`/movie/${similarMovie.id}`}
                key={similarMovie.id}
                className={styles.similarMovieCard}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                  alt={similarMovie.title}
                  className={styles.similarMoviePoster}
                />
                <p className={styles.similarMovieTitle}>{similarMovie.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
