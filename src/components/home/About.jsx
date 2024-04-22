/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import { Title } from "@/components";

const PHONE = process.env.NEXT_PUBLIC_PHONE;

export function About() {
  return (
    <motion.div
      className="text-start m-auto lg:w-4/5 md:w-full sm:w-full pb-36"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
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
