import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const Profile = () => {
  // Obtener el estado del usuario, token y las compras del estado global de Redux
  const { user, token, purchases } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Estado local para manejar la edición de datos
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    email: user.email || '',
    address: user.address || '',
    phone: user.phone || '',
  });

  useEffect(() => {
    // Rellenar los datos del formulario si el usuario está autentificado
    if (user) {
      setFormData({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        address: user.address || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser(formData));  // Actualiza el usuario en Redux
    localStorage.setItem('user', JSON.stringify(formData));  // Guarda los cambios en localStorage
    setEditing(false);  // Desactivar el modo de edición
  };

  // Verifica si el usuario está autenticado
  if (!token) {
    return <div>No estás logueado</div>;
  }

  return (
    <div className="container">
      <h1>Perfil de Usuario</h1>

      
      <div className="card">
        <div className="card-body">
          <h3>Información Personal</h3>
          {!editing ? (
            <div>
              <p><strong>Nombre:</strong> {user.firstname} {user.lastname}</p>
              <p><strong>Correo electrónico:</strong> {user.email}</p>
              <p><strong>Dirección:</strong> {user.address}</p>
              <p><strong>Teléfono:</strong> {user.phone}</p>
              <button onClick={() => setEditing(true)} className="btn btn-primary">Editar</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label">Nombre</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">Apellido</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Dirección</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Teléfono</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-success">Guardar</button>
            </form>
          )}
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h3>Películas Compradas</h3>
          <ul>
            {purchases.length > 0 ? (
              purchases.map((movie, index) => (
                <li key={index}>{movie.title}</li>
              ))
            ) : (
              <p>No has comprado ninguna película aún.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
