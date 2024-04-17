import { ProductsGrid } from "@/components";
import { Suspense } from "react";
import ProductListLoading from "./loading";

export const metadata = {
  title: "Tous nos produit",
  description:
    "Découvrez notre sélection de produits de qualité répartis dans quatre catégories distinctes.",
};
//Product Grid
export default function Page() {
  return (
    <Suspense fallback={<ProductListLoading />}>
      <ProductsGrid />
    </Suspense>
  );
}
