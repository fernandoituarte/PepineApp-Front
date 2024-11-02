"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { RiDeleteBin6Line } from "react-icons/ri";

/**
 * This component displays the principal details of a product, including its name, price,
 * and additional attributes like size and pot. It also provides buttons for update and delete actions.
 */
export const PrincipalDetails = ({
  product,
  handleUpdate,
  handleDeleteProduct,
}) => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {product?.name}
      </h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight text-gray-900">
          {`Prix: ${product?.price}€`}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <p className="space-y-6 text-base text-gray-700">
          {product?.description1}
        </p>
      </div>

      <div className="mt-6">
        <div className="flex">
          {/* Attributes like size and pot are displayed below with respective titles and values. */}
          <div className="mx-4 flex-col items-center">
            <h3 className="text-lg text-gray-600 mb-1">Taille</h3>
            <p className="font-bold">{product?.size}</p>
          </div>
          <div className="mx-4 flex-col items-center">
            <h3 className="text-lg text-gray-600 mb-1">Pot</h3>
            <p className="font-bold">{product?.pot}</p>
          </div>
          <div className="mx-4 flex-col items-center">
            <h3 className="text-lg text-gray-600 mb-1">Statut</h3>
            <div className="font-bold ">
              {product?.status ? (
                <Icon icon="ion:eye" color="#14873f" width="24" height="24" />
              ) : (
                <Icon
                  className="mx-2"
                  icon="mdi:eye-off"
                  color="#e50000"
                  width="24"
                  height="24"
                />
              )}
            </div>
          </div>
          <div className="mx-4 flex flex-col items-center">
            <h3 className="text-lg text-gray-600 mb-1">Stock</h3>
            <p
              className={`font-bold ${
                product?.stock <= 2 ? "text-red-500" : "text-[#14873f]"
              }`}
            >
              {product?.stock}
            </p>
          </div>
        </div>

        <div className="mt-10 flex">
          <Link
            href={`update-product/${product?.id}`}
            onClick={handleUpdate}
            type="submit"
            className="shadow-md flex md:max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-[#14873f] px-8 py-3 text-base font-medium text-white hover:bg-[#14873e80] focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
          >
            Modifier
          </Link>
          <button
            onClick={handleDeleteProduct}
            aria-label="Supprimer ce produit"
            className="shadow-md items-center ml-6 justify-center rounded-md bg-red-600 px-5 py-3 text-base font-medium text-white hover:bg-red-700"
          >
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      </div>
    </>
  );
};
