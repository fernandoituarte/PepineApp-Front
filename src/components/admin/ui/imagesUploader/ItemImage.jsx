import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { retireImage } from "@/store/reducer/products/media/media";

import { RiDeleteBin5Line } from "react-icons/ri";

export function ItemImage(item) {
  const dispatch = useAppDispatch();

  function handleDeleteImage(id) {
    dispatch(retireImage(id));
  }

  return (
    <div className="relative max-w-60 max-h-52">
      <RiDeleteBin5Line
        onClick={() => handleDeleteImage(item.id)}
        className="absolute top-0 right-0 bg-[#ffffff91] text-white p-1 rounded-sm z-10 cursor-pointer m-2 h-8 w-8"
      />
      <Image
        src={`${item.url}`}
        alt={item.id}
        width={700}
        height={700}
        className="object-cover object-center rounded-lg h-52"
      />
    </div>
  );
}
