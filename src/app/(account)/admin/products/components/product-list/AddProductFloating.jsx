import Link from "next/link";
import { BsPlus } from "react-icons/bs";

export const AddProductFloating = () => {
  return (
    <Link
      href={"/admin/products/add-product"}
      aria-label="Ajouter un produit"
      className="fixed z-20 bottom-8 right-8  backdrop-blur-sm bg-indigo-500/40 w-18 h-18 w-20 h-20 rounded-full flex flex-col items-center justify-center"
    >
      <BsPlus size={60} className=" text-gray-100" />
    </Link>
  );
};
