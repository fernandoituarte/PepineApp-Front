// Import React hooks, navigation functions, form handling, validation, and app utilities
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/validations/schemas";

import {
  addNewProduct,
  resetProductState,
} from "@/store/reducer/products/product";
import {
  deleteImage,
  emptyMedia,
  changeMediaStatus,
  uploadImage,
} from "@/store/reducer/media/media";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export const useCreateProduct = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // State to manage categories, media, product data, and upload errors
  const [categoriesProduct, setCategoriesProduct] = useState([]);
  const [mediaToUpdate, setMediaToUpdate] = useState([]);
  const [productToUpdate, setProductToUpdate] = useState();
  const [errorUploadMessage, setErrorUploadMessage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Select media and product status from the Redux store
  const {
    media: mediaUrls,
    status: mediaStatus,
    error: mediaError,
  } = useAppSelector((state) => state.media);
  const { status: productStatus, error: productError } = useAppSelector(
    (state) => state.product,
  );

  // Initialize form validation with the product schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  // Prepare and submit product data on form submission
  const onSubmit = handleSubmit((data) => {
    setIsSubmitting(false);

    setProductToUpdate({
      ...data,
      categories: categoriesProduct,
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

  // Effect to handle media upload success or failure
  useEffect(() => {
    if (
      (mediaStatus === 201 || mediaStatus === 204) &&
      !isSubmitting &&
      mediaUrls?.length > 0
    ) {
      setIsSubmitting(true);
      dispatch(addNewProduct({ ...productToUpdate, media: mediaUrls }));
      dispatch(changeMediaStatus(""));
    } else if (mediaStatus >= 400) {
      setErrorUploadMessage(mediaError);
    }
  }, [
    mediaStatus,
    isSubmitting,
    mediaUrls,
    dispatch,
    productToUpdate,
    mediaError,
  ]);

  // Effects to handle product creation status and media cleanup on error
  useEffect(() => {
    if (productStatus >= 400) {
      setErrorUploadMessage(productError);
      if (mediaUrls?.length > 0) {
        mediaUrls.forEach((url) => {
          const id = url.split("/")[5];
          dispatch(deleteImage(id));
        });
      }
      dispatch(resetProductState());
    }
    if (productStatus === "The product has been successfully registered.") {
      dispatch(emptyMedia());
      setMediaToUpdate([]);
      setErrorUploadMessage(null);
      dispatch(resetProductState());
    }
  }, [productStatus, dispatch, productError, mediaUrls]);

  // Scroll to the alert element when there's an error message
  useEffect(() => {
    if (errorUploadMessage) {
      const alertElement = document.getElementById("alert");
      if (alertElement) {
        alertElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [errorUploadMessage]);

  // Cancel action to reset media and navigate back
  const handleCancel = (e) => {
    e.preventDefault();
    if (window.confirm("Voulez-vous vraiment annuler?")) {
      dispatch(emptyMedia());
      setMediaToUpdate([]);
      setTimeout(() => router.back(), 1000);
    }
  };

  return {
    handleCancel,
    onSubmit,
    register,
    errors,
    categoriesProduct,
    setCategoriesProduct,
    setMediaToUpdate,
    mediaToUpdate,
    errorUploadMessage,
  };
};
