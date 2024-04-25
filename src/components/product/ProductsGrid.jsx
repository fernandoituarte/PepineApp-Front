// Ensures that the component only runs on the client side, necessary for Next.js specific functionalities.
"use client";
import { useEffect } from "react";
import { motion } from "framer-motion"; // Importing Framer Motion for animations.

import { ProductCard, Title } from "@/components"; // Custom components for displaying the product card and title.
import { useAppDispatch, useAppSelector } from "@/hooks/redux"; // Custom hooks for Redux state management.
import { fetchProducts } from "@/store/reducer/products/product"; // Redux action for fetching products.

/**
 * Component for displaying a grid of product cards with an animated title.
 * Fetches product data on mount and displays each product using the ProductCard component.
 */
export function ProductsGrid() {
  const dispatch = useAppDispatch(); // Hook for dispatching Redux actions.
  const { products } = useAppSelector((state) => state.product); // Accessing the list of products from Redux state.

  // Effect hook to fetch products when the component mounts.
  useEffect(() => {
    dispatch(fetchProducts()); // Dispatching the fetchProduits action.
  }, [dispatch]);

  return (
    <div className="mx-auto my-10 lg:my-16 max-w-7xl px-6 lg:px-8">
      {/* Animated container for the title using Framer Motion for a smooth appearance on load. */}
      <motion.div
        className="mx-auto lg:mx-0"
        initial={{ opacity: 0, scale: 0.6 }} // Initial state before animation starts.
        animate={{ opacity: 1, scale: 1 }} // Final state after animation.
        transition={{
          duration: 0.4, // Duration of the animation.
          ease: [0, 0.71, 0.2, 1.01], // Custom easing function for the animation.
        }}
      >
        {/* Title component with both a main title and a subtitle. */}
        <Title
          title="Tous nos produits disponibles"
          subtitle="Explorez notre large gamme d'arbres, d'arbustes et de plantes pour
          agrémenter votre espace de vie de verdure et créer une ambiance
          naturelle dans votre quotidien."
          className={"text-center"}
        />
      </motion.div>
      {/* Grid layout for products, dynamically adjusting columns based on screen size. */}
      <ul
        role="list" // ARIA role for accessibility.
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 justify-center"
      >
        {products.map((product) => (
          // Mapping through each product and rendering a ProductCard.
          <ProductCard key={product.id} {...product} />
        ))}
      </ul>
    </div>
  );
}
