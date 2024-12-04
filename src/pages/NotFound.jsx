import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <h2 className="title">Oops!.. La página que buscas no existe</h2>
      <button className="go-home-button" onClick={handleGoHome}>
        Volver a Inicio
      </button>
    </div>
  );
};

export default NotFound;
