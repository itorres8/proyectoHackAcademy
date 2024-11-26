import React from "react";
import { useState } from "react";
import { login } from "../Api/movieDb";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


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
