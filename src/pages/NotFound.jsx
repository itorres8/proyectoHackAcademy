import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/NotFound.module.css";
import global from "../styles/Global.module.css";
import { useSelector } from "react-redux";
useSelector;

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  const isDark = useSelector((state) => state.theme.isDark);
  return (
    <div
      className={`${global.container} d-flex flex-column justify-content-evenly align-items-center`}
    >
      <div>
        <img
          src={isDark ? "/logotipo-darkmode.svg" : "/logotipo-lightmode.svg"}
          alt="Hack Plus Logo"
        />
      </div>
      <h2 className={`${global.title} mb-5`}>
        Oops!.. La página que buscas no existe
      </h2>
      <div className="text-center">
        <button className={`${styles.goHome}`} onClick={handleGoHome}>
          Volver a Inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;
