"use client";

import {
  Pagination,
  Spinner,
  NotFoundResult,
  ErrorComponent,
} from "@/components";
import { OrderItemUser } from "./OrderItemUser";
import { useOrdersByUser } from "@/hooks/useOrdersByUser";

/**
 * `OrdersUser` component displays a paginated list of user orders with options for navigation.
 *
 * Features:
 * - Fetches and displays orders based on a limit and offset.
 * - Shows the order date, client name, total amount, and status in a table.
 * - Includes pagination controls for navigating through multiple pages of orders.
 *
 * Hooks:
 * - `useOrdersByUser`: Retrieves orders, total pages, and handles loading, unauthorized access, and not found states.
 *
 * Conditions:
 * - Displays loading message while fetching data.
 * - Displays a message if the user is unauthorized or if no orders are found.
 *
 * Pagination:
 * - Uses a `Pagination` component to allow the user to navigate through pages of orders.
 */

export function OrdersUser({ limit, offset }) {
  const {
    unauthorized,
    orders,
    totalPages,
    totalOrders,
    loading,
    errorMesage,
  } = useOrdersByUser(limit, offset);

  if (loading) {
    return (
      <div className="sm:w-4/5 md:w-2/3 xl:w-1/2 mx-auto mt-8 p-6">
        <Spinner />
      </div>
    );
  }

  if (unauthorized) {
    return (
      <ErrorComponent
        text={`Autorisations insuffisantes pour afficher ces informations.`}
      />
    );
  }

  if (totalOrders === 0) {
    return (
      <NotFoundResult text={`Aucune commande n'a été passée pour le moment`} />
    );
  }

  if (errorMesage) {
    return <ErrorComponent text={errorMesage} />;
  }

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
                  {orders &&
                    orders.map((order) => (
                      <OrderItemUser key={order.id} {...order} />
                    ))}
                </tbody>
              </table>
              {/* Pagination */}
              <Pagination
                totalPages={totalPages}
                limit={limit}
                baseUrl={"/user/orders"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
