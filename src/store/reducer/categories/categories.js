import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  categoryId: null,
  products: [],
  status: "idle",
  error: null,
  loading: false,
  fulfilled: false,
  rejected: false,
};
const URL = process.env.NEXT_PUBLIC_URL;

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const response = await axios.get(`${URL}/categories`);
    const data = response.data.data.category;
    return data;
  },
);
export const fetchCategoriesById = createAsyncThunk(
  "categories/fetchById",
  async (id) => {
    const response = await axios.get(`${URL}/categories/${id}/products`);
    const data = response.data.data.category;
    return data;
  },
);

const categoriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCategories.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.categories = action.payload;
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.status = "error";
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(fetchCategoriesById.pending, (state, action) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(fetchCategoriesById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(fetchCategoriesById.rejected, (state, action) => {
      state.status = "error";
      state.loading = false;
      state.products = action.payload;
    });
});

export default categoriesReducer;
