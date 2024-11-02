"use client";

import { useEffect } from "react";
import { Pagination, Spinner, NotFoundResult } from "@/components";
import { ProductItem } from "./ProductItem";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAllProducts } from "@/store/reducer/products/product";

export const Products = ({ limit, offset }) => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts({ limit, offset }));
  }, [dispatch, limit, offset]);

  if (loading) {
    return (
      <div className="sm:w-4/5 md:w-2/3 xl:w-1/2 mx-auto mt-8 p-6">
        <Spinner />
      </div>
    );
  }

  if (products && products.totalProducts === 0) {
    return <NotFoundResult text={`Aucun produit n'a été trouvé`} />;
  }

  //Product List
  return (
    <>
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
            {/* Maps over the products array and renders each product using the ProductItem component. */}
            {products &&
              products.products.map((item, index) => (
                <ProductItem key={index} {...item} />
              ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <Pagination
        totalPages={products?.totalPages}
        limit={limit}
        offset={offset}
        baseUrl={"/admin/products"}
      />
    </>
  );
};
