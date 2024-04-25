// Ensures that the component only executes on the client side, suitable for Next.js applications.
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Redux hooks for dispatching actions and accessing state.
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  deleteProductToUpdate,
  deleteProduct,
} from "@/store/reducer/products/product";
import { emptyCategories } from "@/store/reducer/products/update-categories/productCategories";
import { emptyMedia } from "@/store/reducer/products/media/media";

// Component imports for displaying various parts of the product details.
import {
  Message,
  ImagesGallery,
  AdditionalDetails,
  PrincipalDetails,
} from "@/components";

/**
 * Displays detailed information about a specific product, including an image gallery,
 * principal details, and additional detailed attributes.
 * Provides functionalities to update or delete the product.
 *
 * @param {object} product - Product object containing detailed information.
 */
export function AdminProductDetails({ product }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status } = useAppSelector((state) => state.product);
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState(false);

  // Handles the deletion of a product with confirmation.
  function handleDeleteProduct() {
    if (window.confirm("Voulez vraiment supprimer ce produit?")) {
      dispatch(deleteProduct(product.id));
    }
  }

  // Handles clearing related state before an update action is performed.
  function handleUpdate() {
    dispatch(emptyCategories());
    dispatch(deleteProductToUpdate());
    dispatch(emptyMedia());
  }

  // Effect hook to monitor the status of product deletion and handle UI feedback.
  useEffect(() => {
    if (status === "product deleted successfully") {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
        router.back(); // Navigates back to the previous page after deletion.
      }, 2000);
    } else if (status === "product deleted rejected") {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
    }
  }, [status, router]);

  return (
    <div className="bg-white">
      <main className="mx-auto mb-28 max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Displays error or success messages based on product actions. */}
          {errorMessage && (
            <Message
              className="bg-red-100 border border-red-300 text-red-600 mb-3"
              title="Error: "
              text="Une erreur est survenue lors de la suppression du produit"
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
            <ImagesGallery urls={product.media_urls} />

            {/* Section for main product information and action buttons */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <PrincipalDetails
                product={product}
                handleUpdate={handleUpdate}
                handleDeleteProduct={handleDeleteProduct}
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
      </main>
    </div>
  );
}
