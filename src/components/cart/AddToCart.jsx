"use client"; // Directs Next.js to only load this module in the client-side environment.

import { useAppSelector, useAppDispatch } from "@/hooks/redux"; // Import hooks for Redux state management and dispatch actions.
import { productQtySelector, increment } from "@/store/reducer/cart/cart"; // Import selector and action for handling cart operations.
import { Icon } from "@iconify/react"; // Import the Icon component to display icons.

export function AddToCart({ item }) {
  // Retrieve the quantity of the current item in the cart using a Redux selector.
  const qty = useAppSelector((state) => productQtySelector(state, item.id));
  // Get the dispatch function to send actions to the Redux store.
  const dispatch = useAppDispatch();

  // Render a disabled button if the item is not available.
  if (!item.status) {
    return (
      <button
        disabled
        className="flex max-w-xs w-full items-center justify-center rounded-md border border-transparent px-8 py-3 mt-3 mx-auto text-base font-medium text-white shadow-md transition duration-300 ease-in-out transform bg-orange-200"
      >
        Article non disponible
      </button>
    );
  }

  // Render an "Add to Cart" button if the quantity of the item is zero.
  if (!qty)
    return (
      <button
        type="button"
        onClick={() => dispatch(increment(item))} // Dispatch action to increment the item quantity in the cart.
        className="flex max-w-xs w-full items-center justify-center rounded-md border border-transparent px-8 py-3 mt-3 mx-auto text-base font-medium text-white shadow-md transition duration-300 ease-in-out transform bg-orange-400"
      >
        Ajouter au panier
      </button>
    );

  // Render a button indicating the item is in the cart if the quantity is greater than zero.
  return (
    <button
      type="button"
      onClick={() => dispatch(increment(item))} // Dispatch action to increment the item quantity in the cart.
      className="flex max-w-xs w-full items-center justify-center rounded-md border border-transparent px-8 py-3 mt-3 mx-auto text-base font-medium text-white shadow-md transition duration-300 ease-in-out transform bg-green-500"
    >
      {/* Icon and label indicating the item is already in the cart. */}
      <Icon size={20} icon="akar-icons:check" className="mr-2 font-bold" /> Dans
      le panier
    </button>
  );
}
