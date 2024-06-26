"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/validations/schemas";

import { addNewProduct } from "@/store/reducer/products/product";
import { productCategory } from "@/store/reducer/products/update-categories/productCategories";
import { deleteImage, emptyMedia } from "@/store/reducer/products/media/media";
// Components
import {
  ImagesUploader,
  CategoriesBadges,
  MediumInputs,
  DescriptionInputs,
  SmallInputs,
  SelectInputs,
  CategorySelect,
  StatusCheckbox,
  ButtonsForm,
  Modal,
} from "@/components";

//Utils
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { inputs } from "@/utils/inputs";

export function AddProduct({ userId }) {
  // Initialize router and dispatch for navigating and dispatching Redux actions.
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Retrieve form input configurations and selected Redux states.
  const { mediumInputs, descriptionInputs, smallInputs, selectInputs } = inputs;
  const { productId, isProductSended } = useAppSelector(
    (state) => state.product
  );
  const { categories } = useAppSelector((state) => state.productCategories);
  const { mediaToDelete } = useAppSelector((state) => state.media);

  // Setup the form handling using react-hook-form with Zod for schema validation.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  // Define the function to execute on form submission.
  const onSubmit = handleSubmit((data) => {
    dispatch(addNewProduct({ ...data, user_id: userId }));
  });

  // Use useEffect to perform actions after the product is added successfully.
  useEffect(() => {
    // Check if the product has been sent successfully to trigger category linkage.
    if (productId && isProductSended) {
      categories.forEach((category) => {
        dispatch(
          productCategory({
            product_id: productId,
            category_id: category,
          })
        );
      });
    }
  }, [dispatch, isProductSended, productId, categories]);

  // Define a function to handle cancellation of the form, including cleanup of media.
  function handleCancel(e) {
    e.preventDefault();
    // Confirm cancellation with the user.
    if (window.confirm("Voulez-vous vraiment annuler ?")) {
      // Delete all media marked for deletion and empty media state.
      mediaToDelete.map((item) => {
        dispatch(deleteImage(item.id));
      });
      dispatch(emptyMedia());
      // Navigate back after a short delay.
      setTimeout(() => {
        router.back();
      }, 1000);
    }
  }

  return (
    <div className="max-w-4xl m-auto pb-10 px-4">
      <Modal />
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Medium inputs */}
              {mediumInputs.map((item) => (
                <MediumInputs
                  key={item.name}
                  register={register}
                  item={item}
                  errors={errors}
                />
              ))}
              {/* Description inputs */}
              {descriptionInputs.map((item) => (
                <DescriptionInputs
                  key={item.name}
                  register={register}
                  item={item}
                  errors={errors}
                />
              ))}
              {/* Small inputs */}
              {smallInputs.map((item) => (
                <SmallInputs
                  key={item.name}
                  register={register}
                  item={item}
                  errors={errors}
                />
              ))}
              {/* Select inputs */}
              {selectInputs.map((item) => (
                <SelectInputs
                  key={item.name}
                  register={register}
                  item={item}
                  errors={errors}
                />
              ))}
              {/* Category select */}
              <CategorySelect />
              {/* Stutus checkbox */}
              <StatusCheckbox register={register} />
            </div>
            {/*Categories Badges */}
            <CategoriesBadges categories={categories} />
          </div>
        </div>
        {/* Images Uploader */}
        <ImagesUploader />
        <ButtonsForm handleCancel={handleCancel} />
      </form>
    </div>
  );
}
