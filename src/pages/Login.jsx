import React from "react";
import { useState } from "react";
import { login } from "../Api/movieDb";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(setUser(formData));
      dispatch(setToken(datosLogin.token));
      navigate("/");
    } else {
      setErrors(datosLogin.error);
    }
  };

  return (
    <div className="raw justify-content-center min-vh-100 d-flex flex-column">
      <div>
        <div className="col-4 mx-auto mb-3 ">
          <i className="bi bi-0-circle"></i>

          <div className="card p-4 bg-secondary">
            <h2>Escribir correo para continuar</h2>
            <p>
              Es necesario iniciar sesión con tu cuenta de HackPlus. En caso de
              no tener una recibirás indicaciones para crearla.
            </p>
            <form onSubmit={handleSubmitLogin}>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="email">
                  Correo:
                </label>
                <input
                  className="form-control"
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
                  className="form-control"
                  type="password"
                  placeholder="Contraseña.."
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors && <p>{errors}</p>}
              </div>
              <div className="">
                <button
                  className="btn btn-success"
                  type="submit"
                  style={{ transition: "all 0.3s ease" }}
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-4 mx-auto">
          <hr />
          <p>
            ¿No tenés una cuenta? <Link to="/register">Registrate ahora</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
