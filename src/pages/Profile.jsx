import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import { editUser, getUser } from '../Api/movieDb';


const Profile = () => {
  // Obtener el estado del usuario, token y las compras del estado global de Redux
  const { userId, token, purchases } = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(false); //usuario para info inicial
  const [userEdited, setUserEdited] = useState(); //usuario para info inicial
  const [orders, setOrders] = useState([]);

  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    address: user?.address || "",
    phone: user?.phone || "",
    password: user?.password || "",
    orders: user?.orders || "",
  });

  
  
   
    const fetchUser = async () => {
        const userBd = await getUser(userId, token);
        setFormData({
            firstname: userBd?.firstname || "",
            lastname: userBd?.lastname || "",
            email: userBd?.email || "",
            address: userBd?.address || "",
            phone: userBd?.phone || "",
            password: userBd?.password || "",
            orders: userBd?.orders || "",
            })
            setUser(userBd);
          setOrders(userBd.orders)
    } 

  

   
  useEffect(() => {
    fetchUser()
    // Rellenar los datos del formulario si el usuario está autenticado
    if (userEdited) {
      setFormData({
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        address: user?.address,
        phone: user?.phone,
        password: user?.password,
      });
    }

  
  }, [userEdited]);

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();  
    setEditing(false);  
    
    const edited = await editUser(userId, token, formData)
    console.log(edited);
    setFormData(edited);
    /* setUser(edited) */
    setUserEdited(edited)
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
              <p><strong>Nombre:</strong> {user?.firstname} {user?.lastname}</p>
              <p><strong>Correo electrónico:</strong> {user?.email}</p>
              <p><strong>Dirección:</strong> {user?.address}</p>
              <p><strong>Teléfono:</strong> {user?.phone}</p>
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
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Constraseña</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-success m-2">Guardar</button>
              <button type="button" onClick={() => {setEditing(false)}} className="btn btn-light">Cancelar</button>
            </form>
          )}
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h3>Películas Compradas</h3>

        

           <ul>                     
            {orders.map((order, index) => (
              <div key={index}>
                <h3>{order.id}</h3>
                <ul>
                  {order.movies.map((movie, index) => (
                    <li key={index}>{ movie.title }</li>
                  ))}
                </ul>
              </div>
            ))}

            {/* {  purchases.length > 0 ? (
                purchases.map((order, index) => (
                  <li key={index}>Número de orden - {order.id}</li>
                    
                ))
              ) : (
                <p>No has comprado ninguna película aún.</p>
              )} */}
          </ul> 
        </div>
      </div>
    </div>
  );
};

export default Profile;

/* const comments = [
  { text: 'Great post!', replies: ['Thanks!', 'Awesome!'] },
  { text: 'Nice article', replies: ['Agreed!', 'Very helpful.'] }
];

function CommentList() {
  return (
    <div>
      {comments.flatMap(comment => [
        <p key={comment.text}>{comment.text}</p>,
        ...comment.replies.map(reply => <p key={reply} style={{ paddingLeft: '20px' }}>{reply}</p>)
      ])}
    </div>
  );
} */
/* 

  <div>
  {purchases.flatMap(order => [
    <p key={order.id}>Número de orden - {order.id}</p>,
    ...order.movies.map(movie => <p key={movie.movie_id+order.id} style={{ paddingLeft: '20px' }}>{movie.title}</p>)
  ])}
</div> */