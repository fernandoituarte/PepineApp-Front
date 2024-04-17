import { OrdersUser, Title } from "@/components";

export const metadata = {
  title: "Mes Commandes",
  description: "Gestion des commandes",
};
export default function Page() {
  return (
    <>
      <Title title={metadata.title} className={"text-center"} /> <OrdersUser />
    </>
  );
}
