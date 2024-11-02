import axios from "axios";
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

const URL = process.env.NEXT_PUBLIC_URL;

const initialState = {
  status: null,
  loading: false,
  error: null,
  products: null,
  product: null,
};

export const resetProductState = createAction("Reset/Product-State");
//Create a new product
export const addNewProduct = createAsyncThunk(
  "products/addNew",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/products`, product, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const getAllProducts = createAsyncThunk(
  "Get/AllProducts",
  async ({ limit = 16, offset = 0 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/products?limit=${limit}&offset=${offset}`,
      );
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const getProductById = createAsyncThunk(
  "Get/product/byId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/products/${id}`);

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

//Update a product
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, update }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${URL}/products/${id}`, update, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

//Delete a product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${URL}/products/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetProductState, () => {
      return initialState;
    })
    .addCase(addNewProduct.pending, (state) => {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    })
    .addCase(addNewProduct.fulfilled, (state, action) => {
      state.status = "The product has been successfully registered.";
      state.loading = false;
      state.error = null;
    })
    .addCase(addNewProduct.rejected, (state, action) => {
      state.status = action.payload.statusCode;
      state.loading = false;
      state.error = action.payload.message;
    })
    .addCase(getAllProducts.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.products = {
        products: action.payload.products,
        totalPages: action.payload.totalPages,
        totalProducts: action.payload.totalProducts,
      };
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    })
    .addCase(getAllProducts.rejected, (state, action) => {
      state.status = action.payload.status;
      state.loading = false;
      state.rejected = true;
    })
    .addCase(getProductById.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getProductById.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.product = action.payload.product;
      state.loading = false;
    })
    .addCase(getProductById.rejected, (state, action) => {
      state.status = action.payload.statusCode;
      state.loading = false;
      state.error = true;
    })
    .addCase(updateProduct.pending, (state, action) => {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.status = "Product updated successfully";
      state.loading = false;
      state.error = null;
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.status = action.payload.statusCode;
      state.loading = false;
      state.error = action.payload.message;
    })
    .addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteProduct.fulfilled, (state) => {
      state.loading = false;
      state.status = "product deleted successfully";
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.status = "product deleted rejected";
      state.error = action.payload.message;
    });
});

export default productReducer;
