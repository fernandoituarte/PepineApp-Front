"use client";

import {
  Message,
  ImagesGallery,
  AdditionalDetails,
  PrincipalDetails,
  Spinner,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { getProductById } from "@/store/reducer/products/product";
import { notFound } from "next/navigation";
import { useEffect } from "react";

/**
 * The `AdminProductDetails` component displays detailed information about a specific product
 * and handles product deletion.
 *
 * Props:
 * - `id`: The ID of the product to fetch and display.
 *
 * Features:
 * - Fetches product details using the provided ID when the component mounts or when the ID changes.
 * - Displays a loading message while the product details are being fetched.
 * - Shows error and success messages based on the product deletion action.
 * - Renders a gallery of product images, main product information, and additional details.
 * - Redirects to a 404 page if the product is not found.
 * - Includes a delete option for the product, dispatching the delete action when triggered.
 *
 * State Management:
 * - `loading`: Indicates whether the product details are being fetched.
 * - `product`: The current product details fetched from the Redux store.
 * - `errorMessage`: Displays any error messages related to product actions.
 * - `message`: Displays success messages after successful actions like deletion.
 * - `status`: Tracks the status of the product fetching operation to determine if the product was found.
 */

export function AdminProductDetails({ id }) {
  const dispatch = useAppDispatch();
  const { handleDeleteProduct, errorMessage, message } = useDeleteProduct();
  const { product, loading, status } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (status === 404) {
      notFound();
    }
  }, [status]);

  if (loading) {
    return (
      <div className="sm:w-4/5 md:w-2/3 xl:w-1/2 mx-auto mt-8 p-6">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-2xl lg:max-w-none">
        {/* Displays error or success messages based on product actions. */}
        {errorMessage && (
          <Message
            className="bg-red-100 border border-red-300 text-red-600 mb-3"
            title="Error: "
            text={errorMessage}
          />
        )}
        {message && (
          <Message
            className="bg-green-100 border border-green-300 text-green-600 mb-3"
            title="Success: "
            text="Le produit a été supprimé correctement"
          />
        )}
        {/* Layout for product details and media */}
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mb-6">
          {/* Component for displaying a gallery of product images */}
          <ImagesGallery urls={product?.media} />

          {/* Section for main product information and action buttons */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <PrincipalDetails
              product={product}
              handleDeleteProduct={() => handleDeleteProduct(product?.id)}
            />
            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>
              {/* Component for displaying additional detailed attributes of the product */}
              <AdditionalDetails product={product} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
