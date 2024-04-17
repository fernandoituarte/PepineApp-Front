import axios from "axios";
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import { notFound } from "next/navigation";

const URL = process.env.NEXT_PUBLIC_URL;

const initialState = {
  products: [],
  product: null,
  media: [],
  mediaOrder: [],
  categoriesByProduct: [],
  productToUpdate: null,
  productId: null,
  isProductSended: false,
  isCategorySended: false,
  isCategoryDeleted: false,
  isModal: false,
  loading: false,
  error: null,
};

//Get all Products
export const fetchProduits = createAsyncThunk("produits/fetch", async () => {
  try {
    const response = await axios.get("/api/products");
    const data = response.data.data.product;
    return data;
  } catch (error) {
    throw error;
  }
});
// export const getProductById = createAsyncThunk("product/byID", async (id) => {
//   try {
//     const response = await axios.get(`/api/products/${id}`);
//     const data = response.data.data.product;
//     return data;
//   } catch (error) {
//     throw notFound();
//   }
// });

export const deleteProductToUpdate = createAction("delete/productToUpdate");
export const getProductByIdToUpdate = createAsyncThunk(
  "Get/product/toUpdate",
  async (id) => {
    try {
      const response = await axios.get(`/api/products/update/${id}`);
      const data = response.data.data.product;
      return data;
    } catch (error) {
      throw notFound();
    }
  }
);

//Add a new Product
export const statusProduct = createAction("status/product");
export const addNewProduct = createAsyncThunk(
  "Products/add",
  async (product) => {
    try {
      const response = await axios.post("/api/products/", product);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
//Update a Product
export const updateProduct = createAsyncThunk(
  "Product/update",
  async ({ id, update }) => {
    try {
      const response = await axios.patch(`/api/products/${id}`, update);
      return response.data.data.product;
    } catch (error) {
      throw error;
    }
  }
);

//CATEGORY

//Add a category into the product
export const addCategory = createAction("add/category");
export const deleteCategory = createAction("delete/category");
export const emptyCategories = createAction("empty/categories");
export const productCategory = createAsyncThunk(
  "addProduct /category",
  async (category) => {
    try {
      const response = await axios.post("/api/products/categories", category);
      return response.data.data.product;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProductCategory = createAsyncThunk(
  "update/category",
  async (category) => {
    const { product_id } = category;
    const id = product_id;
    try {
      const response = await axios.patch(
        `/api/products/categories/${id}`,
        category
      );

      return response.data.data.product;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteProductCategory = createAsyncThunk(
  "Delete/Category",
  async (id) => {
    try {
      const response = await axios.delete(`/api/products/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
//Modal
export const activeModal = createAction("active/modal");

const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchProduits.pending, (state, action) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(fetchProduits.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(fetchProduits.rejected, (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = action.error.message;
    })
    // .addCase(getProductById.pending, (state, action) => {
    //   state.status = "loading";
    //   state.loading = true;
    // })
    // .addCase(getProductById.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.loading = false;
    //   state.product = action.payload;
    // })
    // .addCase(getProductById.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.loading = false;
    //   state.error = true;
    // })
    .addCase(getProductByIdToUpdate.pending, (state, action) => {
      state.status = "loading";
      state.loading = true;
    })
    .addCase(getProductByIdToUpdate.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.productToUpdate = action.payload;
      action.payload.category_id.forEach((category) => {
        if (!state.categoriesByProduct.includes(category)) {
          state.categoriesByProduct.push(category);
        }
      });
    })
    .addCase(getProductByIdToUpdate.rejected, (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(addNewProduct.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(addNewProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.productId = action.payload.p[0].id;
      state.products.push(action.payload);
      state.isProductSended = true;
      state.isModal = true;
    })
    .addCase(addNewProduct.rejected, (state, action) => {
      state.loading = false;
      state.rejected = true;
      state.error = action.payload;
    })
    .addCase(updateProduct.pending, (state, action) => {
      state.loading = true;
      state.isProductSended = false;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.isProductSended = true;
      state.isModal = true;
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.rejected = true;
      state.isProductSended = false;
    })
    .addCase(activeModal, (state, action) => {
      state.isModal = action.payload;
      state.products = [];
      state.media = [];
      state.categoriesByProduct = [];
      state.productToUpdate = null;
      state.isProductSended = false;
      state.isCategorySended = false;
      state.isCategoryDeleted = false;
    })
    .addCase(productCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(productCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.isCategorySended = true;
    })
    .addCase(productCategory.rejected, (state, action) => {
      state.loading = false;
      state.rejected = true;
      state.error = action.error.message;
    })
    .addCase(deleteProductCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteProductCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.isCategoryDeleted = true;
    })
    .addCase(deleteProductCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(addCategory, (state, action) => {
      if (!state.categoriesByProduct.includes(action.payload)) {
        state.categoriesByProduct.push(action.payload);
      }
    })
    .addCase(deleteCategory, (state, action) => {
      state.categoriesByProduct = state.categoriesByProduct.filter(
        (id) => id !== action.payload
      );
    })
    .addCase(emptyCategories, (state, action) => {
      state.categoriesByProduct = [];
    })
    .addCase(deleteProductToUpdate, (state, action) => {
      state.productToUpdate = null;
    })
    .addCase(statusProduct, (state, action) => {
      state.isProductSended = action.payload;
      if (action.payload === false) {
        state.isCategoryDeleted = false;
      }
    });
});

export default productsReducer;
