import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  deleteProduct,
  resetProductState,
} from "@/store/reducer/products/product";

// Custom hook for handling product deletion
export const useDeleteProduct = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { status, error } = useAppSelector((state) => state.product);

  // Local states for showing feedback messages
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  // Function to handle product deletion, with confirmation prompt
  function handleDeleteProduct(id) {
    if (window.confirm("Voulez vraiment supprimer ce produit?")) {
      dispatch(deleteProduct(id));
    }
  }

  // Effect to monitor the status of the delete action and show feedback
  useEffect(() => {
    if (status === "product deleted successfully") {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
        dispatch(resetProductState());
        router.back();
      }, 2000);
    } else if (status === "product deleted rejected") {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage(null);
        dispatch(resetProductState());
      }, 3000);
    }
  }, [status, router, dispatch, error]);

  // Return delete handler and messages for use in components
  return {
    handleDeleteProduct,
    errorMessage,
    message,
  };
};
