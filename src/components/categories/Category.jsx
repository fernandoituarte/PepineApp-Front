import Image from "next/image";
import Link from "next/link";

import { categoriesInfo } from "@/utils/categoriesInfo";

export function Category(category) {
  const { value, description, id } = category;
  // Finds the corresponding image information from categoriesInfo by matching the category ID.
  const image = categoriesInfo.find((cat) => cat.id === id);

  return (
    <div className="border p-5 rounded-lg shadow-md">
      <Link href={`categories/${id}`} className="cursor-pointer">
        <Image
          className="mx-auto h-48 w-48 lg:h-48 lg:w-48 rounded-full object-cover shadow-2xl"
          src={image.imageUrl}
          alt="image"
          width={500}
          height={500}
        />
        <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
          {value}
        </h3>
        <p className="text-sm leading-6 text-gray-600">{description}</p>
      </Link>
    </div>
  );
}
