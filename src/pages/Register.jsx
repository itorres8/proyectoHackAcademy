import React from 'react'
/* import { register } from '../Api/movieDb' */

const Register = () => {

  /* try {
    register( {
      firstname: "María",
      lastname: "Ortiz",
      address: "Yi 2266",
      phone: "099776655",
      email: "algo@server.com",
      password: "abc123"
    })
    
  } catch (error) {
    console.log(error)
  } */

  return (
    <div className="raw justify-content-center">
        <div className="col-4 mx-auto mb-3 ">
      <i className="bi bi-0-circle"></i>
      <div className="card p-4 bg-secondary">
        <h2>Crea una cuenta para continuar</h2>
        <p>Crea una cuenta usando correo@ejemplo.com</p>
        <form onSubmit="">
          <label htmlFor="password"> Contraseña</label>
        <input type="password" placeholder="Contraseña.." name="password" defaultValue="" required/>
        <button type="submit">Continuar</button>
        </form>
      </div>
    </div>
    </div>

  )
}

export default Register;

