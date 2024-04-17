import { ProductList, Title } from "@/components";

export const metadata = {
  title: "Vos produits",
  description: "Vos produits",
};
export default function Page() {
  return (
    <>
      <Title title={"Liste des produits"} className={"text-center"} />
      <ProductList />
    </>
  );
}
