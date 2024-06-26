"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ordersOfOneUser } from "@/store/reducer/orders/orders";
import { OrderItemUser } from "@/components";

export function OrdersUser({ id }) {
  const dispatch = useAppDispatch();

  const { userOrders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(ordersOfOneUser(id));
  }, [dispatch, id]);

  return (
    <div className="px-6 sm:px-6 lg:px-8">
      <div className="mt-12 flow-root w-full m-auto">
        <div className="px-5 -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="min-w-full pb-10 align-middle sm:px-6 lg:px-10">
            <div className="relative lg:m-auto ">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    {/* Column definitions for the user orders table */}
                    <th
                      scope="col"
                      className="min-w-[10rem] hidden md:inline-flex py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 hidden md:inline-flex text-left text-sm font-semibold text-gray-900"
                    >
                      Reference
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Client
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {/* Map and render each user order as a row in the table */}
                  {userOrders &&
                    userOrders.map((order) => (
                      <OrderItemUser key={order.reference} {...order} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
