import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/validations/schemas";

import {
  updateProduct,
  resetProductState,
} from "@/store/reducer/products/product";
import {
  emptyMedia,
  uploadImage,
  changeMediaStatus,
  deleteImage,
} from "@/store/reducer/media/media";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";

// Define a custom hook to manage product updates
export const useUpdateProduct = (product) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Define state variables to manage product categories, media, errors, and submission status
  const [categoriesProduct, setCategoriesProduct] = useState(
    product?.categories,
  );
  const [media, setMedia] = useState([]);
  const [mediaToUpdate, setMediaToUpdate] = useState([]);
  const [productToUpdate, setProductToUpdate] = useState();
  const [errorUploadMessage, setErrorUploadMessage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Select media and product states from the Redux store
  const {
    media: mediaUrls,
    status: mediaStatus,
    error: mediaError,
  } = useAppSelector((state) => state.media);
  const { status: productStatus, error: productError } = useAppSelector(
    (state) => state.product,
  );

  // Initialize form handling with validation schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  // Effect to initialize form and media state when the product changes
  useEffect(() => {
    if (product) {
      reset(product);
    }
    if (product.media.length) {
      setMedia(product?.media.map((image) => image.url));
    }
  }, [product, reset]);

  // Function to handle form submission
  const onSubmit = handleSubmit((data) => {
    setProductToUpdate({
      ...data,
      categories: categoriesProduct,
      media: [...media],
    });

    if (mediaToUpdate?.length) {
      const formData = new FormData();
      mediaToUpdate.forEach((file) => {
        formData.append("file", file);
      });

      dispatch(uploadImage(formData));
    }
    if (!mediaToUpdate?.length) {
      dispatch(changeMediaStatus(204));
    }
  });

  // Effect to manage media status and handle errors after upload
  useEffect(() => {
    if (mediaStatus >= 400) {
      setErrorUploadMessage(mediaError);
      return;
    }

    if ((mediaStatus === 201 || mediaStatus === 204) && !isSubmitting) {
      setIsSubmitting(true); // Prevent multiple submissions

      if (mediaStatus === 201 && mediaUrls.length > 0) {
        const updatedProduct = {
          ...productToUpdate,
          media: [...productToUpdate?.media, ...mediaUrls],
        };

        dispatch(updateProduct({ id: product.id, update: updatedProduct }));
        dispatch(changeMediaStatus(""));
      } else if (mediaStatus === 204) {
        const updatedProduct = {
          ...productToUpdate,
        };
        dispatch(updateProduct({ id: product.id, update: updatedProduct }));
        dispatch(changeMediaStatus(""));
      }
      setIsSubmitting(false);
    }
  }, [
    mediaStatus,
    productToUpdate,
    mediaUrls,
    dispatch,
    product,
    mediaError,
    isSubmitting,
  ]);

  // Effect to handle product status, including errors and reset logic
  useEffect(() => {
    if (productStatus >= 400) {
      setErrorUploadMessage(productError);
      if (mediaUrls?.length > 0) {
        mediaUrls.forEach((url) => {
          const id = url.split("/")[5];
          dispatch(deleteImage(id)); // Delete images if there's an error
        });
      }
      dispatch(emptyMedia()); // Reset media state in Redux
      dispatch(resetProductState()); // Reset product state in Redux
    }
    if (productStatus === "Product updated successfully") {
      dispatch(emptyMedia());
      setMediaToUpdate([]);
      setErrorUploadMessage(null);
      dispatch(resetProductState());
    }
  }, [productStatus, dispatch, productError, mediaUrls]);

  // Effect to scroll to error message when an upload error occurs
  useEffect(() => {
    if (errorUploadMessage) {
      const alertElement = document.getElementById("alert");
      if (alertElement) {
        alertElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [errorUploadMessage]);

  // Handle form cancel action with confirmation
  function handleCancel(e) {
    e.preventDefault();
    if (window.confirm("Voulez-vous vraiment annuler?")) {
      dispatch(emptyMedia());
      setMediaToUpdate([]);
      setTimeout(() => {
        router.back();
      }, 1000);
    }
  }

  return {
    handleCancel,
    onSubmit,
    register,
    errors,
    media,
    setMedia,
    categoriesProduct,
    setCategoriesProduct,
    mediaToUpdate,
    setMediaToUpdate,
    errorUploadMessage,
  };
};
