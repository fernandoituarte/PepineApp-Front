"use client";
import { ChangeStatusButton } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeStatus } from "@/store/reducer/orders/orders";
import { useEffect, useState } from "react";

import MoonLoader from "react-spinners/MoonLoader";

export const OrderInfo = ({ order, role }) => {
  const dispatch = useAppDispatch();
  const { orderStatus, loading } = useAppSelector((state) => state.orders);
  const [status, setStatus] = useState(order.status);
  // Convert date from ISO string to readable format.
  const date = new Date(order.created_at);
  const DDMMYYYY = date.toLocaleDateString("fr-FR");
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const handleCancel = () => {
    if (window.confirm("Voulez-vous vraiment annuler cette commande?")) {
      dispatch(changeStatus({ status: "annulée", id: order.id }));
    }
  };

  useEffect(() => {
    if (orderStatus) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  return (
    <div className="relative">
      <div className="mb-6">
        <p className="font-semibold mb-3 flex justify-between">
          Commandé le <span className="font-normal">{DDMMYYYY}</span>
        </p>
        <p className="font-semibold mb-3 flex justify-between">
          Heure de commande{" "}
          <span className="font-normal">
            {hours}h{minutes}
          </span>
        </p>
        <p className="font-semibold mb-3 flex justify-between">
          Statut de la commande <span className="font-normal">{status}</span>
        </p>
        <div className="w-full h-px bg-gray-200 my-8" />
        <p className="text-2xl font-bold mb-2 mt-5 flex justify-between">
          Total <span className="font-normal">{order.total_price} €</span>
        </p>
      </div>
      {role === "admin" && <ChangeStatusButton order={order} role={role} />}
      {role === "user" &&
        (status === "en cours" ? (
          <button
            onClick={handleCancel}
            className="w-full mt-2 py-2 antialiased rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            {loading ? (
              <MoonLoader color="#ffffff" size={20} speedMultiplier={0.4} />
            ) : (
              <span className="flex-grow text-center"> Annuler </span>
            )}
          </button>
        ) : (
          <button
            disabled
            className="w-full mt-2 py-2 antialiased rounded-lg bg-red-200 hover:bg-red-200 text-white"
          >
            Annulée
          </button>
        ))}
    </div>
  );
};
