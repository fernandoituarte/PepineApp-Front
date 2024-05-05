import axios from "axios";

import { categoriesInfo } from "@/utils/categoriesInfo";
import { ProductCard, Title } from "@/components";

const URL = process.env.NEXT_PUBLIC_URL;
// export async function generateStaticParams({ params }) {
//   const response = await axios.get(`${URL}/categories/${params.id}/products`);
//   return response.data.data.category.map((post) => {
//     return {
//       id: `${post.id}`,
//     };
//   });
// }
export async function generateMetadata({ params }) {
  const id = params.id;
  try {
    const response = await axios.get(`${URL}/categories/${id}`);
    const category = response.data.data.category;
    const metadata = {
      title: category.value,
      description: category.description,
    };
    return metadata;
  } catch (error) {
    return [
      {
        title: "Category",
        description: "",
      },
    ];
  }
}
const getProductsByCategory = async (id) => {
  try {
    const response = await axios.get(`${URL}/categories/${id}/products`);
    return response.data.data.category;
  } catch (error) {
    notFound();
  }
};

export default async function Page({ params }) {
  const products = await getProductsByCategory(params.id);

  // Finds the corresponding information from categoriesInfo by matching the category ID.
  const category = categoriesInfo.find((category) => category.id == params.id);

  return (
    <div className="mx-auto my-10 lg:my-16 max-w-7xl px-6 lg:px-8">
      {/* Title component displays the category name and description. */}
      <Title
        title={`${category && category.name}`}
        subtitle={`${category && category.description}`}
        className={"text-center"}
      />
      <div
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 justify-center"
      >
        {/* Maps over the products array to generate a ProductCard for each product. */}
        {products &&
          products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
      </div>
    </div>
  );
}
