import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import formPelaporanReducer from "./formPelaporan/reducer";
import mapsReducer from "./maps/reducer";
import mapSebaranSampahReducer from "./mapSebaranSampah/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    formPelaporan: formPelaporanReducer,
    maps: mapsReducer,
    mapSebaranSampah: mapSebaranSampahReducer,
  },
});
