import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

const initialState = {
  error: null,
  orders: [],
  userRole: null,
  userId: null,
  user: null,
  users: null,
  loading: false,
  loggedOut: false,
  status: "",
  isDeleted: false,
};

export const setUser = createAction("set/user");
export const clearUser = createAction("clear/user");
export const setStatus = createAction("set/status");
// Asynchronous action for user authentication
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/users/login`, credentials, {
        withCredentials: true,
      });
      console.log("Login", response.data.status);
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
      const response = await axios.delete("/api/logout");

      console.log("LogOut", response.statusText);
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "forgot/password",
  async (data, { rejectWithValue }) => {
    console.log("forgotPassword", data);
    try {
      const response = await axios.post(`${URL}/users/forgot-password`, data, {
        withCredentials: true,
      });

      console.log("forgotPassword", response.data.message);
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
      const response = await axios.post(`${URL}/users/reset-password`, data, {
        withCredentials: true,
      });

      console.log("resetPassword", response.data.message);
      return response.data.message;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);
export const updatePassword = createAsyncThunk(
  "update/password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/users/change-password`, data, {
        withCredentials: true,
      });
      console.log("updatePassword", response.data.message);
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
      const response = await axios.patch(`${URL}/users/${id}`, userInfo, {
        withCredentials: true,
      });

      console.log("updateUserDetails", response.data.data.u);
      return response.data.data.u;
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
      const response = await axios.get(`${URL}/orders/${id}`, {
        withCredentials: true,
      });
      console.log("getUserOrders", response.data);
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
      const response = await axios.get(`${URL}/users/${id}`, {
        withCredentials: true,
      });
      console.log("getUserById", response.data.data.user);
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
      const response = await axios.delete(`${URL}/users/${id}`, {
        withCredentials: true,
      });
      console.log("deleteAccount", response.data);
      return response.data.status;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getAllUsers = createAsyncThunk(
  "get/AllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/users`, {
        withCredentials: true,
      });
      console.log("getAllUsers", response.data.data.user);
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

//Reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = "logged";
      state.loggedOut = false;
      state.loading = false;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = true;
    })
    .addCase(setUser, (state, action) => {
      state.userRole = action.payload.role;
      state.userId = action.payload.id;
    })
    .addCase(clearUser, (state) => {
      state.userRole = null;
      state.userId = null;
    })
    .addCase(setStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(logOut.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(logOut.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loggedOut = true;
      state.loading = false;
      state.user = null;
    })
    .addCase(logOut.rejected, (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = true;
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
    .addCase(updatePassword.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(updatePassword.fulfilled, (state, action) => {
      state.status = "password updated";
      state.loading = false;
    })
    .addCase(updatePassword.rejected, (state, action) => {
      state.status = "password failed to update";
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
      state.user = {
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email: action.payload.email,
        phone: action.payload.phone,
        id: action.payload.id,
        created_at: action.payload.created_at,
      };
      state.loading = false;
    })
    .addCase(getUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(updateUserDetails.pending, (state, action) => {
      state.loading = true;
      state.status = "loqding";
    })
    .addCase(updateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = { ...state.user, ...action.payload.updatedUser };
      state.status = "user updated";
    })
    .addCase(updateUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = "user failed to update";
    })
    .addCase(deleteAccount.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteAccount.fulfilled, (state) => {
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
