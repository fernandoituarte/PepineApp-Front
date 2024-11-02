import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

const initialState = {
  orders: [],
  order: null,
  status: "",
  loading: false,
  error: null,
  orderId: null,
  userOrders: [],
  isModal: false,
  reservationSuccess: false,
};

export const resetState = createAction("reset/state");

export const createOrderByUser = createAsyncThunk(
  "orders/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/orders`, order, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const orderHasProducts = createAsyncThunk(
  "orders/productsByOrders",
  async (cart, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/orders/products`, cart, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const updateOrder = createAsyncThunk(
  "Update/order",
  async ({ status, id }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${URL}/orders/${id}`,
        {
          status,
        },
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

export const getOrderById = createAsyncThunk(
  "get/orderById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/orders/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const getAllOrders = createAsyncThunk(
  "Get/AllOrders",
  async ({ params = " ", limit, offset }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/orders?limit=${limit}&offset=${offset}${params}`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const getOrdersByUser = createAsyncThunk(
  "Get/AllOrdersByUser",
  async ({ id, limit = 15, offset = 0 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/orders/user/${id}?limit=${limit}&offset=${offset}`,
        { withCredentials: true },
      );

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

// Delete order
export const deleteOrder = createAsyncThunk(
  "Delete/Order",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${URL}/orders/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const activeModal = createAction("active/modal");
export const reservationStatus = createAction("reservation/status");

const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetState, () => {
      return initialState;
    })
    .addCase(createOrderByUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(createOrderByUser.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.orderId = action.payload.orderId;
      state.loading = false;
    })
    .addCase(createOrderByUser.rejected, (state, action) => {
      state.status = action.payload.status;
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(orderHasProducts.pending, (state) => {
      state.loading = true;
    })
    .addCase(orderHasProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.reservationSuccess = true;
      state.isModal = true;
    })
    .addCase(orderHasProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = true;
      state.loading = false;
      state.reservationSuccess = false;
    })
    .addCase(reservationStatus, (state, action) => {
      state.reservationSuccess = false;
    })
    .addCase(updateOrder.pending, (state) => {
      state.loading = "loading";
      state.error = false;
    })
    .addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.order = action.payload.order;
    })
    .addCase(updateOrder.rejected, (state, action) => {
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
      state.loading = false;
    })
    .addCase(getOrderById.pending, (state, action) => {
      state.order = null;
      state.loading = true;
    })
    .addCase(getOrderById.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.order = action.payload.order;
      state.loading = false;
    })
    .addCase(getOrderById.rejected, (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    })
    .addCase(getAllOrders.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(getAllOrders.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.orders = {
        orders: action.payload.orders,
        totalOrders: action.payload.totalOrders,
        totalPages: action.payload.totalPages,
      };
      state.loading = false;
    })
    .addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    })
    .addCase(getOrdersByUser.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(getOrdersByUser.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.orders = {
        orders: action.payload.orders,
        totalOrders: action.payload.totalOrders,
        totalPages: action.payload.totalPages,
      };
      state.loading = false;
    })
    .addCase(getOrdersByUser.rejected, (state, action) => {
      state.loading = false;
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
    })
    .addCase(activeModal, (state, action) => {
      state.isModal = action.payload;
      state.reservationStatus = false;
    });
});
export default ordersReducer;
