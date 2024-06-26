import Image from "next/image";
import Link from "next/link";

import { categoriesInfo } from "@/utils/categoriesInfo";

export function CategoryCard(category) {
  const { value, description, id } = category;
  // Finds the corresponding image information from categoriesInfo by matching the category ID.
  const image = categoriesInfo.find((cat) => cat.id === id);

  return (
    <div className="border p-5 lg:min-h-[636px] rounded-lg shadow-md">
      <Link href={`categories/${id}`} className="cursor-pointer">
        <Image
          className="mx-auto h-44 w-44 max-w-[350px] lg:h-40 lg:w-40 rounded-full shadow-2xl"
          src={image.imageUrl}
          alt="image"
          width={300}
          height={300}
        />
        <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
          {value}
        </h3>
        <p className="text-sm max-h-[192px] text-pretty leading-6 text-gray-600 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {description}
        </p>
      </Link>
    </div>
  );
}
