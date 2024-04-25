"use client";

import { addCategory } from "@/store/reducer/products/update-categories/productCategories";

import { useAppDispatch } from "@/hooks/redux";

export function CategorySelect() {
  const dispatch = useAppDispatch();
  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-1">
      <label
        htmlFor=""
        className="block text-md mb-1 font-medium leading-6 text-gray-900"
      >
        Categorie
      </label>
      <div className="rounded-md shadow-sm border ring-gray-300 ">
        <select
          onChange={(e) => dispatch(addCategory(parseFloat(e.target.value)))}
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
  );
}
