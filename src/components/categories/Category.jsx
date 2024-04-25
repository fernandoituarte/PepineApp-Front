"use client"; // Ensures that this module only runs on the client side in Next.js applications.

import Image from "next/image"; // Imports the optimized Image component from Next.js for handling images.
import Link from "next/link"; // Imports the Link component from Next.js for client-side navigation.
import { motion } from "framer-motion"; // Imports the motion component from Framer Motion for animations.

import { categoriesInfo } from "@/utils/categoriesInfo"; // Imports category data from a utility file.

// Defines the Category functional component that takes a category object as a prop.
export function Category(category) {
  const { value, description, id } = category; // Destructures the category object to get its properties.
  const image = categoriesInfo.find((cat) => cat.id === id); // Finds the corresponding image information from categoriesInfo by matching the category ID.

  // Renders a category item with motion effects for interaction and transitions.
  return (
    <motion.div
      whileHover={{ scale: 1.1 }} // Applies a scale transform on hover to slightly enlarge the component.
      whileTap={{ scale: 1.1 }} // Applies the same scale transform on tap for touch devices.
      initial={{ opacity: 0, scale: 0.1 }} // Initial animation state when the component mounts.
      animate={{ opacity: 1, scale: 1 }} // Final animation state to which the component animates.
      transition={{
        duration: 0.2, // Duration of the animation in seconds.
        ease: [0, 0.71, 0.2, 1.01], // Custom easing function for the animation.
      }}
      className="border p-5 rounded-lg shadow-md" // Styling for the category item.
    >
      <Link href={`categories/${id}`} className="cursor-pointer">
        <Image
          className="mx-auto h-48 w-48 lg:h-48 lg:w-48 rounded-full object-cover shadow-2xl"
          src={image.imageUrl} // URL of the category image.
          alt="image" // Alt text for the image, should ideally be more descriptive.
          width={500}
          height={500}
        />
        <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
          {value}
        </h3>
        <p className="text-sm leading-6 text-gray-600">{description}</p>
      </Link>
    </motion.div>
  );
}
