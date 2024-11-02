"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AddToCart } from "@/components";
import { useHandleProductCard } from "@/hooks/useHandleProductCard";

/**
 * ProductCard component displays product information such as image, name, price, and size.
 * If the user is an admin, a link to edit the product is shown instead of the "Add to Cart" button.
 *
 * @param {Object} product - The product data (e.g., id, name, media, price, size).
 * @param {Object} category - The category data related to the product.
 * @returns A card layout that shows product details and allows adding to cart or editing based on the user's role.
 */

export function ProductCard(product, category) {
  const pathname = usePathname();
  const { id, name, media, price, size } = product;
  const { item, role, url } = useHandleProductCard(product, category, pathname);

  return (
    <li className="bg-white shadow-lg rounded-md list-none">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-10 lg:max-w-7xl">
        <div className="group relative">
          <div className="h-80 w-full overflow-hidden rounded-md bg-gray-200">
            {media[0] && (
              <Image
                width={800}
                height={800}
                src={media[0].url}
                alt={"Product image"}
                className="h-full w-full object-cover object-center"
                placeholder="blur"
                blurDataURL={media[0] ? media[0].url : "/"}
              />
            )}
          </div>
          <h3 className="mt-4 text-sm text-gray-700">
            <Link href={url}>
              <span className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{size}</p>
          <p className="mt-1 text-sm font-medium text-gray-900">{price} €</p>
        </div>
        {role === "admin" ? (
          <Link
            href={`/admin/products/update-product/${id}`}
            className="bg-[#5c7969] flex max-w-xs items-center justify-center rounded-md border border-transparent px-8 py-3 mt-3 mx-auto text-base font-medium text-white hover:bg-[#6d8f7cc7] w-full shadow-md"
          >
            Modifier
          </Link>
        ) : (
          <AddToCart item={item} />
        )}
      </div>
    </li>
  );
}
