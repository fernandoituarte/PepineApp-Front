"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getOrdersByUser, resetState } from "@/store/reducer/orders/orders";
import { useEffect, useState } from "react";

export const useOrdersByUser = (limit, offset) => {
  const dispatch = useAppDispatch();
  const { orders, error, loading, status } = useAppSelector(
    (state) => state.orders,
  );
  const { user } = useAppSelector((state) => state.auth);
  const [unauthorized, setUnauthorized] = useState();
  const [errorMesage, setErrorMesage] = useState();

  // Fetches all orders with specified limit, offset, and user id
  useEffect(() => {
    dispatch(getOrdersByUser({ limit, offset, id: user?.id }));
  }, [dispatch, user, limit, offset]);

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
