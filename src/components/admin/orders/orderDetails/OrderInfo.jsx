// Imports necessary hooks and components from the project's structure.
import { useAppDispatch } from "@/hooks/redux";
import { changeStatus } from "@/store/reducer/orders/orders";
import { ChangeStatusButton } from "@/components";
import { SkeletonSmallText } from "../../../ui/Spinners/SkeletonOrderProduct";
import {
  decrementProductStock,
  incrementProductStock,
} from "@/lib/updateProductStock";

/**
 * Displays detailed order information, including status manipulation options if the user is an admin.
 * It also handles stock adjustments based on order status changes.
 *
 * @param {object} order - Contains details of the order like date, id, total price, and status.
 * @param {string} role - User role ('admin' or 'user'), determines what actions can be performed.
 * @param {boolean} loading - Indicates if order details are being loaded.
 */
export const OrderInfo = ({ order, role, loading }) => {
  const { created_at, id, total_price, status } = order;
  const dispatch = useAppDispatch();

  // Convert date from ISO string to readable format.
  const date = new Date(created_at);
  const DDMMYYYY = date.toLocaleDateString("fr-FR"); // Formatted date.
  const hours = date.getHours(); // Hour of the order.
  const minutes = date.getMinutes(); // Minute of the order.

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

  // Renders the component based on the order details and user role.
  return (
    <div className="relative">
      <div className="mb-6">
        <p className="font-semibold mb-3 flex justify-between">
          Commandé le{" "}
          {loading ? (
            <SkeletonSmallText />
          ) : (
            <span className="font-normal">{DDMMYYYY}</span>
          )}
        </p>
        <p className="font-semibold mb-3 flex justify-between">
          Heure de commande{" "}
          {loading ? (
            <SkeletonSmallText />
          ) : (
            <span className="font-normal">
              {hours}h{minutes}
            </span>
          )}
        </p>
        <div className="w-full h-px bg-gray-200 my-8" />
        <p className="text-2xl font-bold mb-2 mt-5 flex justify-between">
          Total{" "}
          {loading ? (
            <SkeletonSmallText />
          ) : (
            <span className="font-normal">{total_price} €</span>
          )}
        </p>
      </div>
      {role === "admin" && (
        <ChangeStatusButton
          handleStart={handleStart}
          handleValidate={handleValidate}
          handleFinish={handleFinish}
          handleCancel={handleCancel}
          status={status}
        />
      )}
      {role === "user" && status === "en cours" && (
        <button
          onClick={handleCancel}
          className="w-full mt-2 py-2 antialiased rounded-lg bg-red-500 hover:bg-red-600 text-white"
        >
          Annuler
        </button>
      )}
    </div>
  );
};
