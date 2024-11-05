"use client";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { setCartItems } from "@/store/reducer/cart/cart";
import { setUserSession } from "@/store/reducer/auth/auth";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export function SessionStorageManager() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const savedCart = getCookie("cart");
    if (savedCart) {
      dispatch(setCartItems(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setCookie("cart", JSON.stringify(cartItems), {
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }
  }, [cartItems]);

  useEffect(() => {
    if (cartItems && cartItems.length === 0) {
      deleteCookie("cart");
    }
  }, [cartItems]);

  useEffect(() => {
    const savedUser = getCookie("user");

    if (savedUser) {
      dispatch(setUserSession(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  return null;
}
