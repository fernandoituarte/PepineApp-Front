import { Title } from "@/components";
import { AddProduct } from "./components/AddProduct";
import { getCategories } from "@/lib/getCategories";

export const metadata = {
  title: "Ajoutez un produit",
};

export default async function Page() {
  const categoriesList = await getCategories();
  return (
    <>
      <Title title={metadata.title} className={"text-center"} />
      <AddProduct categoriesList={categoriesList} />
    </>
  );
}
