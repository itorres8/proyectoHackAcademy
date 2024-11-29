import { useEffect, useState, useRef } from "react";
import MovieCard from "../components/MovieCard";
import { Carousel, Dropdown } from "react-bootstrap";
import {
  fetchMovies,
  fetchGenres,
  fetchTopRatedMovies,
  fetchPopularMovies,
} from "../Api/tmdbAPI";
import { useSelector } from "react-redux";

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

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        const movieData = await fetchMovies();
        const genreData = await fetchGenres();
        const topRatedData = await fetchTopRatedMovies();
        const popularData = await fetchPopularMovies();

        setMovies(movieData);
        setRandomMovies(movieData.sort(() => 0.5 - Math.random()).slice(0, 5));
        setTopRatedMovies(topRatedData.slice(0, 10));
        setPopularMovies(popularData.slice(0, 10));
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

  if (loading) return <p>Cargando películas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      
      <Carousel>
        {randomMovies.map((movie) => (
          <Carousel.Item key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="d-block w-100 img-fluid"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>{movie.title}</h3>
              <p>{movie.overview.substring(0, 100)}...</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="container my-4">
        <h4>Top Rated Movies</h4>
        <div className="row">
          {topRatedMovies.map((movie) => (
            <div key={movie.id} className="col-md-2 mb-3">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <div className="container my-4">
        <h4>Popular Movies</h4>
        <div className="row">
          {popularMovies.map((movie) => (
            <div key={movie.id} className="col-md-2 mb-3">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="my-3">
        <h4>Filtrar por Género</h4>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedGenre
              ? genres.find((g) => g.id === selectedGenre).name
              : "Seleccionar Género"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleGenreChange("")}>
              Todos
            </Dropdown.Item>
            {genres.map((genre) => (
              <Dropdown.Item
                key={genre.id}
                onClick={() => handleGenreChange(genre.id)}
              >
                {genre.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {}
      <div className="row mt-4">
        {filteredMovies.map((movie, index) => {
          if (filteredMovies.length === index + 1) {
            return (
              <div
                key={movie.id}
                className="col-md-4 mb-3"
                ref={lastMovieElementRef}
              >
                <MovieCard movie={movie} />
              </div>
            );
          } else {
            return (
              <div key={movie.id} className="col-md-4 mb-3">
                <MovieCard movie={movie} />
              </div>
            );
          }
        })}
      </div>

      {loading && <p>Cargando más películas...</p>}
    </div>
  );
};

export default Home;
