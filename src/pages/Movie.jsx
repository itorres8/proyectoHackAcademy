import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovies,
  searchMovies,
} from "../Api/tmdbAPI";
import styles from "../styles/Movie.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setPrice } from "../redux/userSlice";
import { getPriceById } from "../Api/movieDb";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import global from "../styles/Global.module.css";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const price = useSelector((state) => state.user.price);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const findSimilarMovies = async (movie) => {
    if (!movie) return [];

    try {
      const credits = await fetchMovieCredits(movie.id);
      const director = credits.crew.find((person) => person.job === "Director");

      let similarMoviesSet = new Set();

      if (director) {
        const directorMovies = await fetchMovies({
          with_crew: director.id,
        });
        directorMovies.forEach((m) => {
          if (m.id !== movie.id && m.poster_path) {
            similarMoviesSet.add(m);
          }
        });
      }

      if (similarMoviesSet.size < 5) {
        const firstWord = movie.title
          .split(/\s+/)
          .find((word) => word.length > 3);

        if (firstWord) {
          const titleMovies = await searchMovies(firstWord);
          titleMovies.forEach((m) => {
            if (
              m.id !== movie.id &&
              m.poster_path &&
              !similarMoviesSet.has(m)
            ) {
              similarMoviesSet.add(m);
            }
          });
        }
      }

      return Array.from(similarMoviesSet).slice(0, 10);
    } catch (error) {
      console.error("Error finding similar movies:", error);
      return [];
    }
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);

        if (data) {
          const similarMovies = await findSimilarMovies(data);
          setSimilarMovies(similarMovies);
        }
      } catch (error) {
        console.error("Error al cargar los detalles de la película:", error);
      }
      setLoading(false);
    };

    getMovieDetails();
  }, [id]);

  const handleAddToCart = () => {
    const isMovieInCart = cartItems.find((item) => item.id === movie.id);
    if (!isMovieInCart) {
      dispatch(addToCart(movie));
      toast.success("Película agregada al carrito con éxito!", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      toast.error("La película ya esta en el carrito", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  if (loading || !movie)
    return (
      <div className={global.overlay}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.movieContainer}>
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
            <strong>Géneros:</strong>
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Precio:</strong> ${price}
          </p>
          <button className={styles.movieBtn} onClick={handleAddToCart}>
            Agregar al Carrito
          </button>
        </div>
      </div>

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
