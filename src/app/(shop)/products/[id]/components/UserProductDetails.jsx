"use client";

import {
  ImagesGallery,
  AdditionalDetails,
  AddToCart,
  ErrorComponent,
} from "@/components";
import { Icon } from "@iconify/react";
import { notFound } from "next/navigation";

/**
 * The `UserProductDetails` component displays detailed information about a specific product
 * and provides the option to add it to the cart.
 *
 * Props:
 * - `product`: An object containing the details of the product to display.
 *
 * Features:
 * - Simplifies the product object for easier use in child components like `AddToCart`.
 * - Displays a gallery of product images using the `ImagesGallery` component.
 * - Shows detailed product information including name, price, description, and attributes.
 * - Renders icons for various product attributes to enhance visual representation.
 * - Provides an "Add to Cart" button for user interaction.
 * - Includes an additional details section to display more product-specific information.
 *
 */

export function UserProductDetails({ product, error }) {
  // Simplified product object for use in other components like AddToCart.
  const item = {
    id: product?.id,
    name: product?.name,
    media: product?.media[0].url,
    price: product?.price,
    stock: product?.stock,
    status: product?.status,
    size: product?.size,
  };

  if (error && error.statusCode === 404) {
    notFound();
  }

  if (error && error.statusCode === 500) {
    return <ErrorComponent text={error.message} />;
  }

  return (
    <div className="bg-white">
      <main className="mx-auto mb-28 max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Layout for product details and media */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mb-6">
            {/* Component for displaying a gallery of product images */}
            <ImagesGallery urls={product.media} />

            {/* Section for detailed product information */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {`Prix: ${product.price}€`}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <p className="space-y-6 text-base text-gray-700">
                  {product.description1}
                </p>
              </div>

              {/* Icon representations for different product attributes */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {/* Icons and labels displayed for product attributes */}
                  {generateIconSections(product)}
                </div>

                <div className="mt-5 flex">
                  <AddToCart item={item} />
                </div>
              </div>

              {/* Additional details section */}
              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>
                <AdditionalDetails product={product} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * The `generateIconSections` function creates icon representations for the product attributes.
 *
 * Props:
 * - `product`: The product object containing attributes to display.
 *
 * Returns:
 * - An array of JSX elements representing product attributes with icons.
 */
function generateIconSections(product) {
  const attributes = [
    { value: product.size, icon: "carbon:crop-growth" },
    { value: product.pot, icon: "fluent-emoji-flat:potted-plant" },
    {
      value: product.exposure,
      icon: "line-md:sunny-filled-loop",
      color: "#ffe564",
    },
    {
      value: product.flower_color,
      icon: "ph:flower-duotone",
      color: "#dd7cea",
    },
    { value: product.foliage, icon: "twemoji:fallen-leaf" },
    { value: product.water_requirement, icon: "noto:sweat-droplets" },
  ];

  return attributes.map((attr, index) => (
    <div className="mx-4 flex-col items-center" key={index}>
      <h3 className="text-lg text-gray-600 mb-2">
        <Icon
          icon={attr.icon}
          color={attr.color || "currentcolor"}
          className="w-6 h-6 md:w-12 md:h-12"
        />
      </h3>
      <p className="font-bold text-center">{attr.value}</p>
    </div>
  ));
}
