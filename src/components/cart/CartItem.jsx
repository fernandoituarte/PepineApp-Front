"use client"; // Directs Next.js to only load this module in the client-side environment.

import Link from "next/link"; // Next.js Link component for client-side navigation.
import Image from "next/image"; // Next.js optimized Image component for images.
import { motion } from "framer-motion"; // Framer Motion for adding animations.

import { useAppDispatch } from "@/hooks/redux"; // Custom hook to access Redux dispatch function.
import { QtyBtn } from "@/components"; // Custom component for quantity buttons.
import { decrement, increment } from "@/store/reducer/cart/cart"; // Redux actions for incrementing and decrementing item quantities in the cart.

export function CartItem({ product, qty }) {
  const dispatch = useAppDispatch(); // Initialize dispatch function to send actions to the Redux store.

  // Render each cart item with animations and display details.
  return (
    <motion.li
      key={product?.id} // Unique key for each item using product ID.
      className="flex py-6 sm:py-10" // Styling classes for layout and padding.
      whileHover={{ scale: 1.05 }} // Animation to scale up on hover.
      whileTap={{ scale: 1.05 }} // Animation to scale up on tap.
    >
      <div className="flex-shrink-0">
        <Image
          priority={true} // Higher loading priority for images.
          width={700}
          height={700}
          src={product?.media ? `${product?.media}` : ""} // Source URL of the product image.
          alt={product?.name} // Alternative text for the image.
          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48" // Styling classes for image size and border.
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm ">
                {/* Link to product detail page */}
                <Link
                  href={`/products/${product?.id}`}
                  className="font-semibold text-gray-600 hover:text-gray-800"
                >
                  {product?.name}
                </Link>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              {/* Display product size and name */}
              <p className="text-gray-500">Size: {product?.size}</p>
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
