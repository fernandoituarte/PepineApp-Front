"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/validations/schemas";

import {
  addNewProduct,
  productCategory,
  addCategory,
} from "@/store/reducer/products/products";
import { deleteImage, emptyMedia } from "@/store/reducer/products/media/media";
// Components
import { ImagesUploader, CategoriesBadges } from "@/components";
import { Modal } from "../../ui/Modal";
//Utils
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { inputs } from "@/utils/inputs";

export function AddProduct() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { mediumInputs, descriptionInputs, smallInputs, selectInputs } = inputs;
  const { productId, isProductSended, categoriesByProduct } = useAppSelector(
    (state) => state.products
  );
  const { mediaToDelete } = useAppSelector((state) => state.media);
  const [user_id, setUser_id] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(productSchema) });

  const onSubmit = handleSubmit((data) => {
    dispatch(addNewProduct({ ...data, user_id }));
  });

  useEffect(() => {
    if (productId && isProductSended) {
      categoriesByProduct.forEach((category) => {
        dispatch(
          productCategory({
            product_id: productId,
            category_id: category,
          })
        );
      });
    }
  }, [dispatch, isProductSended, productId, categoriesByProduct]);

  function handleCancel(e) {
    e.preventDefault();
    if (window.confirm("Voulez-vous vraiment annuler ?")) {
      mediaToDelete.map((item) => {
        dispatch(deleteImage(item.id));
      });
      dispatch(emptyMedia());
      setTimeout(() => {
        router.back();
      }, 1000);
    }
  }

  return (
    <motion.div
      className="max-w-4xl m-auto pb-10 px-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Modal
        title={"Votre produit a été enregistré"}
        subtitle={"Le produit a bien été crée et ajouté à la liste"}
      />
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Medium inputs */}
              {mediumInputs.map((item) => (
                <div key={item.name} className="col-span-1 md:col-span-2">
                  <label
                    htmlFor=""
                    className="block text-md mb-1 font-medium leading-6 text-gray-900"
                  >
                    {item.label}
                  </label>

                  <input
                    type="text"
                    name="name"
                    {...register(item.name)}
                    autoComplete="off"
                    className={
                      "block w-full rounded-md shadow-sm border ring-gray-300 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder={item.placeholder}
                  />
                  {errors[item.name]?.message && (
                    <p className="ml-2 text-red-500 text-sm">
                      {errors[item.name].message}
                    </p>
                  )}
                </div>
              ))}
              {/* Description inputs */}
              {descriptionInputs.map((item) => (
                <div
                  key={item.name}
                  className="col-span-1 md:col-span-2 lg:col-span-4"
                >
                  <label
                    htmlFor=""
                    className="block text-md mb-1 font-medium leading-6 text-gray-900"
                  >
                    {item.label}
                  </label>
                  <div className="rounded-md shadow-sm border ring-gray-300 ">
                    <textarea
                      name="description1"
                      {...register(item.name)}
                      rows="3"
                      className="block w-full border-0 bg-transparent py-2 px-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder={item.placeholder}
                    />
                  </div>
                  {errors[item.name]?.message && (
                    <p className="ml-2 text-red-500 text-sm">
                      {errors[item.name].message}
                    </p>
                  )}
                </div>
              ))}
              {/* Small inputs */}
              {smallInputs.map((item) => (
                <div
                  key={item.name}
                  className="col-span-1 md:col-span-1 lg:col-span-1"
                >
                  <label
                    htmlFor=""
                    className="block text-md mb-1 font-medium leading-6 text-gray-900"
                  >
                    {item.label}
                  </label>
                  <div className="rounded-md shadow-sm border ring-gray-300 ">
                    <input
                      type="text"
                      {...register(item.name, {
                        setValueAs: (value) => {
                          if (item.name === "price") {
                            const parsed = parseFloat(value);
                            return isNaN(parsed) ? 0 : parsed;
                          } else if (
                            item.name === "stock" ||
                            item.name === "vat"
                          ) {
                            const parsed = parseInt(value, 10);
                            return isNaN(parsed) ? 0 : parsed;
                          }
                          return value;
                        },
                      })}
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                      placeholder={item.placeholder}
                    />
                  </div>
                  {errors[item.name]?.message && (
                    <p className="ml-2 text-red-500 text-sm">
                      {errors[item.name].message}
                    </p>
                  )}
                </div>
              ))}
              {/* Select inputs */}
              {selectInputs.map((item) => (
                <div
                  key={item.name}
                  className="col-span-1 md:col-span-1 lg:col-span-1"
                >
                  <label
                    htmlFor=""
                    className="block text-md mb-1 font-medium leading-6 text-gray-900"
                  >
                    {item.label}
                  </label>
                  <div className="rounded-md shadow-sm border ring-gray-300 ">
                    <select
                      className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
                      {...register(item.name, {
                        setValueAs: (value) => parseInt(value, 10),
                      })}
                    >
                      {item.options?.map((item, index) => (
                        <option key={item} value={index + 1} type="number">
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors[item.name]?.message && (
                    <p className="ml-2 text-red-500 text-sm">
                      {errors[item.name].message}
                    </p>
                  )}
                </div>
              ))}
              {/* Category select */}
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-md mb-1 font-medium leading-6 text-gray-900"
                >
                  Categorie
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <select
                    onChange={(e) =>
                      dispatch(addCategory(parseFloat(e.target.value)))
                    }
                    className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
                  >
                    <option value={""} type="number">
                      Select
                    </option>
                    <option value={"1"} type="number">
                      Aromates et Médicinales
                    </option>
                    <option value={"2"} type="number">
                      Fruitiers
                    </option>
                    <option value={"3"} type="number">
                      Agrumes
                    </option>
                    <option value={"4"} type="number">
                      Plantes équines
                    </option>
                    <option value={"5"} type="number">
                      Fleuries/Ornementales
                    </option>
                    <option value={"6"} type="number">
                      Plants Potagers
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex sm:justify-center items-center mt-5">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("status")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gren-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">
                    Disponible
                  </span>
                </label>
              </div>
            </div>
            {/*Categories Badges */}
            <CategoriesBadges categoriesByProduct={categoriesByProduct} />
          </div>
        </div>
        <ImagesUploader />
        <div className="mt-6 flex items-center justify-around gap-x-6">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md w-[200px] px-3 py-2 text-sm font-semibold border hover:text-white shadow-sm hover:bg-red-400"
          >
            Annuler
          </button>
          <button className="rounded-md w-[200px] px-3 py-2 text-sm font-semibold text-white shadow-sm bg-orange-500 hover:bg-orange-400">
            Valider
          </button>
        </div>
      </form>
    </motion.div>
  );
}
