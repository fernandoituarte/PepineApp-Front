import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { retireImage } from "@/store/reducer/products/media/media";

import { TiDelete } from "react-icons/ti";

export function ItemImage(item) {
  const { loading } = useAppSelector((state) => state.media);
  const dispatch = useAppDispatch();

  function handleDeleteImage(id) {
    dispatch(retireImage(id));
  }

  return (
    <div className="relative max-w-60 max-h-52">
      <TiDelete
        onClick={() => handleDeleteImage(item.id)}
        className="absolute top-0 right-0 text-red-500 z-10 cursor-pointer m-2 h-6 w-6"
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
