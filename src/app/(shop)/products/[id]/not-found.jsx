import Link from "next/link";
import Image from "next/image";
import { NavBar } from "@/components";

import pepinierenuit from "../../../../../public/pepinierenuit.webp";

export default function NotFound() {
  return (
    <div className="w-2/3 m-auto xl:grid xl:grid-cols-2 min-h-full place-items-start gap-10 bg-white px-6 xl:px-8">
      <div className="text-center xl:w-full xl:h-full pt-44">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page introuvable
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Désolé, nous n&apos;avons pas pu trouver la page que vous recherchez.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Acceuil
          </Link>
        </div>
      </div>
      <div className="relative hidden xl:block w-full xl:h-[800px] py-4 bg-white">
        <Image
          src={pepinierenuit}
          height={800}
          width={800}
          className="rounded-xl shadow-2xl object-cover object-center w-full h-full"
          alt="Background"
        />
      </div>
    </div>
  );
}
