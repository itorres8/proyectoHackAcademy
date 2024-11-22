import React, { useState } from "react";
import { register } from "../Api/movieDb";

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
      console.log(register);
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
            <label htmlFor="firstname">Nombre</label>
            <input
              type="text"
              placeholder="Nombre.."
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <label htmlFor="lastname">Apellido</label>
            <input
              type="text"
              placeholder="Apellido.."
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              placeholder="Dirección.."
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <label htmlFor="phone">Teléfono</label>
            <input
              type="text"
              placeholder="Teléfono.."
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Correo</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password"> Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña.."
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Continuar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
