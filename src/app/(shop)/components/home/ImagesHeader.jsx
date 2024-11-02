"use client";

import Image from "next/image";

export function ImagesHeader() {
  return (
    <div className="relative lg:block m-auto mb-14 w-full">
      <Image
        className="object-center object-cover h-[400px] md:h-[550px] m-auto shadow-2xl"
        src="/image-header.jpg"
        width={1250}
        height={600}
        priority
        alt="pépinière pyrénées orientales"
      />
      <div className="absolute bottom-10 inset-x-0">
        <Image
          className="w-2/4 mb-14 md:w-1/5 md:h-auto m-auto"
          src="/logo.png"
          width={654}
          height={214}
          alt="pépinière pyrénées orientales"
          priority
        />
      </div>
    </div>
  );
}
