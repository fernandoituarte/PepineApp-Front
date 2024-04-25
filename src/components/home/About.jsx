/* eslint-disable react/no-unescaped-entities */
// Disabling ESLint rule for unescaped entities to allow apostrophes in JSX without escaping.

"use client"; // Ensures that this module only runs on the client side.

import { motion } from "framer-motion"; // Importing the motion component from Framer Motion for animations.
import { Title } from "@/components"; // Importing a custom Title component for consistent styled headings.

const PHONE = process.env.NEXT_PUBLIC_PHONE; // Accessing the public phone number from environment variables for security and ease of updates.

export function About() {
  // This component renders an about page with motion effects and dynamic content.
  return (
    <motion.div
      className="text-start m-auto lg:w-4/5 md:w-full sm:w-full pb-36" // Styling for text alignment, margin, and padding.
      initial={{ opacity: 0, scale: 0.5 }} // Initial animation state, starting faded and scaled down.
      animate={{ opacity: 1, scale: 1 }} // Animates to full opacity and scale.
      transition={{
        duration: 0.8, // Duration of the animation in seconds.
        ease: [0, 0.71, 0.2, 1.01], // Custom easing function for the animation.
      }}
    >
      <Title
        title="Bienvenue chez Poussez Pas Derrière"
        className={"text-center"}
      />
      <p className="text-gray-600 m-auto px-6 text-opacity-90 leading-7 sm:w-4/5">
        Nous avons décidé de centrer notre pépinière sur les plantes
        comestibles, offrant ainsi à chacun la possibilité de déambuler dans son
        jardin ou sur sa terrasse tout en savourant ce qui l'entoure. Si vous
        souhaitez obtenir davantage d'informations, n'hésitez pas à nous
        contacter au <span className="text-amber-500 font-bold">{PHONE}</span>
      </p>
      <p className="px-6 mt-10 text-center text-opacity-90 text-3xl font-bold leading-10">
        Bon Jardinage à tous !
      </p>
    </motion.div>
  );
}
