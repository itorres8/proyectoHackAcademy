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
      const { userId, token } = action.payload;
      state.userId = userId;
      state.token = token;
    },

    logout(state) {
      state.token = "";
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUser, logout } = actions;
export default reducer;
