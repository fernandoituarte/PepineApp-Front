"use client";
import { Message } from "@/components";
import { ChangeOrderStatusButton } from "./ChangeOrderStatusButton";
import { useUpdateOrderStatus } from "@/hooks/useUpdateOrderStatus";
import MoonLoader from "react-spinners/MoonLoader";

/**
 * `OrderInfo` displays details about the order, such as the date, time, status, and total price.
 *
 * Features:
 * - Shows order information including the date it was placed, the time, and the current status.
 * - Includes a button to change the order status (for admins) or cancel the order (for users).
 *
 * Props:
 * - `order`: The order object containing details like `createdAt`, `total_price`, and current status.
 * - `user`: The user object, which determines whether admin or user actions are shown.
 *
 * Components:
 * - `ChangeOrderStatusButton`: For admins, allowing them to change the order status.
 * - A cancel button for regular users to cancel the order if its status is "en cours".
 *
 * Behavior:
 * - Formats the order's creation date and time using the `fr-FR` locale.
 * - Shows a cancel button for users if the order is still "en cours".
 * - Displays a loading spinner (`MoonLoader`) while actions like canceling are being processed.
 * - Disables the cancel button if the order is already canceled.
 */

export const OrderInfo = ({ order, user }) => {
  const date = new Date(order.createdAt);
  const ddmmyy = date.toLocaleDateString("fr-FR");
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const { loading, status, handleCancel, errorMesage, unauthorized } =
    useUpdateOrderStatus(order.id);

  return (
    <div className="relative">
      <div className="mb-6">
        <p className="font-semibold mb-3 flex justify-between">
          Commandé le <span className="font-normal">{ddmmyy}</span>
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
      {user.role === "admin" && (
        <ChangeOrderStatusButton order={order} role={user.role} />
      )}
      {user.role === "user" &&
        (status === "en cours" ? (
          <button
            onClick={handleCancel}
            className="w-full mt-2 py-2 antialiased rounded-lg bg-[#be5555] hover:bg-[#be55557e]  text-white"
          >
            {loading === "loading" ? (
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

      {errorMesage && (
        <Message
          className="bg-red-100 border border-red-300 text-red-600 mb-3"
          title="Error: "
          text={errorMesage}
        />
      )}
      {unauthorized && (
        <Message
          className="bg-red-100 border border-red-300 text-red-600 mb-3"
          title="Error: "
          text={`Vous n'avez pas des droits pour acceder a ce contenu`}
        />
      )}
    </div>
  );
};
