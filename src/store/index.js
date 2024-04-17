import { configureStore, createReducer } from "@reduxjs/toolkit";

import productsReducer from "./reducer/products/products";
import categoriesReducer from "./reducer/categories/categories";
import mediaReducer from "./reducer/products/media/media";

import registerReducer from "./reducer/auth/register";
import userReducer from "./reducer/auth/login";

import ordersReducer from "./reducer/orders/orders";
import cartReducer from "./reducer/cart/cart";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    media: mediaReducer,
    register: registerReducer,
    user: userReducer,
    orders: ordersReducer,
    cart: cartReducer,
  },
});

export default store;
