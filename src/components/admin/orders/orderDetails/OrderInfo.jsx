import { useAppDispatch } from "@/hooks/redux";
import { changeStatus } from "@/store/reducer/orders/orders";
import { SkeletonSmallText } from "../../../ui/Spinners/SkeletonOrderProduct";
import {
  decrementProductStock,
  incrementProductStock,
} from "@/lib/updateProductStock";

export const OrderInfo = ({ order, role, loading }) => {
  const { created_at, id, total_price, status } = order;
  const dispatch = useAppDispatch();

  const isEnded = status === "annulée";
  const date = new Date(created_at);
  const DDMMYYYY = date.toLocaleDateString("fr-FR");
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const handleValidate = () => {
    dispatch(changeStatus({ status: "validée", id }));
  };
  const handleFinish = () => {
    dispatch(changeStatus({ status: "retirée", id }));
    order.products.map((product) => {
      decrementProductStock(product.product_id, product.quantity_ordered);
    });
  };
  const handleCancel = () => {
    if (window.confirm("Voulez-vous vraiment annuler cette commande?")) {
      dispatch(changeStatus({ status: "annulée", id }));
      if (status === "retirée")
        order.products.map((product) => {
          incrementProductStock(product.product_id, product.quantity_ordered);
        });
    }
  };
  return (
    <>
      <div>
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
              {hours}h{minutes}{" "}
            </span>
          )}
        </p>
        {/* Line Separator */}
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
        <>
          {status === "en cours" && (
            <button
              onClick={handleValidate}
              className={"w-full mt-3 py-2 text-white rounded-lg bg-indigo-600"}
            >
              Valider
            </button>
          )}
          {status === "validée" && (
            <button
              onClick={handleFinish}
              className={"w-full mt-3 py-2 text-white rounded-lg bg-green-500"}
            >
              Retirée
            </button>
          )}
          {status === "retirée" && (
            <button
              disabled
              className={"w-full mt-3 py-2 text-white rounded-lg bg-sky-300"}
            >
              La commande a été retirée
            </button>
          )}
          {status === "annulée" && (
            <button
              disabled
              className={"w-full mt-3 py-2 text-white rounded-lg bg-red-400"}
            >
              La commande a été annulée
            </button>
          )}

          {!isEnded && (
            <button
              onClick={handleCancel}
              className={
                "w-full mt-2 py-2 antialiased rounded-lg hover:bg-red-100 text-red-400"
              }
            >
              Annuler
            </button>
          )}
        </>
      )}
      {role === "user" && status === "en cours" && (
        <button
          onClick={handleCancel}
          className="w-full mt-2 py-2 antialiased rounded-lg hover:bg-red-100 text-red-400"
        >
          Annuler
        </button>
      )}
    </>
  );
};
