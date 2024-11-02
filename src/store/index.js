import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducer/auth/auth";
import cartReducer from "./reducer/cart/cart";
import mediaReducer from "./reducer/media/media";
import ordersReducer from "./reducer/orders/orders";
import productReducer from "./reducer/products/product";
import categoriesReducer from "./reducer/categories/categories";
import userReducer from "./reducer/user/user";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    media: mediaReducer,
    orders: ordersReducer,
    product: productReducer,
    category: categoriesReducer,
    user: userReducer,
  },
});

export default store;
