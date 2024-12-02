import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/MovieCard.module.css";

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="card-img-top"
          alt={movie.title}
        />
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{movie.title}</h5>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
