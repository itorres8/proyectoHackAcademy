import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: "",
    purchases: [],//Agregue esta propiedad para guardar las compras que el user vaya haciendo
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state){
      state.user = {};
      state.token = "";
    }
  },
});

const { actions, reducer } = userSlice;
export const { setUser, setToken, logout } = actions;
export default reducer;
