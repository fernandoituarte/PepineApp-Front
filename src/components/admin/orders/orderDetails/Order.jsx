"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { OrderClientInfo, OrderInfo, OrderProduct } from "@/components";
import { titleFont } from "@/config/fonts";
import { getOrderById } from "@/store/reducer/orders/orders";

export function Order({ userId, id, role }) {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.orders);

  // Fetch orders on component mount.
  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

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
            {order &&
              order?.products.map((product) => (
                <OrderProduct
                  key={`${product.product_name + product.product_price}`}
                  {...product}
                />
              ))}
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
        {order && <OrderInfo order={order} role={role} />}
      </div>

      {/* Client Information section, visible only to admins. */}
      {role === "admin" && (
        <div className="border rounded-lg shadow-md xl:col-span-2 px-5 py-4">
          <h2
            className={`text-2xl font-bold antialiased mb-2 ${titleFont.className}`}
          >
            Info Client
          </h2>
          <OrderClientInfo id={userId} />
        </div>
      )}
    </>
  );
}

export default Order;
