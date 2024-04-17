"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { useAppDispatch } from "@/hooks/redux";
import { QtyBtn } from "@/components";
import { decrement, increment } from "@/store/reducer/cart/cart";

export function CartItem({ product, qty }) {
  const dispatch = useAppDispatch();

  return (
    <motion.li
      key={product?.id}
      className="flex py-6 sm:py-10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
    >
      <div className="flex-shrink-0">
        <Image
          priority={true}
          width={700}
          height={700}
          src={product?.media ? `${product?.media}` : ""}
          alt={product?.name}
          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm ">
                {/* Link to the product detail page */}
                <Link
                  href={`/products/${product?.id}`}
                  className="font-semibold text-gray-600 hover:text-gray-800"
                >
                  {product?.name}
                </Link>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              {/* Product size and name */}
              <p className="text-gray-500">Size: {product?.size}</p>
              {product?.name && (
                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                  {product?.name}
                </p>
              )}
            </div>
            {/* Displaying product price and total price */}
            <p className="mt-1 text-sm font-semibold text-gray-500">
              {product?.price} €
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-500">
              Total: {(product?.price * qty).toFixed(2)} €
            </p>
            {product?.stock && product?.status && (
              <p className="mt-5 text-sm font-semibold text-green-500">
                En stock
              </p>
            )}
            {product?.stock !== 0 && !product?.status && (
              <p className="mt-4 text-sm font-semibold text-red-400">
                Article indisponible
              </p>
            )}
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            {/* Quantity selection dropdown */}
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
