"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getOrderById, resetState } from "@/store/reducer/orders/orders";
import { notFound, usePathname } from "next/navigation";

export const useGetOrderDetails = (id) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const { order, status, loading, error } = useAppSelector(
    (state) => state.orders,
  );
  const [unauthorized, setUnauthorized] = useState();
  const [errorMesage, setErrorMesage] = useState();
  const isAdmin = pathname.includes("admin");

  // Fetches a specific order by ID when an ID is provided
  useEffect(() => {
    if (id) dispatch(getOrderById(id));
  }, [dispatch, id]);

  // Error handling
  useEffect(() => {
    if (status === 401 || status === 403) {
      setUnauthorized(true);
      dispatch(resetState());
    } else if (status === 404) {
      dispatch(resetState());
      notFound();
    } else if (status === 500) {
      setErrorMesage(error);
      dispatch(resetState());
    }
  }, [status, dispatch, error]);

  return {
    products: order?.orderHasProducts,
    order,
    user: order?.user,
    isAdmin,
    unauthorized,
    errorMesage,
    loading,
  };
};
