"use client";
import { titleFont } from "@/config/fonts";
import { motion } from "framer-motion";

export const SubTitle = ({ subtitle, description, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <h2
        className={`${titleFont.className} antialiased text-3xl font-semibold mt-10 mb-5 text-center`}
      >
        {subtitle}
      </h2>
      {description && <h3 className="text-xl mb-5">{description}</h3>}
    </motion.div>
  );
};
