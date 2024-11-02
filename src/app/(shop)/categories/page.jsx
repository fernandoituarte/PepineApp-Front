import { Title } from "@/components";
import { CategoriesSwiper } from "./components/CategoriesSwiper";
import { getCategories } from "@/lib/getCategories";

import { Suspense } from "react";
import CategoriesLoading from "./loading";

export const metadata = {
  title: "Categories",
  description:
    "Découvrez notre sélection de produits de qualité répartis dans six catégories distinctes.",
};

export default async function Page() {
  const categories = await getCategories();

  return (
    <Suspense fallback={<CategoriesLoading />}>
      <Title
        title={metadata.title}
        subtitle={metadata.description}
        className={"text-center"}
      />
      {categories && <CategoriesSwiper categories={categories} />}
    </Suspense>
  );
}
