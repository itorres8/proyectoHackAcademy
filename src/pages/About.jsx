import React from "react";
import styles from "../styles/About.module.css"; // Asegúrate de que el archivo CSS esté correctamente importado

const About = () => {
  return (
    <div className={styles["about-container"]}>
      <h1 className={styles["about-title"]}>Acerca de Nosotros</h1>
      <div className={styles["about-image"]}>
        <img
          src="https://scholar.harvard.edu/sites/scholar.harvard.edu/files/styles/os_files_xxlarge/public/hackathon/files/hackplus.png?m=1596385410&itok=mYxdU-K8"
          alt="Hack Plus Logo"
          className={styles["about-img"]}
        />
      </div>
      <p className={styles["about-text"]}>
        ¡Bienvenidos a <strong>Hack Plus</strong>, tu tienda digital de
        películas donde el cine no tiene límites!
      </p>
      <p className={styles["about-text"]}>
        ¿Eres un amante del cine? ¿Buscas la película perfecta para tu próxima
        noche de maratón? ¡Estás en el lugar adecuado! En{" "}
        <strong>Hack Plus</strong>, contamos con una{" "}
        <strong>enorme biblioteca de películas</strong> de todos los géneros,
        desde los clásicos más icónicos hasta los estrenos más recientes. Con{" "}
        <strong>miles de títulos</strong> a tu disposición, nunca te quedarás
        sin opciones para disfrutar de una experiencia cinematográfica única.
      </p>
      <p className={styles["about-text"]}>
        Explora, descubre y compra tus películas favoritas de manera sencilla y
        rápida. Ya sea que busques acción, comedia, drama, terror, o incluso
        documentales, tenemos algo para todos los gustos. ¡Tu colección de
        películas está a solo un clic de distancia!
      </p>
      <p className={styles["about-text"]}>
        <strong>Hack Plus</strong> no es solo una tienda, es tu destino
        definitivo para <strong>explorar el cine sin fronteras</strong>. ¡Únete
        a nuestra comunidad y comienza tu viaje cinematográfico hoy mismo! 🌟
      </p>
    </div>
  );
};

export default About;
