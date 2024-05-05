import { Category, Title } from "@/components";
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
    //TODO:
    console.log(error);
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
      <div className="mx-auto mb-16 max-w-7xl px-6 lg:px-8">
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-7 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-3 justify-center"
        >
          {categories &&
            categories.map((category) => (
              <Category key={category.id} {...category} />
            ))}
        </ul>
      </div>
    </>
  );
}
