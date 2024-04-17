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
  error: null,
  loading: false,
  status: "",
};

const registerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerUser.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(registerUser.fulfilled, (state) => {
      state.status = "registered";
      state.loading = false;
    })
    .addCase(registerUser.rejected, (state) => {
      state.status = "failed";
      state.loading = false;
    });
});

export default registerReducer;
