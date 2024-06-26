"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/validations/schemas";

import {
  updateProduct,
  getProductByIdToUpdate,
  statusProduct,
} from "@/store/reducer/products/product";
import {
  deleteProductCategory,
  productCategory,
  addCategory,
} from "@/store/reducer/products/update-categories/productCategories";
import { addImage } from "@/store/reducer/products/media/media";
// Components
import {
  Modal,
  ImagesUploader,
  CategoriesBadges,
  MediumInputs,
  DescriptionInputs,
  SmallInputs,
  SelectInputs,
  CategorySelect,
  StatusCheckbox,
  ButtonsForm,
} from "@/components";
//Utils
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { inputs } from "@/utils/inputs";

export function UpdateProduct({ id, userId }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mediumInputs, descriptionInputs, smallInputs, selectInputs } = inputs;
  const { productToUpdate, status } = useAppSelector((state) => state.product);
  const { categories, status: statusCategory } = useAppSelector(
    (state) => state.productCategories,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  //UseEffect to fetch a product by ID
  useEffect(() => {
    dispatch(getProductByIdToUpdate(id));
  }, [dispatch, id]);

  // This useEffect hook is triggered whenever the 'productToUpdate' change.
  useEffect(() => {
    // Check if there is a 'productToUpdate' object available. This means that product data has been fetched successfully.
    if (productToUpdate) {
      // The 'reset' function from useForm is used to reset form fields to the values in 'productToUpdate'..
      reset(productToUpdate);

      const { media_urls, media_id, category_id } = productToUpdate;
      // Check if 'media_urls' is truthy and the first item is not null, indicating there are valid media URLs to process.
      if (media_urls && media_urls[0] !== null) {
        // Map 'media_id' to an array of objects where each object contains an 'id' and a 'url'.
        // This mapping creates a new array 'media' where each element corresponds to an image with its 'id' and 'url'.
        const media = media_id.map((id, index) => ({
          id: id,
          url: media_urls[index],
        }));
        // Iterate over each 'media' item and dispatch an 'addImage' action for each.
        // This adds each image to the Redux store
        media.forEach((image) => {
          dispatch(addImage(image));
        });
      }
      if (category_id && category_id[0] !== null) {
        category_id.forEach((category) => {
          dispatch(addCategory(category));
        });
      }
    }
  }, [productToUpdate, reset, dispatch]);

  // Submit updated product details.
  const onSubmit = handleSubmit((data) => {
    const update = { ...data, user_id: userId };
    dispatch(updateProduct({ id, update }));
  });

  //UseEffect to delete all categories
  useEffect(() => {
    if (status === "product updated") {
      dispatch(deleteProductCategory(id));
    }
  }, [status, dispatch, id]);

  //UseEffect to add new categories
  useEffect(() => {
    if (
      statusCategory === "delete category success" ||
      statusCategory === "delete category rejected"
    ) {
      categories.forEach((category) => {
        dispatch(
          productCategory({
            product_id: id,
            category_id: category,
          }),
        );
      });
      dispatch(statusProduct(false));
    }
  }, [statusCategory, categories, dispatch, id]);

  // Handle form cancellation and confirmation.
  function handleCancel(e) {
    e.preventDefault();
    if (window.confirm("Voulez-vous vraiment annuler ?")) {
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
        <ImagesUploader id={id} />
        <ButtonsForm handleCancel={handleCancel} />
      </form>
    </div>
  );
}
