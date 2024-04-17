import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

// Asynchronous action for user authentication
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users", credentials);
      return response.data.status;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);
export const logOut = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/api/users");

      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "forgot/password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/users/forgot-password`, data);

      return response.data.message;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);
export const resetPassword = createAsyncThunk(
  "reset/password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/users/reset-password`, data);

      return response.data.message;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);
// Asynchronous action to update user details
export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async ({ userInfo, id }, { rejectWithValue }) => {
    try {
      console.log(userInfo);
      const response = await axios.patch(`/api/users/${id}`, userInfo);

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

// Asynchronous action to get user orders
export const getUserOrders = createAsyncThunk(
  "user/getUserOrders",
  async (id) => {
    try {
      const response = await axios.get(`${URL}/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

// Asynchronous action to get user details by name
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      return response.data.data.user;
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getAllUsers = createAsyncThunk(
  "get/AllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users`);
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  logged: false,
  error: null,
  orders: [],
  user: null,
  users: null,
  loading: false,
  status: "",
  isDeleted: false,
};

//Reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.logged = true;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = true;
      state.logged = false;
    })
    .addCase(logOut.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(logOut.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.logged = false;
    })
    .addCase(logOut.rejected, (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = true;
      state.logged = true;
    })
    .addCase(forgotPassword.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(forgotPassword.fulfilled, (state, action) => {
      state.status = "email sended";
      state.loading = false;
    })
    .addCase(forgotPassword.rejected, (state, action) => {
      state.status = "email rejected";
      state.loading = false;
      state.error = true;
    })
    .addCase(resetPassword.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.status = "reset succeeded";
      state.loading = false;
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.status = "reset failed";
      state.loading = false;
      state.error = true;
    })
    .addCase(getUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    })
    .addCase(getUserById.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(getUserById.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase(getUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(updateUserDetails.pending, (state, action) => {
      state.loading = true;
      state.status = "updated";
    })
    .addCase(updateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = { ...state.user, ...action.payload.updatedUser };
      state.status = "updated";
    })
    .addCase(updateUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteAccount.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteAccount.fulfilled, (state) => {
      state.token = null;
      state.logged = false;
      state.error = null;
      state.orders = [];
      state.user = null;
      state.isDeleted = true;
    })
    .addCase(deleteAccount.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
    });
});
export default userReducer;
