"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { getUserById } from "@/store/reducer/auth/login";
import {
  createOrderByUser,
  orderHasProducts,
} from "@/store/reducer/orders/orders";
import { motion } from "framer-motion";

import { CartItem, ModalCart } from "@/components";
import { totalPriceSelector, setCartItems } from "@/store/reducer/cart/cart";

export function Cart() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { reservationSuccess, isOrderSended, orderId } = useAppSelector(
    (state) => state.orders,
  );
  const { user } = useAppSelector((state) => state.user);
  const { cartItems } = useAppSelector((state) => state.cart);
  const totalPrice = useAppSelector(totalPriceSelector);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/empty");
    }
  }, [cartItems, router]);

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      const { id, role } = JSON.parse(userCookie);
      dispatch(getUserById(id));
    }
  }, [dispatch, router]);

  // Function to handle reservation (order creation)
  const handleReservation = () => {
    const orderData = {
      first_name_order: user.first_name,
      last_name_order: user.last_name,
      total_price: totalPrice,
      status: "en cours",
      user_id: user.id,
    };

    dispatch(createOrderByUser(orderData));
  };

  // Effect to handle order products after order is sent
  useEffect(() => {
    if (isOrderSended && orderId) {
      const productsToOrderWithOrderId = cartItems.map((item) => ({
        order_id: orderId,
        product_id: item.product.id,
        quantity: item.qty,
        price_time_order: item.product.price,
        vat: 10,
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
      <ModalCart />
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-2 sm:px-6 lg:max-w-7xl lg:px-8">
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cartItems &&
                cartItems.map((product) => (
                  <CartItem key={product.id} {...product} />
                ))}
            </ul>
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
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Sous-total</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {" "}
                  {totalPrice}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>TVA 0 %</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">0 €</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Total de la commande
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {totalPrice} €
                </dd>
              </div>
            </dl>
            <div className="mt-6 text-center">
              {user ? (
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
          </section>
        </form>
      </div>
    </motion.div>
  );
}
