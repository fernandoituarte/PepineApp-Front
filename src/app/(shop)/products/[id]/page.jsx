import axios from "axios";
import { Product } from "@/components";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductDetailsLoading from "./loading";

const URL = process.env.NEXT_PUBLIC_URL;

export async function generateStaticParams() {
  const response = await axios.get(`${URL}/products`);
  return response.data.data.product.map((post, index) => {
    const id = index + 1;
    return {
      id: `${id}`,
    };
  });
}
export async function generateMetadata({ params }) {
  const id = params.id;
  try {
    const response = await axios.get(`${URL}/products/${id}`);
    const product = response.data.data.product;
    const metadata = { title: product.name, description: product.description };
    return metadata;
  } catch (error) {
    return [
      {
        title: "Product",
        description: "",
      },
    ];
  }
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
  return <Product product={product} />;
}
