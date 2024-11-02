import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  createOrderByUser,
  orderHasProducts,
  deleteOrder,
  resetState,
} from "@/store/reducer/orders/orders";

import { totalPriceSelector } from "@/store/reducer/cart/cart";

export const useCreateOrder = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, orderId, error } = useAppSelector((state) => state.orders);
  const { cartItems } = useAppSelector((state) => state.cart);
  const totalPrice = useAppSelector(totalPriceSelector);
  const [clientTotal, setClientTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState();

  // Manage total price and redirect when the cart is empty.
  useEffect(() => {
    if (cartItems) {
      setClientTotal(totalPrice);
    }
    if (cartItems.length === 0 && router.pathname !== "/empty") {
      router.replace("/empty");
    }
  }, [cartItems, totalPrice, router]);

  // Create order when required conditions meet.
  const handleReservation = async () => {
    const orderData = {
      total_price: totalPrice,
      status: "en cours",
    };
    dispatch(createOrderByUser(orderData));
  };

  // Handle post-order actions like linking products to the order.
  useEffect(() => {
    let isMounted = true;

    const handleOrderDispatch = async () => {
      if (status === 201 && orderId && isMounted) {
        const productsToOrderWithOrderId = cartItems.map(
          ({ product, qty }) => ({
            order_id: orderId,
            product_id: product.id,
            quantity: qty,
            price_time_order: product.price,
            vat: 10,
          }),
        );

        const dispatchPromises = productsToOrderWithOrderId.map((element) =>
          dispatch(orderHasProducts(element)),
        );
        await Promise.all(dispatchPromises);
      }
    };

    handleOrderDispatch();

    return () => {
      isMounted = false;
    };
  }, [status, dispatch, cartItems, orderId]);

  //Error handling
  const clearError = useCallback(() => {
    dispatch(resetState());
    setErrorMessage("");
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setErrorMessage(
        "Une erreur est survenue lors de la validation de votre commande. Veuillez réessayer ou nous contacter si le problème persiste.",
      );
      if (orderId) {
        dispatch(deleteOrder(orderId));
      }
      setTimeout(clearError, 5000);
    }
  }, [error, orderId, dispatch, clearError]);

  return {
    cartItems,
    totalPrice,
    handleReservation,
    clientTotal,
    errorMessage,
  };
};
