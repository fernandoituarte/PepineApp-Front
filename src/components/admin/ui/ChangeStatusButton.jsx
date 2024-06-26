"use client";
import clsx from "clsx";
import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeStatus } from "@/store/reducer/orders/orders";

import {
  decrementProductStock,
  incrementProductStock,
} from "@/lib/updateProductStock";

import MoonLoader from "react-spinners/MoonLoader";

export const ChangeStatusButton = ({ order, role }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(order.status);
  const { orderStatus, loading } = useAppSelector((state) => state.orders);
  // Function to toggle dropdown visibility.
  const toggleDropdown = () => setIsOpen(!isOpen);

  const { id } = order;

  useEffect(() => {
    if (orderStatus) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  // Handles the start of an order process.
  const handleStart = () => {
    dispatch(changeStatus({ status: "en cours", id }));
  };

  // Handles the validation of an order.
  const handleValidate = () => {
    dispatch(changeStatus({ status: "validée", id }));
  };

  // Handles the completion of an order and decrements stock based on the ordered quantity.
  const handleFinish = () => {
    dispatch(changeStatus({ status: "retirée", id }));
    order.products.forEach((product) => {
      decrementProductStock(product.product_id, product.quantity_ordered);
    });
  };

  // Handles the cancellation of an order and potentially increments stock if the order was previously completed.
  const handleCancel = () => {
    if (window.confirm("Voulez-vous vraiment annuler cette commande?")) {
      dispatch(changeStatus({ status: "annulée", id }));
      if (status === "retirée")
        order.products.forEach((product) => {
          incrementProductStock(product.product_id, product.quantity_ordered);
        });
    }
  };

  return (
    <>
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className={clsx(
          "text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center",
          {
            "bg-red-500 hover:bg-red-700": status === "annulée", // Red theme for 'annulée' status.
          },
          {
            "bg-indigo-500 hover:bg-indigo-700": status === "en cours", // Indigo theme for 'en cours' status.
          },
          {
            "bg-green-500 hover:bg-green-700": status === "validée", // Green theme for 'validée' status.
          },
          {
            "bg-blue-500 hover:bg-blue-700": status === "retirée", // Blue theme for 'retirée' status.
          },
        )}
        type="button"
        onClick={toggleDropdown} // Handler for opening/closing the dropdown.
      >
        {/* Display current status */}
        {loading ? (
          <MoonLoader color="#ffffff" size={20} speedMultiplier={0.4} />
        ) : (
          <span className="flex-grow text-center"> {status} </span>
        )}{" "}
        {/* Down arrow icon indicating a dropdown */}
      </button>

      {/* Dropdown menu for changing the status, shown or hidden based on `isOpen` state. */}
      <div
        id="dropdownDivider"
        className={`absolute z-10 ${
          isOpen ? "" : "hidden"
        } bg-white divide-y divide-gray-100 w-full rounded-lg shadow top-full mt-1`}
      >
        {role === "admin" && (
          <ul className="py-2 text-sm" aria-labelledby="dropdownDividerButton">
            <li>
              <button
                onClick={handleStart}
                className="block w-full px-4 py-2 hover:bg-gray-100"
              >
                En cours {/* Option to change status to 'En cours' */}
              </button>
            </li>
            <li>
              <button
                onClick={handleValidate}
                className="block w-full px-4 py-2 hover:bg-gray-100"
              >
                Validée {/* Option to change status to 'Validée' */}
              </button>
            </li>
            <li>
              <button
                onClick={handleFinish}
                className="block w-full px-4 py-2 hover:bg-gray-100"
              >
                Retirée {/* Option to change status to 'Retirée' */}
              </button>
            </li>
          </ul>
        )}
        <div className="py-2">
          <button
            onClick={handleCancel}
            className="block w-full px-4 py-2 text-sm "
          >
            {role === "admin" ? "Annulée" : "Annuler"}{" "}
            {/* Option to change status to 'Annulée' */}
          </button>
        </div>
      </div>
    </>
  );
};
