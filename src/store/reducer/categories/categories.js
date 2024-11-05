import axios from "axios";
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

const URL = process.env.NEXT_PUBLIC_URL;

const initialState = {
  status: "",
  loading: false,
  error: null,
  products: null,
  categories: null,
  category: null,
  totalPages: null,
  isModal: false,
};

export const resetProductState = createAction("Reset/Product-State");
//Create a new product
export const createCategory = createAsyncThunk(
  "Create/category",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/categories`, category, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const getAllCategories = createAsyncThunk(
  "Get/AllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/categories`);
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const getCategoryById = createAsyncThunk(
  "Get/category/byId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/categories/${id}`);

      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

//Update a product
export const updateCategory = createAsyncThunk(
  "Update/category",
  async ({ id, update }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${URL}/products/${id}`, update, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const getProductsByCategory = createAsyncThunk(
  "Get/Products/byCategory",
  async ({ id, limit = 16, offset = 0 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/categories/${id}/products?limit=${limit}&offset=${offset}`,
      );
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

//Delete a product
export const deleteCategory = createAsyncThunk(
  "Delete/category",
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

const categoriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetProductState, () => {
      return initialState;
    })
    .addCase(createCategory.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(createCategory.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.loading = false;
      state.isModal = true;
    })
    .addCase(createCategory.rejected, (state, action) => {
      state.status = action.payload.status;
      state.loading = false;
      state.error = true;
    })
    .addCase(getAllCategories.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.status = "loading";
    })
    .addCase(getAllCategories.fulfilled, (state, action) => {
      console.log(action.payload);
      state.status = action.payload.status;
      state.categories = action.payload.categories;
      state.loading = false;
    })
    .addCase(getAllCategories.rejected, (state, action) => {
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
      state.loading = false;
    })
    .addCase(getCategoryById.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getCategoryById.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.category = action.payload.category;
      state.loading = false;
    })
    .addCase(getCategoryById.rejected, (state, action) => {
      state.status = action.payload.statusCode;
      state.loading = false;
      state.rejected = true;
    })
    .addCase(updateCategory.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.loading = false;
      state.isModal = true;
    })
    .addCase(updateCategory.rejected, (state, action) => {
      state.status = "update category rejected";
      state.loading = false;
      state.rejected = true;
    })
    .addCase(getProductsByCategory.pending, (state, action) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(getProductsByCategory.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.products = action.payload.products;
      state.loading = false;
    })
    .addCase(getProductsByCategory.rejected, (state, action) => {
      state.status = action.payload.statusCode;
      state.loading = false;
      state.rejected = true;
    })
    .addCase(deleteCategory.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteCategory.fulfilled, (state) => {
      state.loading = false;
      state.status = "Category deleted successfully";
    })
    .addCase(deleteCategory.rejected, (state) => {
      state.loading = false;
      state.status = "Category deleted rejected";
    });
});

export default categoriesReducer;
