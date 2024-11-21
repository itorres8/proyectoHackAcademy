import React, { useState } from "react";

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
    const { name, defaultValue } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: defaultValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
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
              defaultValue={formData.firstname}
              onChange={handleChange}
              required
            />
            <label htmlFor="lastname">Apellido</label>
            <input
              type="text"
              placeholder="Apellido.."
              name="lastname"
              defaultValue={formData.lastname}
              required
            />
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              placeholder="Dirección.."
              name="address"
              defaultValue={formData.address}
              required
            />
            <label htmlFor="phone">Teléfono</label>
            <input
              type="text"
              placeholder="Teléfono.."
              name="phone"
              defaultValue={formData.phone}
              required
            />
            <label htmlFor="email">Correo</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              name="email"
              defaultValue={formData.email}
              required
            />
            <label htmlFor="password"> Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña.."
              name="password"
              defaultValue={formData.password}
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
