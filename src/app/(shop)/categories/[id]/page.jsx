import axios from "axios";

import { CategoryGrid } from "@/components";

const URL = process.env.NEXT_PUBLIC_URL;
//Products by category
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
const getCategory = async (id) => {
  try {
    const response = await axios.get(`${URL}/categories/${id}/products`);
    return response.data.data.category;
  } catch (error) {
    notFound();
  }
};

export default async function Page({ params }) {
  const products = await getCategory(params.id);
  return <CategoryGrid products={products} id={params.id} />;
}
