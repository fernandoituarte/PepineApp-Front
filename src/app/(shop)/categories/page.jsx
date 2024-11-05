import { Title } from "@/components";
import { CategoriesSwiper } from "./components/CategoriesSwiper";

import { Suspense } from "react";
import CategoriesLoading from "./loading";

export const metadata = {
  title: "Categories",
  description:
    "Découvrez notre sélection de produits de qualité répartis dans six catégories distinctes.",
};

export default async function Page() {
  return (
    <Suspense fallback={<CategoriesLoading />}>
      <Title
        title={metadata.title}
        subtitle={metadata.description}
        className={"text-center"}
      />
      <CategoriesSwiper />
    </Suspense>
  );
}
