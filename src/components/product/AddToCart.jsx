"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { productQtySelector, increment } from "@/store/reducer/cart/cart";
import { useState, useEffect } from "react";

/**
 * AddToCart component handles adding items to the shopping cart and dynamically changes its display
 * based on the item's presence in the cart, loading state, and availability.
 *
 * @param {Object} item - The product item to be added to the cart.
 * @returns A button that handles adding items to the cart or shows appropriate status.
 */

export function AddToCart({ item }) {
  const qty = useAppSelector((state) => productQtySelector(state, item.id));
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <button
        type="button"
        className="flex max-w-xs w-full items-center justify-center rounded-md border border-transparent px-8 py-3 mx-auto mt-3 text-base font-medium text-white shadow-md transition duration-300 ease-in-out transform bg-[#5c7969]"
      >
        Chargement...
      </button>
    );
  }

  if (!qty) {
    return (
      <button
        type="button"
        onClick={() => dispatch(increment(item))}
        className="flex max-w-xs w-full items-center justify-center rounded-md border border-transparent px-8 py-3 mx-auto mt-3 text-base font-medium text-white shadow-md transition duration-300 ease-in-out transform bg-[#5c7969]"
      >
        Ajouter au panier
      </button>
    );
  }

  if (qty) {
    return (
      <button
        type="button"
        onClick={() => dispatch(increment(item))}
        disabled
        className="flex max-w-xs w-full items-center justify-center rounded-md border border-transparent px-8 py-3 mx-auto mt-3 text-base font-medium text-white shadow-md transition duration-300 ease-in-out transform bg-[#5c7969a6]"
      >
        Dans le panier
      </button>
    );
  }

  if (!item.status) {
    return (
      <button
        disabled
        className="flex max-w-xs w-full items-center justify-center rounded-md border border-transparent px-8 py-3 mx-auto mt-3 text-base font-medium text-white shadow-md transition duration-300 ease-in-out transform bg-green-200"
      >
        Article non disponible
      </button>
    );
  }
}
