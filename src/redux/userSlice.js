import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    purchases: [],
    token: "",
    userId: "",
    isAdmin: false,
  },
  reducers: {
    setUser(state, action) {
      const {userId, token} = action.payload
      state.userId = userId;
      state.token = token;
      
    },
    addPurchases(state, action) {
      const {orders} = action.payload;
      for (const element of orders) {
        state.purchases.push(element);
      }
      
    },

    logout(state) {
      state.token = ""
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUser, logout, addPurchases } = actions; 
export default reducer;
