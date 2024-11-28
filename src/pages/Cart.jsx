import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { createOrder, getUser } from "../Api/movieDb";
import { clearCart } from "../redux/cartSlice";
import { addPurchases } from "../redux/userSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const {userId, token} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (movie) => {
    dispatch(removeFromCart(movie));
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
      const userFetch = await getUser(userId, token)      
      dispatch(addPurchases(userFetch));
      console.log(userFetch)
      
      /* dispatch(clearCart()); */
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, movie) => total * movie.quantity, 0);
  };

  return (
    <div className="container mt-4">
      <h2>Carrito</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cartItems.map((movie) => (
              <li
                key={movie.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="img-thumbnail"
                    style={{ width: "50px" }}
                  />
                  <span className="ms-2">{movie.title}</span>
                  {/* <span className="ms-2">Precio: ${pricePerMovie}</span> */}
                  <span className="ms-2">Cantidad: {movie.quantity}</span>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(movie)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          {}
          <div className="mt-4">
            <h4>Total: ${calculateTotal()}</h4> {}
          </div>
          {}
          {cartItems.length > 0 && (
            <div className="mt-4">
              <button className="btn btn-success" onClick={handleCheckout}>
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
