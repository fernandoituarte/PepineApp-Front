"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AddToCart } from "@/components";

import { emptyMedia } from "@/store/reducer/products/media/media";
import { emptyCategories } from "@/store/reducer/products/update-categories/productCategories";
import { deleteProductToUpdate } from "@/store/reducer/products/product";
import { getUserSessionCookieClient } from "@/lib/getUserClientSide";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";

export function ProductCard({
  id,
  media_urls,
  name,
  size,
  price,
  product_id,
  category_id,
  status,
  stock,
}) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const item = {
    id: product_id || id,
    name,
    media: media_urls ? media_urls[0] : "",
    price,
    stock,
    status,
  };
  const { loading, loggedOut } = useAppSelector((state) => state.user);
  const [role, setRole] = useState();

  useEffect(() => {
    const user = getUserSessionCookieClient();
    if (user) setRole(user.role);
    if (loggedOut) setRole(null);
  }, [loading, loggedOut]);

  function handleUpdate() {
    // Dispatches actions to reset categories, product updates, and media when updating a product.
    dispatch(emptyCategories());
    dispatch(deleteProductToUpdate());
    dispatch(emptyMedia());
  }

  return (
    <div className="bg-white shadow-lg rounded-md">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-10 lg:max-w-7xl">
        <div key={id} className="group relative">
          <div className="h-80 w-full overflow-hidden rounded-md bg-gray-200">
            {media_urls && (
              <Image
                width={800}
                height={800}
                src={media_urls[0] ? media_urls[0] : "/"}
                alt={"image"}
                className="h-full w-full object-cover object-center"
                placeholder="blur"
                blurDataURL={media_urls[0] ? media_urls[0] : "/"}
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
    </div>
  );
}
