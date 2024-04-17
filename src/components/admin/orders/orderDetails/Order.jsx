"use client";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
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

export function Order({ id }) {
  const dispatch = useAppDispatch();
  const { orderById, isChanged, error, loading } = useAppSelector(
    (state) => state.orders
  );
  const [role, setRole] = useState();

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      const { role } = JSON.parse(userCookie);
      setRole(role);
    }
    dispatch(getOrderById(id));
  }, [dispatch, id, isChanged]);
  useEffect(() => {
    if (error) {
      notFound();
    }
  }, [error]);

  return (
    <>
      <div className="mb-5 xl:mb-0 border rounded-lg min-h-[175px] pb-2 shadow-md xl:col-span-2">
        <h2
          className={`text-2xl font-bold antialiased mb-4 ${titleFont.className} px-5 pt-4`}
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
              <tr className="hover:bg-gray-100 rounded-sm">
                <td className="whitespace-nowrap pl-5 py-4 pr-3 text-sm font-medium text-gray-900">
                  <SkeletonSmallText />
                </td>
                <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">
                  <SkeletonSmallText />
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <SkeletonSmallText />
                </td>
              </tr>
            ) : (
              orderById?.products &&
              orderById.products.map((product) => (
                <OrderProduct
                  key={`${product.product_name + product.product_price}`}
                  {...product}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/*Order Summary*/}
      <div className="border mb-5 xl:mb-0 rounded-lg shadow-md xl:col-span-1 xl:row-span-2 px-5 py-4">
        <h2
          className={`text-2xl antialiased font-bold mb-4 ${titleFont.className}`}
        >
          Order Summary
        </h2>
        {loading ? (
          <div>
            <p className="font-semibold mb-3 flex justify-between">
              Commandé le <SkeletonSmallText />
            </p>
            <p className="font-semibold mb-3 flex justify-between">
              Heure de commande <SkeletonSmallText />
            </p>
            <p className="font-semibold mb-3 flex justify-between">
              Sous-Total <SkeletonSmallText />
            </p>
            <p className="font-semibold flex justify-between">
              TVA (10%) <SkeletonSmallText />
            </p>
            {/* Line Separator */}
            <div className="w-full h-px bg-gray-200 my-8" />
            <p className="text-2xl font-bold mb-2 mt-5 flex justify-between">
              Total <SkeletonSmallText />
            </p>
          </div>
        ) : (
          orderById && (
            <OrderInfo order={orderById} role={role} loading={loading} />
          )
        )}
      </div>

      {/*Info Client*/}
      {role === "admin" && (
        <div className="border rounded-lg shadow-md xl:col-span-2 px-5 py-4">
          <h2
            className={`text-2xl font-bold antialiased mb-2 ${titleFont.className}`}
          >
            Info Client
          </h2>
          {loading ? (
            <div>
              <p className="font-semibold mb-2 flex justify-between">
                Nom <SkeletonText />
              </p>
              <p className="font-semibold mb-2 flex justify-between">
                Email <SkeletonText />
              </p>
              <p className="font-semibold mb-2 flex justify-between">
                Téléphone <SkeletonText />
              </p>
              <p className="font-semibold mb-2 flex justify-between">
                Client depuis le
                <SkeletonText />
              </p>
            </div>
          ) : (
            orderById && <OrderClientInfo order={orderById} />
          )}
        </div>
      )}
    </>
  );
}

export default Order;
