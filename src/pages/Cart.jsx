import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { createOrder, getUser } from "../Api/movieDb";
import { clearCart } from "../redux/cartSlice";
import styles from "../styles/Cart.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import global from "../styles/Global.module.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { userId, token, price } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (movie) => {
    dispatch(removeFromCart(movie));
    toast.warn("Película eliminada con éxito!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const handleCheckout = async () => {
    if (!userId || !token) {
      navigate("/login");
    } else {
      const arrayMovies = [];
      for (let movie of cartItems) {
        const movieAuxiliar = {
          movie_id: movie.id,
          title: movie.title,
          qty: movie.quantity,
        };
        arrayMovies.push(movieAuxiliar);
      }
      await createOrder(arrayMovies, token);
      const userFetch = await getUser(userId, token);
      const { orders } = userFetch;
      toast.success("Compra realizada con éxito!", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(clearCart());
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, movie) => total + movie.quantity * price,
      0
    );
  };

  return (
    <div className={global.container}>
      <h2 className={global["title"]}>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>Tu carrito está vacío.</p>
      ) : (
        <div className={styles.cartContent}>
          <ul className={styles.cartList}>
            {cartItems.map((movie) => (
              <li key={movie.id} className={styles.cartItem}>
                <div className={styles.cartItemDetails}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.moviePoster}
                  />
                  <span className={styles.movieTitle}>{movie.title}</span>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemove(movie)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.totalSection}>
            <h4>Total: ${calculateTotal()}</h4>
            {cartItems.length > 0 && (
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Finalizar Compra
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
