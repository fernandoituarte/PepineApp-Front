// Client-only directive for Next.js to prevent server-side rendering issues.
"use client";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { getOrderById } from "@/store/reducer/orders/orders";
import {
  OrderClientInfo,
  OrderInfo,
  OrderProduct,
  SkeletonSmallText,
  SkeletonText,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";

/**
 * Primary component for displaying a full order detail page. It includes sections for products in the order,
 * order summary, and client information for admins. It also handles loading states and error management.
 *
 * @param {object} props - Component props.
 * @param {string} props.id - ID of the order to fetch and display.
 */
export function Order({ id }) {
  const dispatch = useAppDispatch();
  const { orderById, isChanged, error, loading } = useAppSelector(
    (state) => state.orders,
  );
  const { userRole: role } = useAppSelector((state) => state.user);

  // Effect to fetch the order data by ID when the component mounts or order changes.
  useEffect(() => {
    dispatch(getOrderById(id)); // Fetch order details from the server.
  }, [dispatch, id, isChanged]);

  // Effect to handle potential errors during fetching data.
  useEffect(() => {
    if (error) {
      notFound(); // Redirects to a 404 page if an error occurs (e.g., order not found).
    }
  }, [error]);

  return (
    <>
      {/* Products section displaying a list of products associated with the order */}
      <div className="mb-5 xl:mb-0 border rounded-lg min-h-[175px] pb-2 shadow-md xl:col-span-2">
        <h2
          className={`text-2xl font-bold antialiased mb-4 ${titleFont.className} px-5 pt-4`}
          style={{ fontFamily: titleFont.family }}
        >
          Produits
        </h2>
        <table className="min-w-full table-fixed divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-5 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                Produit
              </th>
              <th
                scope="col"
                className="py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Quantite
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr>
                <SkeletonSmallText />
              </tr> // Displays skeleton loaders when data is fetching.
            ) : (
              orderById?.products.map((product) => (
                <OrderProduct
                  key={`${product.product_name + product.product_price}`}
                  {...product}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Summary section, providing details like ordered date, time, subtotal, and total including tax. */}
      <div className="border mb-5 xl:mb-0 rounded-lg shadow-md xl:col-span-1 xl:row-span-2 px-5 py-4">
        <h2
          className={`text-2xl antialiased font-bold mb-4 ${titleFont.className}`}
        >
          Order Summary
        </h2>
        {loading ? (
          <SkeletonSmallText />
        ) : (
          orderById && (
            <OrderInfo order={orderById} role={role} loading={loading} />
          )
        )}
      </div>

      {/* Client Information section, visible only to admins. */}
      {role === "admin" && (
        <div className="border rounded-lg shadow-md xl:col-span-2 px-5 py-4">
          <h2
            className={`text-2xl font-bold antialiased mb-2 ${titleFont.className}`}
          >
            Info Client
          </h2>
          {loading ? (
            <SkeletonText />
          ) : (
            orderById && <OrderClientInfo order={orderById} />
          )}
        </div>
      )}
    </>
  );
}

export default Order;
