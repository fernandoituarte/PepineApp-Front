import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

const initialState = {
  user: null,
  users: null,
  error: false,
  loading: false,
  status: "",
};

export const resetUserState = createAction("Reset/State");

// Get user by id
export const getUserById = createAsyncThunk(
  "Get/UserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/users/${id}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

// Get all users
export const getAllUsers = createAsyncThunk(
  "Get/AllUsers",
  async ({ limit = 15, offset = 0 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/users?limit=${limit}&offset=${offset}`,
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

// Update user
export const updateUser = createAsyncThunk(
  "update/user",
  async ({ userInfo, id }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${URL}/users/${id}`, userInfo, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

// Delete user
export const deleteAccount = createAsyncThunk(
  "delete/user",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${URL}/users/${id}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);
// Reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetUserState, () => {
      return initialState;
    })
    .addCase(getUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.status = action.payload.status;
    })
    .addCase(getUserById.rejected, (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    })
    .addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateUser.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "user updated";
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      state.status = "user failed to update";
    })
    .addCase(deleteAccount.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteAccount.fulfilled, (state) => {
      state.status = "Account deleted";
      state.error = null;
    })
    .addCase(deleteAccount.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
});
export default userReducer;
