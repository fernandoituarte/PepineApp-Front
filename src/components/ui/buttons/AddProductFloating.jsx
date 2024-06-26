"use client";
import Link from "next/link";

// Custom hooks from the Redux store for dispatching actions and selecting state.
import { useAppDispatch } from "@/hooks/redux";

import { emptyCategories } from "@/store/reducer/products/update-categories/productCategories";
import { emptyMedia } from "@/store/reducer/products/media/media";

import { BsPlus } from "react-icons/bs"; // Icon for the add product button.

export const AddProductFloating = () => {
  const dispatch = useAppDispatch();

  // Handler to reset category and media states before adding a new product.
  const handleAddProduct = () => {
    dispatch(emptyCategories());
    dispatch(emptyMedia());
  };
  return (
    <Link
      href={"/admin/products/add-product"}
      onClick={handleAddProduct}
      className="fixed z-20 bottom-8 right-8  backdrop-blur-sm bg-indigo-500/40 w-18 h-18 w-20 h-20 rounded-full flex flex-col items-center justify-center"
    >
      <BsPlus size={60} className=" text-gray-100" />
    </Link>
  );
};
