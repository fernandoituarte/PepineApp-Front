"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { productQtySelector, increment } from "@/store/reducer/cart/cart";
import { Icon } from "@iconify/react";

export function AddToCart({ item }) {
  const qty = useAppSelector((state) => productQtySelector(state, item.id));
  const dispatch = useAppDispatch();

  if (!item.status) {
    return (
      <button
        disabled
        className={
          "flex max-w-xs w-full items-center justify-center rounded-md border border-transparent px-8 py-3 mt-3 mx-auto text-base font-medium text-white shadow-md transition duration-300 ease-in-out transform bg-orange-200"
        }
      >
        Article non disponible
      </button>
    );
  }
  if (!qty)
    return (
      <button
        type="button"
        onClick={() => dispatch(increment(item))}
        className={
          "flex max-w-xs w-full items-center justify-center rounded-md border border-transparent px-8 py-3 mt-3 mx-auto text-base font-medium text-white shadow-md transition duration-300 ease-in-out transform bg-orange-400"
        }
      >
        Ajouter au panier
      </button>
    );
  return (
    <button
      type="button"
      onClick={() => dispatch(increment(item))}
      className={
        "flex max-w-xs w-full items-center justify-center rounded-md border border-transparent px-8 py-3 mt-3 mx-auto text-base font-medium text-white shadow-md transition duration-300 ease-in-out transform bg-green-500"
      }
    >
      <Icon size={20} icon="akar-icons:check" className="mr-2 font-bold" /> Dans
      le panier
    </button>
  );
}
