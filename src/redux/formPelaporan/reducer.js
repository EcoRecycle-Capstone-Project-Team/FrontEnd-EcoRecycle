import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile } from "./action";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userProfile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchProfile.pending]: (state) => {
      state.loading = true;
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
      state.loading = false;
    },
    [fetchProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default profileSlice.reducer;
