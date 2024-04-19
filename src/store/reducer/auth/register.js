import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

export const registerUser = createAsyncThunk(
  "user/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/users/register`, formData);
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  error: false,
  loading: false,
  status: "",
};

const registerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerUser.pending, (state) => {
      state.status = "loading";
      state.error = false;
      state.loading = true;
    })
    .addCase(registerUser.fulfilled, (state) => {
      state.status = "registered";
      state.loading = false;
    })
    .addCase(registerUser.rejected, (state) => {
      state.status = "failed";
      state.loading = false;
      state.error = true;
    });
});

export default registerReducer;
