"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAllOrders, resetState } from "@/store/reducer/orders/orders";
import { useEffect, useState } from "react";

export const useOrders = (limit, offset, history) => {
  const dispatch = useAppDispatch();
  const { orders, error, loading, status } = useAppSelector(
    (state) => state.orders,
  );
  const [unauthorized, setUnauthorized] = useState();
  const [errorMesage, setErrorMesage] = useState();
  const params = history ? "&status=annulée&status=retirée" : "";

  // Fetches all orders with specified limit, offset, and filter parameters
  useEffect(() => {
    dispatch(getAllOrders({ limit, offset, params }));
  }, [dispatch, params, limit, offset]);

  // Error handling
  useEffect(() => {
    if (status === 401 || status === 403) {
      setUnauthorized(true);
      dispatch(resetState());
    } else if (status === 500) {
      setErrorMesage(error);
      dispatch(resetState());
      setTimeout(() => {
        setErrorMesage(null);
      }, 3000);
    }
  }, [status, dispatch, error]);

  return {
    unauthorized,
    errorMesage,
    orders: orders.orders,
    totalPages: orders.totalPages,
    totalOrders: orders.totalOrders,
    loading,
  };
};
