// Ensures that the component only executes on the client side, suitable for Next.js applications.
"use client";

import { ImagesGallery, AdditionalDetails, AddToCart } from "@/components"; // Component imports from project's component library.
import { Icon } from "@iconify/react"; // Iconify for rich, scalable icons.

/**
 * Displays detailed product information including an image gallery, principal product details,
 * various icons representing product features, and adds an option to add the product to a cart.
 *
 * @param {object} product - Product object containing detailed information including images, price, description, etc.
 */
export function UserProductDetails({ product }) {
  // Simplified product object for use in other components like AddToCart.
  const item = {
    id: product.id,
    name: product.name,
    media: product.media_urls[0], // Assuming first media URL is the primary image.
    price: product.price,
    stock: product.stock,
    status: product.status,
  };

  return (
    <div className="bg-white">
      <main className="mx-auto mb-28 max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Layout for product details and media */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mb-6">
            {/* Component for displaying a gallery of product images */}
            <ImagesGallery urls={product.media_urls} />

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
                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description1 }}
                />
              </div>

              {/* Icon representations for different product attributes */}
              <form className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {/* Icons and labels displayed for product attributes */}
                  {generateIconSections(product)}
                </div>

                <div className="mt-10 flex">
                  <AddToCart item={item} />
                </div>
              </form>

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
 * Generates JSX for each icon section representing different attributes of the product.
 *
 * @param {object} product - The product data containing attribute values.
 * @returns JSX elements array
 */
function generateIconSections(product) {
  const attributes = [
    { value: product.size, icon: "carbon:crop-growth" },
    { value: product.pot, icon: "fluent-emoji-flat:potted-plant" },
    {
      value: product.exposure_value,
      icon: "line-md:sunny-filled-loop",
      color: "#ffe564",
    },
    {
      value: product.flower_color,
      icon: "ph:flower-duotone",
      color: "#dd7cea",
    },
    { value: product.foliage_value, icon: "twemoji:fallen-leaf" },
    { value: product.water_requirement_value, icon: "noto:sweat-droplets" },
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
