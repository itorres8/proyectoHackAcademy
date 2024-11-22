import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Carousel, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, fetchGenres } from "../Api/tmdbAPI";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        const movieData = await fetchMovies();
        const genreData = await fetchGenres();

        setMovies(movieData);
        setRandomMovies(movieData.sort(() => 0.5 - Math.random()).slice(0, 5));
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
      {}
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
        {filteredMovies.map((movie) => (
          <div className="col-md-4 mb-3" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
