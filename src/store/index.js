import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./reducer/products/product";
import productCategories from "./reducer/products/update-categories/productCategories";
import mediaReducer from "./reducer/products/media/media";

import registerReducer from "./reducer/auth/register";
import userReducer from "./reducer/auth/login";

import ordersReducer from "./reducer/orders/orders";
import cartReducer from "./reducer/cart/cart";

const store = configureStore({
  reducer: {
    product: productReducer,
    productCategories: productCategories,
    media: mediaReducer,
    register: registerReducer,
    user: userReducer,
    orders: ordersReducer,
    cart: cartReducer,
  },
});

export default store;
