"use client";
import clsx from "clsx";
import { useUpdateOrderStatus } from "@/hooks/useUpdateOrderStatus";
import MoonLoader from "react-spinners/MoonLoader";

/**
 * `ChangeOrderStatusButton` is a dropdown button component that allows admins to change the status of an order.
 *
 * Features:
 * - Displays the current status of the order on the button.
 * - Allows status updates based on user role (admin users get more options).
 * - Handles loading state while updating the order status.
 *
 * Hooks:
 * - `useUpdateOrderStatus`: Manages the status update logic, including loading state and order status options.
 *
 * User Role:
 * - Admin users can change the status to "en cours", "validée", "retirée", or "annulée".
 * - Non-admin users are limited to cancelling ("annulée").
 *
 * Conditions:
 * - Loading spinner is shown while the status update is in progress.
 * - A dropdown menu is toggled to select the new status, visible only when `isOpen` is true.
 *
 * Styling:
 * - Button changes color based on the current status: red for "annulée", indigo for "en cours", green for "validée", blue for "retirée".
 */

export const ChangeOrderStatusButton = ({ order, role }) => {
  const {
    loading,
    status,
    isOpen,
    handleCancel,
    handleFinish,
    handleValidate,
    handleStart,
    toggleDropdown,
  } = useUpdateOrderStatus(order);

  return (
    <>
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className={clsx(
          "text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center",
          {
            "bg-red-500 hover:bg-red-700": status === "annulée",
          },
          {
            "bg-indigo-500 hover:bg-indigo-700": status === "en cours",
          },
          {
            "bg-green-500 hover:bg-green-700": status === "validée",
          },
          {
            "bg-blue-500 hover:bg-blue-700": status === "retirée",
          },
        )}
        type="button"
        onClick={toggleDropdown}
      >
        {/* Display current status */}
        {loading === "loading" ? (
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
