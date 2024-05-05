import axios from "axios";
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import { notFound } from "next/navigation";

// Initial state for the product slice
const initialState = {
  status: "",
  loading: false,
  error: null,
  products: [],
  product: null,
  isProductSended: false,
  productId: null,
  categoriesByProduct: [],
  productToUpdate: null,
  isModal: false,
};

// Thunk for fetching all products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  try {
    const response = await axios.get("/api/products");
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
});

// Action to clear the 'productToUpdate' state
export const deleteProductToUpdate = createAction("delete/productToUpdate");

// Action to mark a product operation status
export const statusProduct = createAction("status/product");

//CRUD product

// Thunk to fetch a single product by ID for updating
export const getProductByIdToUpdate = createAsyncThunk(
  "product/getByIdToUpdate",
  async (id) => {
    try {
      const response = await axios.get(`/api/products/update/${id}`);
      const data = response.data.data.product;
      return data;
    } catch (error) {
      throw notFound();
    }
  },
);

// Thunk to update a product
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, update }) => {
    try {
      const response = await axios.patch(`/api/products/${id}`, update);
      return response.data.product;
    } catch (error) {
      throw error;
    }
  },
);
// Thunk to add a new product
export const addNewProduct = createAsyncThunk(
  "products/addNew",
  async (product) => {
    try {
      const response = await axios.post("/api/products", product);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
);

// Thunk to delete a product
export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  try {
    const response = await axios.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchProducts.pending, (state, action) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.products = action.payload.data.product;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.status = "fetch product rejected";
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(deleteProductToUpdate, (state, action) => {
      state.status = "";
      state.productToUpdate = null;
    })
    .addCase(statusProduct, (state, action) => {
      state.isProductSended = action.payload;
      if (action.payload === false) {
        state.isCategoryDeleted = false;
      }
    })
    .addCase(getProductByIdToUpdate.pending, (state, action) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(getProductByIdToUpdate.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.productToUpdate = action.payload;
    })
    .addCase(getProductByIdToUpdate.rejected, (state, action) => {
      state.status = "get product by id rejected";
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(updateProduct.pending, (state) => {
      state.status = "loading";
      state.loading = true;
      state.isProductSended = false;
    })
    .addCase(updateProduct.fulfilled, (state) => {
      state.status = "product updated";
      state.loading = false;
      state.isProductSended = true;
      state.isModal = true;
    })
    .addCase(updateProduct.rejected, (state) => {
      state.status = "update product rejected";
      state.loading = false;
      state.rejected = true;
      state.isProductSended = false;
    })
    .addCase(addNewProduct.pending, (state) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(addNewProduct.fulfilled, (state, action) => {
      state.status = "add product succeeded";
      state.loading = false;
      state.productId = action.payload.p[0].id;
      state.products.push(action.payload);
      state.isProductSended = true;
      state.isModal = true;
    })
    .addCase(addNewProduct.rejected, (state, action) => {
      state.status = "add product rejected";
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    })
    .addCase(deleteProduct.fulfilled, (state) => {
      state.loading = false;
      state.status = "product deleted successfully";
    })
    .addCase(deleteProduct.rejected, (state) => {
      state.loading = false;
      state.status = "product deleted rejected";
    });
});

export default productReducer;
