import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import formPelaporanReducer from "./formPelaporan/reducer";
import mapReducer from "./map/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    formPelaporan: formPelaporanReducer,
    map: mapReducer,
  },
});
