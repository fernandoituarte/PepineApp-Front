"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { titleFont } from "@/config/fonts";

import image from "../../../../../public/about.jpg";

const PHONE = process.env.NEXT_PUBLIC_PHONE;

export function About() {
  return (
    <motion.div
      className="border b-5 bg-[#5c79690e] h-[400px] md:h-[350px] rounded-lg shadow-md mb-20 pl-5 lg:mx-auto w-full sm:grid sm:grid-cols-3"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="col-span-2 w-full h-full flex flex-col justify-center">
        <div className={`mx-3`}>
          <h1
            className={`${titleFont.className} antialiased text-4xl font-semibold my-3`}
          >
            Bienvenue chez Poussez Pas Derrière
          </h1>
        </div>
        <p className="text-gray-600 text-opacity-90 leading-7">
          Nous avons décidé de centrer notre pépinière sur les plantes
          comestibles, offrant ainsi à chacun la possibilité de déambuler dans
          son jardin ou sur sa terrasse tout en savourant ce qui lentoure. Si
          vous souhaitez obtenir davantage dinformations, nhésitez pas à nous
          contacter au <span className="text-amber-800 font-bold">{PHONE}</span>
        </p>
      </div>
      <div className="w-full h-full hidden sm:flex">
        <Image
          className="w-full h-full rounded-r-lg object-cover"
          alt=""
          width={500}
          height={500}
          src={image}
        />
      </div>
    </motion.div>
  );
}
