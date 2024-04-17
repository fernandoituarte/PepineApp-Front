"use client";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { setCartItems } from "@/store/reducer/cart/cart";

function CartStorageManager() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCartItems(JSON.parse(savedCart)));
    }
  }, [dispatch]);
  useEffect(() => {
    const cartData = JSON.stringify(cartItems);
    localStorage.setItem("cart", cartData);
  }, [cartItems]);

  return null;
}

export default CartStorageManager;
