const API_KEY = "27e832013fc9f93ce3fd2285600967ca";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) throw new Error("Error al cargar las películas");
  const data = await response.json();
  return data.results;
};

const fetchGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  if (!response.ok) throw new Error("Error al cargar los géneros");
  const data = await response.json();
  return data.genres;
};

const fetchMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!response.ok)
    throw new Error("Error al cargar los detalles de la película");
  return await response.json();
};

const fetchMovieCredits = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
  );
  if (!response.ok)
    throw new Error("Error al cargar los créditos de la película");
  return await response.json();
};

export { fetchMovies, fetchGenres, fetchMovieDetails, fetchMovieCredits };
