import { Title } from "@/components";
import { OrdersUser } from "./components/OrdersUser";

export const metadata = {
  title: "Mes Commandes",
  description: "Gestion des commandes",
};
export default async function Page({ searchParams }) {
  const { limit = 15, offset = 0 } = await searchParams;

  return (
    <>
      <Title title={metadata.title} className={"text-center"} />{" "}
      <OrdersUser limit={limit} offset={offset} />
    </>
  );
}
