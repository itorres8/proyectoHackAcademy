import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../Api/movieDb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Login-register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const isDark = useSelector((state) => state.theme.isDark);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      const registro = await register(formData);
      if (registro) {
        toast.success("Registo realizado con éxito!", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${styles.loginContainer} raw justify-content-center min-vh-100 d-flex flex-column`}
    >
      <div className={styles.loginWrapper}>
        <div className="col-4 mx-auto mb-3">
          <img
            src={
              isDark
                ? "../src/assets/logotipo-darkmode.svg"
                : "../src/assets/logotipo-lightmode.svg"
            }
            alt="Hack Plus Logo"
            className={styles.logo}
          />

          <div className={`${styles.loginCard} card p-4 bg-secondary`}>
            <h2 className={styles.loginTitle}>
              Crea una cuenta para continuar
            </h2>
            <p className={styles.loginSubtitle}>
              Crea una cuenta usando correo@ejemplo.com
            </p>
            <form onSubmit={handleSubmitRegister}>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="firstname">
                  Nombre
                </label>
                <input
                  id="firstname"
                  className={`${styles.inputField} form-control`}
                  type="text"
                  placeholder="Nombre.."
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="lastname">
                  Apellido
                </label>
                <input
                  id="lastname"
                  className={`${styles.inputField} form-control`}
                  type="text"
                  placeholder="Apellido.."
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="address">
                  Dirección
                </label>
                <input
                  id="address"
                  className={`${styles.inputField} form-control`}
                  type="text"
                  placeholder="Dirección.."
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="phone">
                  Teléfono
                </label>
                <input
                  id="phone"
                  className={`${styles.inputField} form-control`}
                  type="text"
                  placeholder="Teléfono.."
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="email">
                  Correo
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
                  {" "}
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
              <button
                className={`${styles.submitButton} btn btn-success`}
                type="submit"
                style={{
                  transition: "all 0.3s ease",
                  padding: "8px 15px",
                  fontWeightP: "500",
                  letterSpacing: "0.5px",
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.target.click();
                  }
                }}
              >
                Continuar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
