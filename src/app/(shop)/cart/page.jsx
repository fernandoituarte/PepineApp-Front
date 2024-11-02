import { Title } from "@/components";
import { Cart } from "./components/Cart";

export const metadata = {
  title: "Votre panier",
  description: "Articles dans votre panier",
};
export default async function Page() {
  return (
    <>
      <Title title={metadata.title} className={"text-center"} />
      <Cart />
    </>
  );
}
