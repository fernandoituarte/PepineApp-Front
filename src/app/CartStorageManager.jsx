"use client";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { setCartItems } from "@/store/reducer/cart/cart";

// Define a functional component to manage cart data storage.
function CartStorageManager() {
  const dispatch = useAppDispatch();
  // Retrieve the current state of cart items from the Redux store.
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  // Effect hook to initialize the cart state from localStorage when the component mounts.
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCartItems(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  // Effect hook to save the cart items to localStorage whenever the cartItems state changes.
  useEffect(() => {
    const cartData = JSON.stringify(cartItems);

    localStorage.setItem("cart", cartData);
  }, [cartItems]);

  // Since this component does not need to render anything, return null.
  return null;
}

export default CartStorageManager;
