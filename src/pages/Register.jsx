import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../Api/movieDb";
import { useSelector } from "react-redux";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    try {
      const registro = register(formData);
      if (user.user.token) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="raw justify-content-center">
      <div className="col-4 mx-auto mb-3 ">
        <i className="bi bi-0-circle"></i>
        <div className="card p-4 bg-secondary">
          <h2>Crea una cuenta para continuar</h2>
          <p>Crea una cuenta usando correo@ejemplo.com</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="firstname">
                Nombre
              </label>
              <input
                id="firstname"
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
                {" "}
                Contraseña
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                placeholder="Contraseña.."
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className="btn btn-success"
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
  );
};

export default Register;
