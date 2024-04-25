// Import necessary hooks and functions from React, Redux toolkit, and local utilities.
"use client";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { setCartItems } from "@/store/reducer/cart/cart";

// Define a functional component to manage cart data storage.
function CartStorageManager() {
  // Hook to dispatch actions in Redux.
  const dispatch = useAppDispatch();
  // Retrieve the current state of cart items from the Redux store.
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  // Effect hook to initialize the cart state from localStorage when the component mounts.
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    // Check if there is saved cart data in localStorage.
    if (savedCart) {
      // If there is, parse the JSON string and update the Redux store with it.
      dispatch(setCartItems(JSON.parse(savedCart)));
    }
  }, [dispatch]); // Dependency array with dispatch to ensure effect runs only when dispatch function changes.

  // Effect hook to save the cart items to localStorage whenever the cartItems state changes.
  useEffect(() => {
    const cartData = JSON.stringify(cartItems);
    // Convert the cartItems object into a JSON string and store it in localStorage.
    localStorage.setItem("cart", cartData);
  }, [cartItems]); // Dependency array with cartItems to ensure effect runs whenever cartItems changes.

  // Since this component does not need to render anything, return null.
  return null;
}

// Export the component for use in other parts of the application.
export default CartStorageManager;
