"use client";
import {
  Pagination,
  Spinner,
  NotFoundResult,
  ErrorComponent,
} from "@/components";
import { OrderItem } from "./OrderItem";
import { useOrders } from "@/hooks/useOrders";

export function Orders({ limit, offset, history }) {
  const {
    unauthorized,
    totalOrders,
    orders,
    totalPages,
    loading,
    errorMesage,
  } = useOrders(limit, offset, history);

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
        text={`Vous n'avez pas des droits pour acceder a ce contenu`}
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
    <div className="sm:px-6 lg:px-8">
      <div className="mt-7 flow-root w-full m-auto">
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
                  {orders &&
                    orders.map((order) => (
                      <OrderItem key={order.id} {...order} />
                    ))}
                </tbody>
              </table>
              {/* Pagination */}
              <Pagination
                totalPages={totalPages}
                limit={limit}
                baseUrl={history ? "/admin/orders/history" : "/admin/orders"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
