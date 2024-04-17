import { useAppDispatch } from "@/hooks/redux";
import { changeStatus } from "@/store/reducer/orders/orders";
import { SkeletonSmallText } from "../../../ui/Spinners/SkeletonOrderProduct";

export const OrderInfo = ({ order, role, loading }) => {
  const { created_at, id, total_price, status } = order;
  const dispatch = useAppDispatch();

  const isEnded = status === "finalisée";
  const date = new Date(created_at);
  const DDMMYYYY = date.toLocaleDateString("fr-FR");
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const handleValidate = () => {
    dispatch(changeStatus({ status: "validée", id }));
  };
  const handleFinish = () => {
    dispatch(changeStatus({ status: "retirée", id }));
  };
  const handleCancel = () => {
    if (window.confirm("Voulez-vous vraiment annuler cette commande?")) {
      dispatch(changeStatus({ status: "finalisée", id }));
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
        <p className="font-semibold mb-3 flex justify-between">
          Sous-Total <span className="font-normal">00 €</span>
        </p>
        <p className="font-semibold flex justify-between">
          TVA (10%) <span className="font-normal">00 €</span>
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
          {status === "finalisée" && (
            <button
              disabled
              className={"w-full mt-3 py-2 text-white rounded-lg bg-red-400"}
            >
              La commande a été anulée
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
    </>
  );
};
