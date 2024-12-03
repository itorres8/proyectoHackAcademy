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
      const existingMovie = state.cartItems.find(
        (item) => item.id === movie.id
      );

      if (!existingMovie) {
        state.cartItems.push({ ...movie, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const movieId = action.payload.id;
      state.cartItems = state.cartItems.filter((movie) => movie.id !== movieId);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
