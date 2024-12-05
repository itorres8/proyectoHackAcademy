import React, { useState } from "react";
import { login } from "../Api/movieDb";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Login-register.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.theme.isDark);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const datosLogin = await login(formData);

    if (datosLogin.token) {
      dispatch(setUser(datosLogin));
      toast.success("Sesión iniciada con éxito!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/");
    } else {
      setErrors(datosLogin.error);
      toast.error("Credenciales inválidas!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className={`${styles.loginContainer} raw justify-content-center min-vh-100 d-flex flex-column`}
    >
      <div className={styles.loginWrapper}>
        <div className="col-4 mx-auto mb-3">
          <img
            src={isDark ? "/logotipo-darkmode.svg" : "/logotipo-lightmode.svg"}
            alt="Hack Plus Logo"
            className={styles.logo}
          />
          <div className={`${styles.loginCard} card p-4 bg-secondary`}>
            <h2 className={styles.loginTitle}>
              Escribir correo para continuar
            </h2>
            <p className={styles.loginSubtitle}>
              Es necesario iniciar sesión con tu cuenta de HackPlus. En caso de
              no tener una recibirás indicaciones para crearla.
            </p>
            <form onSubmit={handleSubmitLogin}>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="email">
                  Correo:
                </label>
                <input
                  id="email"
                  className={`${styles.inputField} form-control`}
                  type="email"
                  placeholder="Correo electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="password">
                  Contraseña
                </label>
                <input
                  id="password"
                  className={`${styles.inputField} form-control`}
                  type="password"
                  placeholder="Contraseña.."
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <button
                  className={`${styles.submitButton} btn btn-success`}
                  type="submit"
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-4 mx-auto">
          <hr className={styles.divider} />
          <p className={styles.registerText}>
            ¿No tenés una cuenta?{" "}
            <Link to="/register" className={styles.registerLink}>
              Registrate ahora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
