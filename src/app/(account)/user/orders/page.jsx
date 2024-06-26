import { OrdersUser, Title } from "@/components";
import { getUserSessionCookieServer } from "@/lib/getUserServerSide";

export const metadata = {
  title: "Mes Commandes",
  description: "Gestion des commandes",
};
export default function Page() {
  const { id } = getUserSessionCookieServer();

  return (
    <>
      <Title title={metadata.title} className={"text-center"} />{" "}
      <OrdersUser id={id} />
    </>
  );
}
