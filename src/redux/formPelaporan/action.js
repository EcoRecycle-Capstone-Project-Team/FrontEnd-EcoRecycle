import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOwnProfile } from "../../utils/api";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (token, thunkAPI) => {
    try {
      const response = await getOwnProfile(token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
