import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    logout(state) {
      state.user = {
        token: "",
        userId: "",
        isAdmin: false,
      };
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUser, logout } = actions;
export default reducer;
