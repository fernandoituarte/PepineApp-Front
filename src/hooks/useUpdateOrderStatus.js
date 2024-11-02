import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateOrder, resetState } from "@/store/reducer/orders/orders";

import {
  decrementProductStock,
  incrementProductStock,
} from "@/lib/updateProductStock";

export const useUpdateOrderStatus = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState();
  const [unauthorized, setUnauthorized] = useState();
  const [errorMesage, setErrorMesage] = useState();
  const {
    order,
    loading,
    error,
    status: orderStatus,
  } = useAppSelector((state) => state.orders);
  // Function to toggle dropdown visibility.
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  // Handles the start of an order process.
  const handleStart = () => {
    dispatch(updateOrder({ status: "en cours", id: order.id }));

    if (status === "retirée") {
      order.orderHasProducts.forEach((item) => {
        incrementProductStock(item.product.id, item.quantity);
      });
    }
  };

  // Handles the validation of an order.
  const handleValidate = () => {
    dispatch(updateOrder({ status: "validée", id: order.id }));

    if (status === "retirée") {
      order.orderHasProducts.forEach((item) => {
        incrementProductStock(item.product.id, item.quantity);
      });
    }
  };

  // Handles the completion of an order and decrements stock based on the ordered quantity.
  const handleFinish = () => {
    if (status !== "retirée") {
      dispatch(updateOrder({ status: "retirée", id: order.id }));

      order.orderHasProducts.forEach((item) => {
        decrementProductStock(item.product.id, item.quantity);
      });
    }
  };

  // Handles the cancellation of an order and potentially increments stock if the order was previously completed.
  const handleCancel = () => {
    if (status !== "annulée") {
      if (window.confirm("Voulez-vous vraiment annuler cette commande?")) {
        dispatch(updateOrder({ status: "annulée", id: order.id }));

        order.orderHasProducts.forEach((item) => {
          incrementProductStock(item.product.id, item.quantity);
        });
      }
    }
  };

  // Error handling
  useEffect(() => {
    if (orderStatus === 401 || orderStatus === 403) {
      setUnauthorized(true);
      dispatch(resetState());
    } else if (orderStatus === 500) {
      setErrorMesage(error);
      dispatch(resetState());
      setTimeout(() => {
        setErrorMesage(null);
      }, 3000);
    }
  }, [orderStatus, dispatch, error]);

  return {
    loading,
    status,
    isOpen,
    handleCancel,
    handleFinish,
    handleValidate,
    handleStart,
    toggleDropdown,
    errorMesage,
    unauthorized,
  };
};
