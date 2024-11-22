import React from "react";
import { useState } from "react";
import { login } from "../Api/movieDb";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);

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

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    console.log(e);
    const datosLogin = login(formData);
    if (datosLogin.token) {
      dispatch(setUser(formData), setToken(datosLogin.token));
    } else {
      setErrors(datosLogin.error);
    }
  };

  return (
    <div className="raw justify-content-center">
      <div className="col-4 mx-auto mb-3 ">
        <i className="bi bi-0-circle"></i>

        <div className="card p-4 bg-secondary">
          <h2>Escribir correo para continuar</h2>
          <p>
            Es necesario iniciar sesión con tu cuenta de HackPlus. En caso de no
            tener una recibirás indicaciones para crearla.
          </p>
          <form onSubmit={handleSubmitLogin}>
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña.."
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors && <p>{errors}</p>}
            <button type="submit">Continuar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
