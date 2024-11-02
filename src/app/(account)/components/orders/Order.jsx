"use client";
import { OrderClientInfo, OrderInfo, OrderProduct } from "./";
import { useGetOrderDetails } from "@/hooks/useGetOrderDetails";
import { titleFont } from "@/config/fonts";
import { Message, Title, Spinner, ErrorComponent } from "@/components";

/**
 * `Order` component displays detailed information about a specific order based on its `id`.
 *
 * Features:
 * - Fetches order details including products, order summary, and client information.
 * - Displays order summary with information such as subtotal, total amount, and the user who placed the order.
 * - Allows admin users to see additional client information.
 *
 * Hooks:
 * - `useGetOrderDetails`: Retrieves order data, products, user info, and manages loading, unauthorized access.
 *
 * Sections:
 * - Products: Displays a list of products included in the order with their quantity and total price.
 * - Order Summary: Provides general order details such as date, time, subtotal, total, and tax.
 * - Client Information: Only visible to admins, shows the client's information.
 *
 * Conditions:
 * - Displays loading while fetching the order data.
 * - Shows an unauthorized message if the user does not have access to the order.
 */

export function Order({ id }) {
  const { products, order, user, unauthorized, isAdmin, loading, errorMesage } =
    useGetOrderDetails(id);

  if (loading === true) {
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
  return (
    <>
      <Title
        title={`Commande #${order ? order?.reference : ""}`}
        className={"text-center"}
      />
      {errorMesage ? (
        <Message
          title={"Erreur: "}
          className={"bg-red-100 border border-red-300 text-red-600 mb-5"}
          text={`${errorMesage}`}
        />
      ) : (
        <div className="lg:mx-auto xl:grid xl:grid-cols-3 xl:grid-row-6 gap-y-5 xl:gap-4 xl:max-h-[700px] xl:max-w-[1000px]">
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
                {products &&
                  products.map((product) => (
                    <OrderProduct key={product.id} {...product} />
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
            {order && <OrderInfo order={order} user={user} />}
          </div>

          {/* Client Information section, visible only to admins. */}
          {isAdmin && (
            <div className="border rounded-lg shadow-md xl:col-span-2 px-5 py-4">
              <h2
                className={`text-2xl font-bold antialiased mb-2 ${titleFont.className}`}
              >
                Info Client
              </h2>
              <OrderClientInfo user={user} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
