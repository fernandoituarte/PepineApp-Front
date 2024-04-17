"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { productQtySelector, increment } from "@/store/reducer/cart/cart";

export function QtyBtn({ onIncrease, onDecrease, qty }) {
  return (
    <div className="flex justify-between border rounded-sm w-20 py-2 px-2 md:ml-2">
      <button
        className="text-gray-400 font-semibold"
        type="button"
        onClick={onDecrease}
      >
        -
      </button>
      <p>{qty}</p>{" "}
      <button
        className="text-gray-400 font-semibold"
        type="button"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
}
