import { Title } from "@/components";
import { UpdateProduct } from "../../components";
import { getProduct } from "@/lib/getProducts";
import { getCategories } from "@/lib/getCategories";

export const metadata = {
  title: "Modifiez votre produit",
};

export default async function Page({ params }) {
  const { id } = await params;
  const { product, error } = await getProduct(id);
  const { categories, error: errorCategories } = await getCategories();

  return (
    <>
      <Title title={metadata.title} className={"text-center"} />
      <UpdateProduct
        categoriesList={categories}
        product={product}
        errorCategories={errorCategories}
        error={error}
      />
    </>
  );
}
