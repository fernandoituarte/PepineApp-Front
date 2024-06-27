import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

// Création d'une action asynchrone pour récupérer la liste des commandes
export const getOrdersList = createAsyncThunk("ordersList", async () => {
  try {
    const response = await axios.get(`${URL}/orders`, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    return response.data.data.order;
  } catch (error) {
    throw rejectWithValue(error.response.data);
  }
});
// Création d'une commande par le client
export const createOrderByUser = createAsyncThunk(
  "orders/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/orders`, order, {
        withCredentials: true,
      });

      return response.data.data.o[0];
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

// rattacher les produits du client à une commande
export const orderHasProducts = createAsyncThunk(
  "orders/productsByOrders",
  async (cart) => {
    try {
      const response = await axios.post(`${URL}/orders/details`, cart, {
        withCredentials: true,
      });

      return response.data.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

// Création d'une action asynchrone pour mettre à jour le statut d'une commande
export const changeStatus = createAsyncThunk(
  "changeStatus",
  async ({ status, id }) => {
    try {
      const response = await axios.patch(
        `${URL}/orders/${id}/update-status`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data.status;
    } catch (error) {
      throw error;
    }
  }
);

// récupérer les orders d'un user
export const ordersOfOneUser = createAsyncThunk(
  "users/ordersOfOneUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/users/${id}/orders`, {
        withCredentials: true,
      });
      return response.data.data.user;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "get/orderById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/orders/${id}`, {
        withCredentials: true,
      });

      return response.data.data.order;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);
export const activeModal = createAction("active/modal");
export const isChanged = createAction("change/quantity");
export const reservationStatus = createAction("reservation/status");

// Initialisation de l'état des commandes
const initialState = {
  orders: [],
  order: null,
  orderStatus: null,
  loading: false,
  error: null,
  orderId: null,
  userOrders: [],
  isModal: false,
  isChanged: false,
  isOrderSended: false,
  reservationSuccess: false,
};

const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOrdersList.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(getOrdersList.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.orders = action.payload;
      state.loading = false;
    })
    .addCase(getOrdersList.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(createOrderByUser.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(createOrderByUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.orderId = action.payload.id;
      state.isOrderSended = true;
      state.loading = false;
      state.isModal = true;
    })
    .addCase(createOrderByUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(orderHasProducts.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(orderHasProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isOrderSended = false;
      state.loading = false;
      state.reservationSuccess = true;
    })
    .addCase(orderHasProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
      state.reservationSuccess = false;
    })
    .addCase(reservationStatus, (state, action) => {
      state.reservationSuccess = false;
    })
    .addCase(changeStatus.pending, (state) => {
      state.status = "loading";
      state.loading = true;
      state.isChanged = false;
    })
    .addCase(changeStatus.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.orderStatus = action.payload;
    })
    .addCase(changeStatus.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(ordersOfOneUser.pending, (state, action) => {
      state.status = "loading";
      state.orderStatus = null;
      state.loading = true;
    })
    .addCase(ordersOfOneUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.userOrders = action.payload;
      state.loading = false;
    })
    .addCase(ordersOfOneUser.rejected, (state, action) => {
      state.status = "failed";
      state.loading = false;
    })
    .addCase(getOrderById.pending, (state, action) => {
      state.status = "loading";
      state.orderStatus = null;
      state.loading = true;
      state.error = false;
    })
    .addCase(getOrderById.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.order = action.payload;
      state.loading = false;
    })
    .addCase(getOrderById.rejected, (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = true;
    })
    .addCase(activeModal, (state, action) => {
      state.isModal = action.payload;
      state.reservationStatus = false;
    })
    .addCase(isChanged, (state, action) => {
      state.isChanged = action.payload;
    });
});
export default ordersReducer;
