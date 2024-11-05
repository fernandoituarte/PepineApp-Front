"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useCreateOrder } from "../hooks/useCreateOrder";
import { useAppSelector } from "@/hooks/redux";

import { CartItem } from "./CartItem";
import { ModalCart } from "./ModalCart";
import { Message } from "@/components";

/**
 * `Cart` component allows users to view and manage their shopping cart.
 *
 * Features:
 * - Displays a list of cart items along with their total price.
 * - Shows error messages related to order creation if applicable.
 * - Includes a summary section for the order total with a reservation button.
 * - Integrates with custom hooks `useCreateOrder` for order management
 *   and `useAppSelector` for accessing the authentication state.
 * - Uses `ModalCart` to inform users of successful reservations.
 *
 * Interaction:
 * - Checks if the user is logged in and updates the session status accordingly.
 * - Allows users to reserve items if logged in; otherwise, redirects to the login page.
 * - Utilizes a button for reservation and a link for user login.
 */

export function Cart() {
  const { cartItems, clientTotal, handleReservation, errorMessage } =
    useCreateOrder();
  const { user, logged } = useAppSelector((state) => state.auth);
  const [sessionStatus, setSessionStatus] = useState(false);

  // Checks if the user is logged
  useEffect(() => {
    if (user) setSessionStatus(true);
  }, [user]);

  // Updates session status if the user is logged out.
  useEffect(() => {
    if (!logged) setSessionStatus(false);
  }, [logged]);

  return (
    <div className="bg-white">
      <ModalCart
        title={"Votre réservation à été enregistré"}
        subtitle={"La pépinière vous contactera rapidement"}
      />
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-2 sm:px-6 lg:max-w-7xl lg:px-8">
        {errorMessage && (
          <Message
            title={"Error: "}
            text={errorMessage}
            className={"bg-red-100 border border-red-300 text-red-600 mb-3"}
          />
        )}
        <form className="mt-7 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <ul className="divide-y divide-gray-200 border-b border-t mb-10 border-gray-200">
              {cartItems &&
                cartItems.map((item) => (
                  <CartItem key={item.product.id} {...item} />
                ))}
            </ul>
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-8 rounded-md bg-gray-50 px-4 py-4 sm:p-6 lg:rounded-lg lg:col-span-5 lg:mt-0 lg:px-8 lg:py-6"
          >
            <h2
              id="summary-heading"
              className="text-base font-medium text-gray-900 sm:text-lg"
            >
              Récapitulatif de la commande
            </h2>

            <dl className="mt-4 space-y-4 sm:mt-6">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm font-medium text-gray-900 sm:text-base">
                  Total de la commande TTC
                </dt>
                <dd className="text-sm font-medium text-gray-900 sm:text-base">
                  {cartItems ? clientTotal.toFixed(2) : "0.00"} €
                </dd>
              </div>
            </dl>

            <Message
              title={"Info: "}
              className={"bg-blue-50 text-blue-700 mt-5"}
              text={"Les commandes sont à retirer sur place"}
            />

            <div className="my-8 text-center lg:my-10">
              {sessionStatus ? (
                <button
                  type="button"
                  onClick={handleReservation}
                  className="w-full rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Réserver
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Connectez-vous pour réserver
                </Link>
              )}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
