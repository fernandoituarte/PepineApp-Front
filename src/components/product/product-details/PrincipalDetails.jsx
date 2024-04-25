// Ensures this component only runs on the client side, necessary for Next.js specific functionalities.
"use client";
import Link from "next/link"; // Importing Link for navigation within the app.
import { Icon } from "@iconify/react"; // Importing Icon from Iconify for displaying various icons.
import { RiDeleteBin6Line } from "react-icons/ri"; // Specific icon import for delete functionality.

/**
 * This component displays the principal details of a product, including its name, price,
 * and additional attributes like size and pot. It also provides buttons for update and delete actions.
 *
 * @param {object} product - Contains all the detailed information about the product.
 * @param {function} handleUpdate - Function to trigger the update process of the product.
 * @param {function} handleDeleteProduct - Function to handle the deletion of the product.
 */
export const PrincipalDetails = ({
  product,
  handleUpdate,
  handleDeleteProduct,
}) => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {product.name}
      </h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight text-gray-900">
          {`Prix: ${product.price}€`}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div
          className="space-y-6 text-base text-gray-700"
          dangerouslySetInnerHTML={{ __html: product.description1 }} // Renders product description allowing HTML content.
        />
      </div>

      <div className="mt-6">
        <div className="flex">
          {/* Attributes like size and pot are displayed below with respective titles and values. */}
          <div className="mx-4 flex-col items-center">
            <h3 className="text-lg text-gray-600 mb-1">Taille</h3>
            <p className="font-bold">{product.size}</p>
          </div>
          <div className="mx-4 flex-col items-center">
            <h3 className="text-lg text-gray-600 mb-1">Pot</h3>
            <p className="font-bold">{product.pot}</p>
          </div>
          <div className="mx-4 flex-col items-center">
            <h3 className="text-lg text-gray-600 mb-1">Statut</h3>
            <div className="font-bold ">
              {product.status ? (
                <Icon icon="ion:eye" color="#03ba4f" width="24" height="24" />
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
                product.stock <= 2 ? "text-red-500" : "text-green-500"
              }`}
            >
              {product.stock}
            </p>
          </div>
        </div>

        <div className="mt-10 flex">
          <Link
            href={`update-product/${product.id}`}
            onClick={handleUpdate}
            type="submit"
            className="shadow-md flex md:max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
          >
            Modifier
          </Link>
          <button
            onClick={handleDeleteProduct}
            className="shadow-md items-center ml-6 justify-center rounded-md bg-red-600 px-5 py-3 text-base font-medium text-white hover:bg-red-700"
          >
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      </div>
    </>
  );
};
