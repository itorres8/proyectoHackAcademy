import React from "react";
import styles from "../styles/About.module.css";
import global from "../styles/Global.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const About = () => {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <div className={global["container"]}>
      <h1 className={global["title"]}>Acerca de Nosotros</h1>
      <div className={styles["about-image"]}>
        <img
          src={
            isDark
              ? "../public/logotipo-darkmode.svg"
              : "../public/logotipo-lightmode.svg"
          }
          alt="Hack Plus Logo"
        />
      </div>
      <p className={styles["about-text"]}>
        ¡Bienvenidos a <strong>Hack Plus</strong>, tu tienda digital de
        películas donde el cine no tiene límites!
      </p>
      <p className={styles["about-text"]}>
        ¿Sos un amante del cine? ¿Buscás la película perfecta para tu próxima
        noche de maratón? ¡Estás en el lugar adecuado! En
        <strong> Hack Plus</strong>, contamos con una
        <strong> enorme biblioteca de películas</strong> de todos los géneros,
        desde los clásicos más icónicos hasta los estrenos más recientes. Con
        <strong> miles de títulos</strong> a tu disposición, nunca te vas a
        quedar sin opciones para disfrutar de una experiencia cinematográfica
        única.
      </p>
      <p className={styles["about-text"]}>
        Explorá, descubrí y comprá tus películas favoritas de manera sencilla y
        rápida. Ya sea que busques acción, comedia, drama, terror, o incluso
        documentales, tenemos algo para todos los gustos. ¡Tu colección de
        películas está a solo un clic de distancia!
      </p>
      <p className={styles["about-text"]}>
        <strong>Hack Plus</strong> no es solo una tienda, es tu destino
        definitivo para <strong>explorar el cine sin fronteras</strong>. ¡Sumate
        a nuestra comunidad y comienzá tu viaje cinematográfico hoy mismo! 🌟
      </p>
      <p className={styles["about-text"]}>
        Este sitio fue creado como Proyecto Final del curso Front-End Avanzado
        de
        <Link to="https://ha.dev/" style={{ textDecoration: "none" }}>
          <strong> Hack Academy</strong>
        </Link>
      </p>
      <p className={styles["about-text"]}>
        Colaboradores:
        <strong>
          {" "}
          Christian Vera, Ignacio Torres, Nicolás Acosta, Willian Metzger y
          Federico Bueno.
        </strong>
      </p>
    </div>
  );
};

export default About;
