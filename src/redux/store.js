import { configureStore, createReducer } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
/* import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; */

/* const persistConfig = {
  key: "root",
  storage,
}; */

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
/* 
const persistor = persistStore(store); */

export { store /* , persistor  */ };
