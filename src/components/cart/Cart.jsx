"use client"; // Directs Next.js to only load this module in the client-side environment.

import { useEffect, useState } from "react"; // Imports for React built-in hooks.
import { useAppSelector, useAppDispatch } from "@/hooks/redux"; // Custom hooks for accessing Redux state and dispatching actions.
import Link from "next/link"; // Next.js Link component for client-side navigation.
import { useRouter } from "next/navigation"; // Next.js hook for routing.
import { getCookie } from "cookies-next"; // Function to get cookies.
import { getUserById } from "@/store/reducer/auth/login"; // Action to retrieve user details by ID.
import {
  createOrderByUser,
  orderHasProducts,
} from "@/store/reducer/orders/orders"; // Actions related to order processing.
import { motion } from "framer-motion"; // Library for animations.
import { CartItem, ModalCart, Message } from "@/components"; // Custom components.
import { totalPriceSelector } from "@/store/reducer/cart/cart"; // Selector to compute total price of cart items.

// Environment variables for contact information.
const EMAIL = process.env.NEXT_PUBLIC_EMAIL;
const PHONE = process.env.NEXT_PUBLIC_PHONE;

export function Cart() {
  const dispatch = useAppDispatch(); // Initialize dispatch function.
  const router = useRouter(); // Initialize router.
  const { isOrderSended, orderId } = useAppSelector((state) => state.orders); // Select order status and ID from Redux store.
  const { user, userId, userRole } = useAppSelector((state) => state.user); // Select user information from Redux store.
  const { cartItems } = useAppSelector((state) => state.cart); // Select cart items from Redux store.
  const totalPrice = useAppSelector(totalPriceSelector); // Calculate total price of cart items.

  // Redirect to empty page if cart is empty.
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/empty");
    }
  }, [cartItems, router]);

  // Load user information from cookie and update user role state.
  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);

  // Create order when required conditions meet.
  const handleReservation = () => {
    const orderData = {
      first_name_order: user.first_name,
      last_name_order: user.last_name,
      total_price: totalPrice.toFixed(2), // Format total price to two decimal places.
      status: "en cours", // Initial status of the order.
      user_id: user.id,
    };
    dispatch(createOrderByUser(orderData));
  };

  // Handle post-order actions like linking products to the order.
  useEffect(() => {
    if (isOrderSended && orderId) {
      const productsToOrderWithOrderId = cartItems.map((item) => ({
        order_id: orderId,
        product_id: item.product.id,
        quantity: item.qty,
        price_time_order: item.product.price,
        vat: 10, // Assume a fixed VAT rate for demonstration.
      }));

      dispatch(orderHasProducts(productsToOrderWithOrderId));
    }
  }, [isOrderSended, dispatch, cartItems, orderId]);

  return (
    <motion.div
      className="bg-white"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <ModalCart
        title={"Votre réservation à été enregistré"}
        subtitle={"La pépinière vous contactera rapidement"}
      />
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-2 sm:px-6 lg:max-w-7xl lg:px-8">
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <ul className="divide-y divide-gray-200 border-b border-t mb-10 border-gray-200">
              {cartItems &&
                cartItems.map((product) => (
                  <CartItem key={product.id} {...product} />
                ))}
            </ul>
            <Link
              href={"/products"}
              className="bg-amber-500 text-white flex justify-center py-3 px-5 rounded-lg mx-auto lg:max-w-80"
            >
              Ajouter des articles
            </Link>
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Récapitulatif de la commande
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Total de la commande TTC
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {totalPrice.toFixed(2)} €
                </dd>
              </div>
            </dl>
            <Message
              title={"Info: "}
              className={"bg-blue-50 text-blue-700 mt-5"}
              text={"Les commandes sont a retirer sur place"}
            />
            <div className="my-10 text-center">
              {userRole ? (
                <button
                  type="button"
                  onClick={handleReservation}
                  className="w-full rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Réserver
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  prefetch={true}
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Connectez-vous pour réserver
                </Link>
              )}
            </div>
            <Message
              title={""}
              className={"bg-slate-100 text-slate-700 mt-5"}
              text={`Pour toutes questions n'hesitez pas à nous contacter au ${PHONE} ou par mail: ${EMAIL}`}
            />
          </section>
        </form>
      </div>
    </motion.div>
  );
}
