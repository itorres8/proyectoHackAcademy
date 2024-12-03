import { createSlice } from "@reduxjs/toolkit";
import { getPrice } from "../Api/movieDb";

const userSlice = createSlice({
  name: "user",
  initialState: {
    purchases: [],
    token: "",
    userId: "",
    isAdmin: false,
    price: 0,
  },
  reducers: {
    setUser(state, action) {
      const { userId, token } = action.payload;
      state.userId = userId;
      state.token = token;
    },

    logout(state) {
      state.token = "";
    },
    setPrice(state, action) {
      const { price } = action.payload;
      state.price = price.price;
      console.log(state.price);
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUser, logout, setPrice } = actions;
export default reducer;
