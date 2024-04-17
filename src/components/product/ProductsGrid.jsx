/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

import { ProductCard, Title } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchProduits } from "@/store/reducer/products/products";

//All products
export function ProductsGrid() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduits());
  }, [dispatch]);

  return (
    <div className="mx-auto my-10 lg:my-16 max-w-7xl px-6 lg:px-8">
      <motion.div
        className="mx-auto lg:mx-0"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Title
          title="Tous nos produits disponibles"
          subtitle="Explorez notre large gamme d'arbres, d'arbustes et de plantes pour
          agrémenter votre espace de vie de verdure et créer une ambiance
          naturelle dans votre quotidien."
          className={"text-center"}
        />
      </motion.div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 justify-center"
      >
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ul>
    </div>
  );
}
