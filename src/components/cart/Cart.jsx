"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUserById } from "@/store/reducer/auth/login";
import {
  createOrderByUser,
  orderHasProducts,
} from "@/store/reducer/orders/orders";

import { CartItem, ModalCart, Message } from "@/components";
import { totalPriceSelector } from "@/store/reducer/cart/cart";

const EMAIL = process.env.NEXT_PUBLIC_EMAIL;
const PHONE = process.env.NEXT_PUBLIC_PHONE;

export function Cart({ id, role }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isOrderSended, orderId } = useAppSelector((state) => state.orders);
  const { user } = useAppSelector((state) => state.user);
  const { cartItems } = useAppSelector((state) => state.cart);
  const totalPrice = useAppSelector(totalPriceSelector);

  // Redirect to empty page if cart is empty.
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/empty");
    }
  }, [cartItems, router]);

  // Load user information from cookie and update user role state.
  useEffect(() => {
    if (id) dispatch(getUserById(id));
  }, [dispatch, id]);

  // Create order when required conditions meet.
  const handleReservation = () => {
    const orderData = {
      first_name_order: user.first_name,
      last_name_order: user.last_name,
      total_price: totalPrice.toFixed(2),
      status: "en cours",
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
    <div className="bg-white">
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
              {role ? (
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
    </div>
  );
}
