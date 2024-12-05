import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { editUser, getUser } from "../Api/movieDb";
import styles from "../styles/Profile.module.css";
import { deleteUser } from "../Api/movieDb";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import global from "../styles/Global.module.css";
import Spinner from "../components/Spinner";
import formulario from "../styles/Login-register.module.css";
import { format, parseISO } from "date-fns";
import { FloatingLabel, Form, Modal, Button } from "react-bootstrap";

const Profile = () => {
  const { userId, token, purchases } = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(false);
  const [userEdited, setUserEdited] = useState();
  const [orders, setOrders] = useState([]);
  const isDark = useSelector((state) => state.theme.isDark);
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    address: user?.address || "",
    phone: user?.phone || "",
    password: user?.password || "",
    orders: user?.orders || "",
  });

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const fetchUser = async () => {
    setLoading(true);
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
    setLoading(false);
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
    if (name === "password") {
      setPassword(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditing(false);
    setLoading(true);
    const editedData = {
      ...formData,
      password: showPassword ? password : "",
    };
    const edited = await editUser(userId, token, formData);
    setFormData(edited);
    setUserEdited(edited);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const deleted = await deleteUser(userId, token);
    dispatch(logout());
    navigate("/");
    setLoading(false);
  };

  const handleCloseModal = () => setModal(false);
  const handleShowModal = () => setModal(true);

  const themeStyles = {
    light: {
      backgroundColor: "#ffffff",
      color: "#000000",
    },
    dark: {
      backgroundColor: "#777",
      color: "#ffffff",
    },
  };

  if (!token) {
    return <div className="alert alert-danger">No estás logueado</div>;
  }

  return (
    <div className={global.container}>
      <h1 className={`${global["title"]} mb-5`}>Perfil de Usuario</h1>

      {loading && (
        <div className={global.overlay}>
          <Spinner />
        </div>
      )}

      <div className="d-flex flex-column justify-content-around align-items-start">
        <div
          className={`${styles.card} ${styles.textGradiant} shadow-lg border-light rounded-3 p-4 w-75 align-self-center`}
        >
          <div className="card-body">
            <h3 className="text-center mb-5 mt-3">Información Personal</h3>
            <div className="d-flex mb-4 align-items-start justify-content-evenly ">
              <img
                className="img-fluid rounded-circle"
                src="https://avatar.iran.liara.run/public"
                alt=""
                style={{ width: "430px" }}
              />

              {!editing ? (
                <div className="d-flex flex-column justify-content-center text-center">
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
                    className={`${styles.buttonEditar} m-2  align-self-center`}
                  >
                    Editar
                  </button>
                </div>
              ) : (
                <form className="w-100" onSubmit={handleSubmit}>
                  <div className="text-center ">
                    <div className="mb-3 d-flex justify-content-center">
                      <div className="w-50">
                        <FloatingLabel
                          htmlFor="firstname"
                          label="Nombre"
                          className="w-100"
                        >
                          <Form.Control
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            className={`${formulario.inputField} w-100`}
                          />
                        </FloatingLabel>
                      </div>
                    </div>

                    <div className="mb-3 d-flex justify-content-center">
                      <div className="w-50">
                        <FloatingLabel
                          htmlFor="lastname"
                          label="Apellido"
                          className="w-100"
                        >
                          <Form.Control
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className={`${formulario.inputField} w-100`}
                          />
                        </FloatingLabel>
                      </div>
                    </div>

                    <div className="mb-3 d-flex justify-content-center">
                      <div className="w-50">
                        <FloatingLabel
                          htmlFor="email"
                          label="E-mai"
                          className="w-100"
                        >
                          <Form.Control
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${formulario.inputField} w-100`}
                          />
                        </FloatingLabel>
                      </div>
                    </div>

                    <div className="mb-3 d-flex justify-content-center">
                      <div className="w-50">
                        <FloatingLabel
                          htmlFor="address"
                          label="Dirección"
                          className="w-100"
                        >
                          <Form.Control
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`${formulario.inputField} w-100`}
                          />
                        </FloatingLabel>
                      </div>
                    </div>

                    <div className="mb-3 d-flex justify-content-center">
                      <div className="w-50">
                        <FloatingLabel
                          htmlFor="phone"
                          label="Teléfono"
                          className="w-100"
                        >
                          <Form.Control
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`${formulario.inputField} w-100`}
                          />
                        </FloatingLabel>
                      </div>
                    </div>

                    {showPassword && (
                      <div className="mb-3 d-flex justify-content-center">
                        <div className="w-50">
                          <FloatingLabel
                            htmlFor="password"
                            label="Contraseña"
                            className="w-100"
                          >
                            <Form.Control
                              type="password"
                              id="password"
                              name="password"
                              value={password}
                              onChange={handleChange}
                              className={`${formulario.inputField} w-100`}
                            />
                          </FloatingLabel>
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(!showPassword);
                        if (!showPassword) {
                          setPassword("");
                        }
                      }}
                      className={`${styles.buttonEditar} m-2 align-self-center`}
                    >
                      {showPassword ? "Cancelar" : "Cambiar contraseña"}
                    </button>

                    <div className="d-flex flex-column mb-2">
                      <div>
                        <button
                          type="submit"
                          className="btn btn-success m-2 align-self-center"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => {
                            setEditing(false);
                            setShowPassword(false);
                            setPassword("");
                          }}
                          className="btn btn-danger m-2 align-self-center"
                        >
                          Descartar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleShowModal()}
                          className="btn btn-outline-danger m-2 align-self-center"
                        >
                          Borrar usuario
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <Modal show={modal} onHide={handleCloseModal} backdrop="static">
          <Modal.Header
            closeButton
            style={isDark ? themeStyles.dark : themeStyles.light}
          >
            <Modal.Title>Confirmar borrar usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body style={isDark ? themeStyles.dark : themeStyles.light}>
            <p>¿Estás seguro que querés borrar tu usuario?</p>

            <strong>Esta acción no tiene vuelta atrás.</strong>
          </Modal.Body>
          <Modal.Footer style={isDark ? themeStyles.dark : themeStyles.light}>
            <Button variant="danger" onClick={() => handleDelete()}>
              Borrar usuario
            </Button>
            <Button variant="dark" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        <div
          className={`${styles.card} ${styles.textGradiant} shadow-lg border-light rounded-3 p-4 w-75 align-self-center`}
        >
          <div className="card-body">
            <h3 className="text-center m-4">Películas Compradas</h3>
            {orders.length > 0 ? (
              orders.map((order, index) => {
                const formatDate = format(
                  parseISO(order.createdAt),
                  "dd/MM/yyyy HH:mm"
                );
                return (
                  <div key={index} className="mb-3">
                    <div>
                      <h3>Orden {order.id}</h3>
                      <p>Fecha de compra: {formatDate}</p>
                    </div>

                    <ul className="list-unstyled">
                      {order.movies.map((movie, index) => (
                        <li key={index}>
                          <h4>{movie.title}</h4>
                        </li>
                      ))}
                    </ul>
                    <hr />
                  </div>
                );
              })
            ) : (
              <p>No has comprado ninguna película aún.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
