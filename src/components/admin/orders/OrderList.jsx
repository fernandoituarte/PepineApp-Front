// "use client" ensures that this file runs only on the client side in Next.js applications.
"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getOrdersList } from "@/store/reducer/orders/orders";
import { usePathname } from "next/navigation";
import { OrderItem } from "@/components";

export function Orders() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);
  const pathname = usePathname();

  // Determines if the current path is '/admin/files' to adjust shown orders based on the path.
  const files = pathname === "/admin/files";

  // Fetch orders on component mount.
  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  // Filter orders based on the page context, showing different statuses based on the path.
  const filteredOrders = orders.filter((order) => {
    if (files) {
      // Exclude orders with statuses 'en cours' (in progress) and 'validée' (validated) in admin files view.
      return !["en cours", "validée"].includes(order.status);
    } else {
      // Include only orders with statuses 'en cours' and 'validée' in other views.
      return ["en cours", "validée"].includes(order.status);
    }
  });

  return (
    <div className="sm:px-6 lg:px-8">
      <div className="mt-12 flow-root w-full m-auto">
        <div className="px-5 -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="min-w-full pb-10 align-middle sm:px-6 lg:px-10">
            <div className="lg:m-auto">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    {/* Table headers defining the data columns displayed */}
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
                      Référence
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Client/Cliente
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
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {/* Dynamically generate table rows from filtered orders data */}
                  {filteredOrders.map((order) => (
                    <OrderItem key={order.reference} {...order} />
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
