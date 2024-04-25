"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ImagesHeader() {
  return (
    <motion.div
      className="relative lg:block m-auto mb-14 md:w-full sm:w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Image
        className="object-center object-cover h-[550px] m-auto shadow-2xl"
        src="/pépinèrePyrénéesorientales.jpg"
        width={1250}
        height={600}
        alt="pépinière pyrénées orientales"
      />
      <div className="absolute bottom-10 inset-x-0">
        <Image
          className="w-2/3 mb-14 md:w-1/5 md:h-auto m-auto"
          src="/lolo 2 pépinière.png"
          width={654}
          height={214}
          alt="pépinière pyrénées orientales"
        />
      </div>
    </motion.div>
  );
}
