import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { editUser, getUser } from "../Api/movieDb";
import styles from "../styles/Profile.module.css"; // Import the styles

const Profile = () => {
  const { userId, token, purchases } = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(false);
  const [userEdited, setUserEdited] = useState();
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
    });
    setUser(userBd);
    setOrders(userBd.orders);
  };

  useEffect(() => {
    fetchUser();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditing(false);
    const edited = await editUser(userId, token, formData);
    console.log(edited);
    setFormData(edited);
    setUserEdited(edited);
  };

  if (!token) {
    return <div className="alert alert-danger">No estás logueado</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={`${styles["display-4"]} ${styles["text-center"]} mb-4`}>
        Perfil de Usuario
      </h1>

      <div className={`${styles.card} shadow-lg border-light rounded-3`}>
        <div className="card-body">
          <h3 className={styles["card-title"]}>Información Personal</h3>
          {!editing ? (
            <div>
              <p>
                <strong>Nombre:</strong> {user?.firstname} {user?.lastname}
              </p>
              <p>
                <strong>Correo electrónico:</strong> {user?.email}
              </p>
              <p>
                <strong>Dirección:</strong> {user?.address}
              </p>
              <p>
                <strong>Teléfono:</strong> {user?.phone}
              </p>
              <button
                onClick={() => setEditing(true)}
                className={`btn ${styles["btn-outline-primary"]}`}
              >
                Editar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstname" className={styles["form-label"]}>
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={styles["form-control"]}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className={styles["form-label"]}>
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={styles["form-control"]}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className={styles["form-label"]}>
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles["form-control"]}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className={styles["form-label"]}>
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles["form-control"]}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className={styles["form-label"]}>
                  Teléfono
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles["form-control"]}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className={styles["form-label"]}>
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles["form-control"]}
                />
              </div>
              <button
                type="submit"
                className={`btn ${styles["btn-success"]} m-2`}
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className={`btn ${styles["btn-outline-secondary"]}`}
              >
                Cancelar
              </button>
            </form>
          )}
        </div>
      </div>

      <div className={`${styles.card} shadow-lg border-light rounded-3 mt-4`}>
        <div className="card-body">
          <h3 className={styles["card-title"]}>Películas Compradas</h3>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="mb-3">
                <h5 className={styles["text-muted"]}>Orden ID: {order.id}</h5>
                <ul className="list-unstyled">
                  {order.movies.map((movie, index) => (
                    <li key={index}>{movie.title}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No has comprado ninguna película aún.</p>
          )}
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
