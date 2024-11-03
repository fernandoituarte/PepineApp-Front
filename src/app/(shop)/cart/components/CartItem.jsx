"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useAppDispatch } from "@/hooks/redux";
import { QtyBtn } from "./QtyBtn";
import { decrement, increment } from "@/store/reducer/cart/cart";

/**
 * `CartItem` component displays a single item in the shopping cart.
 *
 * Features:
 * - Renders product image, name, size, and pricing information.
 * - Allows users to navigate to the product detail page.
 * - Integrates quantity buttons to adjust the number of items in the cart.
 * - Utilizes `motion` from Framer Motion for smooth hover and tap animations.
 * - Dispatches actions to the Redux store to update cart quantities.
 *
 * Interaction:
 * - Displays a message if the product is out of stock.
 * - Calculates and displays the total price based on the quantity selected.
 * - Only mounts the component after the initial render to ensure proper state.
 */

export function CartItem({ product, qty }) {
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.li
      className="flex py-6 sm:py-10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
    >
      <div className="flex-shrink-0">
        <Image
          width={300}
          height={300}
          src={product?.media ? `${product?.media}` : ""}
          alt={product?.name}
          priority
          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <p className="text-sm ">
                {/* Link to product detail page */}
                <Link
                  href={`/products/${product?.id}`}
                  className="font-semibold text-gray-600 hover:text-gray-800"
                >
                  {product?.name}
                </Link>
              </p>
            </div>
            <div className="mt-1 flex text-sm">
              {/* Display product size and name */}
              <p className="text-gray-500">Taille: {product?.size}</p>
              {product?.name && (
                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                  {product?.name}
                </p>
              )}
            </div>
            {/* Displaying product price and total price for the quantity */}
            <p className="mt-1 text-sm font-semibold text-gray-500">
              {product?.price} €
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-500">
              Total: {(product?.price * qty).toFixed(2)} €
            </p>
            {/* Message if product is out of stock */}
            {product?.stock !== 0 && !product?.status && (
              <p className="mt-4 text-sm font-semibold text-red-400">
                Article indisponible
              </p>
            )}
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            {/* Quantity buttons component for increasing or decreasing the quantity */}
            <QtyBtn
              onDecrease={() => dispatch(decrement(product))}
              onIncrease={() => dispatch(increment(product))}
              qty={qty}
            />
          </div>
        </div>
      </div>
    </motion.li>
  );
}
