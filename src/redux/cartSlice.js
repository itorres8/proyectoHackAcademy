import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const movie = action.payload;
      console.log(movie);
      const existingMovie = state.cartItems.find(
        (item) => item.id === movie.id
      );

      if (existingMovie) {
        existingMovie.quantity += 1;
      } else {
        state.cartItems.push({ ...movie, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const movieId = action.payload.id;
      state.cartItems = state.cartItems.filter((movie) => movie.id !== movieId);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
