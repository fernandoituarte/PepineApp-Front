// Directive to ensure this component only runs on the client side.
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook from Next.js for getting the current path.
import { motion } from "framer-motion"; // For adding animations to the component.
import { AddToCart } from "@/components"; // Importing a reusable Add to Cart button component.

// Redux actions for clearing selected media and categories.
import { emptyMedia } from "@/store/reducer/products/media/media";
import { emptyCategories } from "@/store/reducer/products/update-categories/productCategories";
import { deleteProductToUpdate } from "@/store/reducer/products/product";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export function ProductCard(product) {
  const {
    id,
    media_urls,
    name,
    size,
    price,
    product_id,
    category_id,
    status,
    stock,
  } = product;
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { userRole: role } = useAppSelector((state) => state.user);

  const item = {
    id: product_id || id,
    name,
    media: media_urls ? media_urls[0] : "",
    price,
    stock,
    status,
  };

  function handleUpdate() {
    // Dispatches actions to reset categories, product updates, and media when updating a product.
    dispatch(emptyCategories());
    dispatch(deleteProductToUpdate());
    dispatch(emptyMedia());
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }} // Animation for hover state.
      whileTap={{ scale: 1.1 }} // Animation for tap state.
      initial={{ opacity: 0 }} // Initial animation state.
      animate={{ opacity: 1, scale: 1 }} // Animated state.
      transition={{
        duration: 0.2, // Animation duration.
        ease: [0, 0.71, 0.2, 1.01], // Animation ease function.
      }}
      className="bg-white shadow-lg rounded-md"
    >
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-10 lg:max-w-7xl">
        <div key={id} className="group relative">
          <div className="h-80 w-full overflow-hidden rounded-md bg-gray-200">
            {media_urls && (
              <Image
                width={800}
                height={800}
                src={media_urls[0] ? media_urls[0] : "/"}
                alt={"image"} // Placeholder if no image URL is provided.
                className="h-full w-full object-cover object-center"
                placeholder="blur"
                blurDataURL={media_urls[0] ? media_urls[0] : "/"} // Data URL for image placeholder.
              />
            )}
          </div>
          <h3 className="mt-4 text-sm text-gray-700">
            <Link
              href={
                // Conditional link based on the pathname and role.
                pathname === `/categories/${category_id}`
                  ? role === "admin"
                    ? `/admin/products/${product_id}`
                    : `/products/${product_id}`
                  : role === "admin"
                  ? `/admin/products/${id}`
                  : `/products/${id}`
              }
            >
              <span className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{size}</p>
          <p className="mt-1 text-sm font-medium text-gray-900">{price} €</p>
        </div>
        {role === "admin" ? (
          <Link
            onClick={handleUpdate}
            href={`/admin/products/update-product/${product_id || id}`}
            className="bg-indigo-500 flex max-w-xs items-center justify-center rounded-md border border-transparent px-8 py-3 mt-3 mx-auto text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:bg-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 w-full shadow-md"
          >
            Modifier
          </Link>
        ) : (
          <AddToCart item={item} />
        )}
      </div>
    </motion.div>
  );
}
