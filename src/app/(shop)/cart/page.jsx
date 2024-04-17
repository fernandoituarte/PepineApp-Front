import { Cart, Title } from "@/components";

export const metadata = {
  title: "Votre panier",
  description: "Articles dans votre panier",
};
export default function Page() {
  return (
    <>
      <Title title={metadata.title} className={"text-center"} />
      <Cart />
    </>
  );
}
