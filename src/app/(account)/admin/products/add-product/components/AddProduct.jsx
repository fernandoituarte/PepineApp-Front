"use client";

import { Message } from "@/components";
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
} from "../../components";

import { useCreateProduct } from "../hooks/useCreateProduct";
import { inputs } from "@/utils/inputs";

/**
 * The `AddProduct` component renders a form that allows admin to create a new product by inputting various details
 * such as product information, category selection, and images. It integrates multiple input components and handles
 * form submission with validation.
 *
 * The component uses the `useCreateProduct` hook to manage form state, handle submission logic, and manage media
 * uploads and category selections. Validation errors are displayed next to the relevant fields.
 *
 * Props:
 * - `categoriesList`: A list of categories available for selection during product creation.
 *
 * Key features:
 * - Medium, small, and description inputs for entering product details.
 * - Category selection and badges to display selected categories.
 * - Image uploader for adding product images.
 * - Form submission with validation feedback and cancel functionality.
 */

export function AddProduct({ categoriesList }) {
  const {
    handleCancel,
    onSubmit,
    register,
    errors,
    categoriesProduct,
    setCategoriesProduct,
    setMediaToUpdate,
    mediaToUpdate,
    errorUploadMessage,
  } = useCreateProduct();

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
      {/* <AlertWithDecorators /> */}
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                categoriesList={categoriesList.categories}
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
          setMediaToUpdate={setMediaToUpdate}
          mediaToUpdate={mediaToUpdate}
        />
        <ButtonsForm handleCancel={handleCancel} />
      </form>
    </div>
  );
}
