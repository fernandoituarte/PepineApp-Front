import {
  createAsyncThunk,
  createReducer,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

const initialState = {
  error: null,
  loading: false,
  user: null,
  logged: false,
  status: "",
  message: "",
};

export const resetAuthState = createAction("Reset/authState");
export const setUserSession = createAction("Set/UserSession");

// Create user
export const registerUser = createAsyncThunk(
  "create/user",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/auth/register`, formData, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/auth/login`, credentials, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  },
);
export const logOut = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/api/logout");

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);
export const forgotPassword = createAsyncThunk(
  "forgot/password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/auth/forgot-password`, data);

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);
export const resetPassword = createAsyncThunk(
  "reset/password",
  async (data, { rejectWithValue }) => {
    const { token, password } = data;
    try {
      const response = await axios.post(`${URL}/auth/reset-password/${token}`, {
        password,
      });
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const updatePassword = createAsyncThunk(
  "update/password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/auth/update-password`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);
const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetAuthState, (state) => {
      state.status = "";
      state.error = null;
      state.logged = false;
      state.loading = false;
      state.message = "";
    })
    .addCase(setUserSession, (state, action) => {
      state.user = action.payload.user;
      state.logged = action.payload.logged;
    })
    .addCase(registerUser.pending, (state) => {
      state.status = "loading";
      state.error = false;
      state.loading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.user = action.payload.user;
      state.logged = true;
      state.loading = false;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.status = action.payload.statusCode;
      state.loading = false;
      state.error = true;
    })
    .addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.user = action.payload.user;
      state.logged = true;
      state.loading = false;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = action.payload.status;
      state.error = action.payload.message;
      state.loading = false;
    })
    .addCase(logOut.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(logOut.fulfilled, (state, action) => {
      return initialState;
    })
    .addCase(logOut.rejected, (state, action) => {
      state.status = action.payload.status;
      state.loading = false;
      state.error = true;
    })
    .addCase(forgotPassword.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(forgotPassword.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.loading = false;
    })
    .addCase(forgotPassword.rejected, (state, action) => {
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
      state.loading = false;
    })
    .addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.loading = false;
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.status = action.payload.statusCode;
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
      state.error = action.payload.message;
      state.loading = false;
    });
});

export default authReducer;
