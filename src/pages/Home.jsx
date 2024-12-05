import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../components/MovieCard";
import { Carousel, Dropdown } from "react-bootstrap";
import {
  fetchMovies,
  fetchGenres,
  fetchTopRatedMovies,
  fetchPopularMovies,
} from "../Api/tmdbAPI";
import { getPriceById } from "../Api/movieDb";
import { useSelector } from "react-redux";
import styles from "../styles/Home.module.css";
import { useDispatch } from "react-redux";
import { setPrice } from "../redux/userSlice";
import global from "../styles/Global.module.css";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastMovieElementRef = useRef(null);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        const movieData = await fetchMovies();
        const genreData = await fetchGenres();
        const topRatedData = await fetchTopRatedMovies();
        const popularData = await fetchPopularMovies();
        const getPriceByIdData = await getPriceById(2);

        dispatch(setPrice(getPriceByIdData));

        setMovies(movieData);
        setRandomMovies(movieData.sort(() => 0.5 - Math.random()).slice(0, 8));
        setTopRatedMovies(topRatedData.slice(0, 18));
        setPopularMovies(popularData.slice(0, 18));
        setGenres(genreData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndGenres();
  }, []);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(selectedGenre))
    : movies;

  const renderMovieSlides = (movies) => {
    const chunks = [];
    const chunkSize = 6;
    for (let i = 0; i < movies.length; i += chunkSize) {
      chunks.push(movies.slice(i, i + chunkSize));
    }
    return chunks.map((chunk, index) => (
      <Carousel.Item key={index}>
        <div className={`d-flex justify-content-center  ${styles.movieRow}`}>
          {chunk.map((movie) => (
            <div key={movie.id} className={styles.movieItem}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </Carousel.Item>
    ));
  };

  if (loading) {
    return (
      <div className={global.overlay}>
        <Spinner />
      </div>
    );
  }

  if (error) return <div className={styles.errorMessage}>Error: {error}</div>;

  return (
    <div className={`${global.container} pt-0 px-0`}>
      <Carousel className={styles.carousel}>
        {randomMovies.map((movie) => (
          <Carousel.Item key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className={`${styles.carouselImage} d-block w-100 img-fluid`}
            />
            <Link to={`/movie/${movie.id}`}>
              <Carousel.Caption className={styles.carouselCaption}>
                <h3>{movie.title}</h3>
                <p>{movie.overview.substring(0, 100)}...</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="container-fluid px-0">
        <h4 className={`${styles.sectionTitle} px-3`}>
          Películas mejor calificadas
        </h4>
        <Carousel interval={3000} controls={true} indicators={false}>
          {renderMovieSlides(topRatedMovies)}
        </Carousel>
      </div>

      <div className="container-fluid px-0 mt-4">
        <h4 className={`${styles.sectionTitle} px-3`}>Películas Populares</h4>
        <Carousel interval={3000} controls={true} indicators={false}>
          {renderMovieSlides(popularMovies)}
        </Carousel>
      </div>

      <div className="my-3 px-3">
        <h4 className={styles.sectionTitle}>Filtrar por género</h4>
        <Dropdown>
          <Dropdown.Toggle className={styles.genreDropdown} id="dropdown-basic">
            {selectedGenre
              ? genres.find((g) => g.id === selectedGenre).name
              : "Seleccionar Género"}
          </Dropdown.Toggle>

          <Dropdown.Menu className={styles.genreDropdown}>
            <Dropdown.Item
              onClick={() => handleGenreChange("")}
              className={styles.dropdownItem}
            >
              Todos
            </Dropdown.Item>
            {genres.map((genre) => (
              <Dropdown.Item
                key={genre.id}
                onClick={() => handleGenreChange(genre.id)}
                className={styles.dropdownItem}
              >
                {genre.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className={`${styles.movieGrid} ${styles.animatedSection} px-3`}>
        {filteredMovies.map((movie, index) => (
          <div
            key={movie.id}
            ref={
              filteredMovies.length === index + 1 ? lastMovieElementRef : null
            }
            className={styles.movieCard}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {loading && <p>Cargando más películas...</p>}
    </div>
  );
};

export default Home;
