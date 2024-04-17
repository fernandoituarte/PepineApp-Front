"use client";
import { useEffect } from "react";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchProduits,
  emptyCategories,
} from "@/store/reducer/products/products";
import { emptyMedia } from "@/store/reducer/products/media/media";
import { BsPlus } from "react-icons/bs";

import { ProductItem } from "./ProductItem";

export function ProductList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const handleAddProduct = () => {
    dispatch(emptyCategories());
    dispatch(emptyMedia());
  };

  useEffect(() => {
    dispatch(fetchProduits());
  }, [dispatch]);

  return (
    <div className="px-6 sm:px-6 lg:px-8">
      <div className="mt-12 flow-root m-auto">
        <div className="px-5 -mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle ">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900  sm:pl-6 lg:pl-8"
                  >
                    Articles
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900  xl:table-cell"
                  >
                    Categorie
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900  xl:table-cell"
                  >
                    Nom scientifique
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900  lg:table-cell"
                  >
                    Taille
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900  sm:table-cell"
                  >
                    Pot
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900  lg:table-cell"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900  lg:table-cell"
                  >
                    TVA
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
                  >
                    Prix
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 border-b hidden border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900  sm:table-cell"
                  >
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <ProductItem key={index} {...item} />
                ))}
              </tbody>
            </table>
          </div>

          <Link
            href={"/admin/products/add-product"}
            onClick={handleAddProduct}
            className="fixed z-20 bottom-8 right-8  backdrop-blur-sm bg-indigo-500/40 w-18 h-18 w-20 h-20 rounded-full flex flex-col items-center justify-center"
          >
            <BsPlus size={60} className=" text-gray-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}
