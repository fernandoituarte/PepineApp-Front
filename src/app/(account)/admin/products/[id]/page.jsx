import axios from "axios";
import { notFound } from "next/navigation";
import { AdminProductDetails } from "@/components";

const URL = process.env.NEXT_PUBLIC_URL;

export async function generateStaticParams() {
  const response = await axios.get(`${URL}/products`);
  return response.data.data.product.map((post, index) => {
    const id = post.id;
    return {
      id: `${id}`,
    };
  });
}

const getProduct = async (id) => {
  try {
    const response = await axios.get(`${URL}/products/${id}`);
    return response.data.data.product;
  } catch (error) {
    notFound();
  }
};
export default async function Page({ params }) {
  const product = await getProduct(params.id);
  return <AdminProductDetails product={product} />;
}
