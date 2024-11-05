"use client";

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
} from "../../../components";
import { ErrorComponent, Message } from "@/components";

import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { inputs } from "@/utils/inputs";

/**
 * The `UpdateProduct` component is responsible for rendering a form that allows admin to update an existing product.
 * It utilizes various input components for collecting product details such as text fields, descriptions,
 * category selection, status checkbox, and an image uploader. The form is populated with the current product data
 * and provides validation feedback through the `errors` object.
 *
 * The component leverages the `useUpdateProduct` hook, which manages the product state, handles the form submission,
 * and provides additional methods for managing media uploads and category badges.
 *
 * Props:
 * - `product`: The existing product data to prefill the form.
 * - `categoriesList`: A list of categories available for selection.
 *
 * This component includes the following features:
 * - Medium, small, and description inputs for product information.
 * - Category selection and badges for displaying selected categories.
 * - Image uploader to manage product images.
 * - Form submission and cancellation with validation errors.
 */

export function UpdateProduct({
  product,
  categoriesList,
  errorCategories,
  error,
}) {
  const {
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
  } = useUpdateProduct(product);

  if (errorCategories && errorCategories?.statusCode) {
    return <ErrorComponent text={errorCategories.message} />;
  }

  if (error && error?.statusCode) {
    return <ErrorComponent text={error.message} />;
  }

  return (
    <div className="max-w-4xl m-auto pb-10 px-4">
      <Modal />
      {errorUploadMessage && (
        <Message
          title={"Erreur: "}
          className={"bg-red-100 border border-red-300 text-red-600 mb-5"}
          text={`${errorUploadMessage}`}
        />
      )}
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Medium inputs */}
              {inputs.mediumInputs.map((item) => (
                <MediumInputs
                  key={item.name}
                  register={register}
                  item={item}
                  errors={errors}
                />
              ))}
              {/* Description inputs */}
              {inputs.descriptionInputs.map((item) => (
                <DescriptionInputs
                  key={item.name}
                  register={register}
                  item={item}
                  errors={errors}
                />
              ))}
              {/* Small inputs */}
              {inputs.smallInputs.map((item) => (
                <SmallInputs
                  key={item.name}
                  register={register}
                  item={item}
                  errors={errors}
                />
              ))}
              {/* Select inputs */}
              {inputs.selectInputs.map((item) => (
                <SelectInputs
                  key={item.name}
                  register={register}
                  item={item}
                  errors={errors}
                />
              ))}
              {/* Category select */}
              <CategorySelect
                categoriesProduct={categoriesProduct}
                setCategoriesProduct={setCategoriesProduct}
                categoriesList={categoriesList}
              />
              {/* Stutus checkbox */}
              <StatusCheckbox register={register} />
            </div>
            {/*Categories Badges */}
            <CategoriesBadges
              categoriesProduct={categoriesProduct}
              setCategoriesProduct={setCategoriesProduct}
            />
          </div>
        </div>
        {/* Images Uploader */}
        <ImagesUploader
          media={media}
          setMedia={setMedia}
          setMediaToUpdate={setMediaToUpdate}
          mediaToUpdate={mediaToUpdate}
        />
        <ButtonsForm handleCancel={handleCancel} />
      </form>
    </div>
  );
}
