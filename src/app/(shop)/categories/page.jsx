import { CategoriesSwiper, Title } from "@/components";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;
export const metadata = {
  title: "Categories",
  description:
    "Découvrez notre sélection de produits de qualité répartis dans six catégories distinctes.",
};

const getCategories = async () => {
  try {
    const response = await axios.get(`${URL}/categories`);
    const categories = response.data.data.category;

    return categories;
  } catch (error) {
    throw error;
  }
};

export default async function Page() {
  const categories = await getCategories();
  return (
    <>
      <Title
        title={metadata.title}
        subtitle={metadata.description}
        className={"text-center"}
      />
      {categories && <CategoriesSwiper categories={categories} />}
    </>
  );
}
