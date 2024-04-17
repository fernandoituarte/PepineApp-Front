import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isCartChanged: false,
};

export const increment = createAction("Increment/product");
export const decrement = createAction("Decrement/product");
export const setCartItems = createAction("update/cart");

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      const item = state.cartItems.find(
        (el) => el.product.id === action.payload.id,
      );
      if (item) {
        item.qty++;
      } else {
        state.cartItems.push({ product: action.payload, qty: 1 });
      }
      state.cartItems = state.cartItems.filter(
        (item) => item.product.status !== false && item.product.stock > 0,
      );
    })
    .addCase(decrement, (state, action) => {
      const item = state.cartItems.find(
        (el) => el.product.id === action.payload.id,
      );
      if (item) {
        item.qty--;
        if (item.qty === 0) {
          state.cartItems = state.cartItems.filter(
            (el) => el.product.id !== action.payload.id,
          );
        }
      }
      state.cartItems = state.cartItems.filter(
        (item) =>
          item.qty > 0 &&
          item.product.status !== false &&
          item.product.stock > 0,
      );
    })
    .addCase(setCartItems, (state, action) => {
      state.cartItems = action.payload;
    });
});

const cartItems = (state) => state.cart.cartItems;
export const totalCartItemSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce((total, curr) => (total += curr.qty), 0),
);
export const totalPriceSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce((total, curr) => total + curr.qty * curr.product.price, 0),
);

export const productQtySelector = createSelector(
  [cartItems, (cartItems, productId) => productId],
  (cartItems, productId) =>
    cartItems.find((el) => el.product.id === productId)?.qty,
);
export default cartReducer;
