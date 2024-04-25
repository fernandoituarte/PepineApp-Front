// Required modules import
import axios from "axios";
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

// Base API URL from environment variables
const URL = process.env.NEXT_PUBLIC_URL;

// Initial state for the product slice
const initialState = {
  status: "",
  loading: false,
  error: null,
  categories: [],
  isModal: false,
  isCategorySended: false,
};

// Actions for product categories
export const addCategory = createAction("add/category");
export const deleteCategory = createAction("delete/category");
export const emptyCategories = createAction("empty/categories");

// Action to toggle modal visibility
export const activeModal = createAction("active/modal");

// Thunk to add a category to a product
export const productCategory = createAsyncThunk(
  "product/addCategory",
  async (category) => {
    try {
      const response = await axios.post(`/api/products/categories`, category);
      return response.data.product;
    } catch (error) {
      throw error;
    }
  },
);

// Thunk to delete a product category
export const deleteProductCategory = createAsyncThunk(
  "product/deleteCategory",
  async (id) => {
    try {
      const response = await axios.delete(`/api/products/categories/${id}`);
      return response.data; // Assuming this method returns something relevant
    } catch (error) {
      throw error;
    }
  },
);

const categoriesByProductReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(activeModal, (state, action) => {
      state.isModal = action.payload;
      if (action.payload === false) {
        state.categories = [];
        state.isCategorySended = false;
        state.status = "";
      }
    })
    .addCase(productCategory.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(productCategory.fulfilled, (state, action) => {
      state.status = "add category success";
      state.loading = false;
      state.isCategorySended = true;
      state.isModal = true;
    })
    .addCase(productCategory.rejected, (state, action) => {
      state.loading = false;
      state.status = "add category rejected";
      state.isCategorySended = true;
      state.error = action.error.message;
      state.isModal = true;
    })
    .addCase(deleteProductCategory.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(deleteProductCategory.fulfilled, (state, action) => {
      state.status = "delete category success";
      state.loading = false;
    })
    .addCase(deleteProductCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.status = "delete category rejected";
    })
    .addCase(addCategory, (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    })
    .addCase(deleteCategory, (state, action) => {
      state.categories = state.categories.filter((id) => id !== action.payload);
    })
    .addCase(emptyCategories, (state) => {
      state.categories = [];
    });
});

export default categoriesByProductReducer;
