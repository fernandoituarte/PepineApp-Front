"use client"; // Ensures that the code only runs on the client side, as part of Next.js's hybrid rendering features.

import { ProductCard, Title } from "@/components"; // Imports custom components used within this component.

import { categoriesInfo } from "@/utils/categoriesInfo"; // Imports category data from a utility file which holds category details.

// Products By Category Component
// This component takes a list of products and a category id as props to display a grid of products belonging to a specific category.
export function CategoryGrid({ products, id }) {
  // Find the category in the categoriesInfo array that matches the given id.
  const category = categoriesInfo.find((category) => category.id == id);

  // Render the component
  return (
    <div className="mx-auto my-10 lg:my-16 max-w-7xl px-6 lg:px-8">
      {/* Title component displays the category name and description. */}
      <Title
        title={`${category && category.name}`} // Dynamically sets the title to the category name if available.
        subtitle={`${category && category.description}`} // Sets the subtitle to the category description if available.
        className={"text-center"} // Applies center text alignment styles to the title.
      />
      <div
        role="list" // ARIA role indicating that this div functions as a list container.
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 justify-center" // CSS classes for responsive grid layout.
      >
        {/* Maps over the products array to generate a ProductCard for each product. */}
        {products &&
          products.map((product, index) => (
            <ProductCard key={index} {...product} /> // Each product card gets a unique key and spreads the product data as props.
          ))}
      </div>
    </div>
  );
}
