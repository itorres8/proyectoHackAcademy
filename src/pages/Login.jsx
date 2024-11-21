import React from "react";

const Login = () => {
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
          <form onSubmit="">
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              name="email"
              defaultValue=""
              required
            />
            <button type="submit">Continuar</button>
          </form>
        </div>
      </div>
      <div className="col-4 mx-auto card p-4 bg-secondary">
        <h2>Escribir contraseña</h2>
        <p>
          Es necesario iniciar sesión con tu cuenta de HackPlus con tu correo
          electrónico: correo@ejemplo.com
        </p>
        <form onSubmit="">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña.."
            name="password"
            defaultValue=""
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
