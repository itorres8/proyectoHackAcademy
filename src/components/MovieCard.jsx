import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="card">
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="card-img-top"
          alt={movie.title}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{movie.title}</h5>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
