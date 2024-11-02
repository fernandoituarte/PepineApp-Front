import axios from "axios";
import { UserProductDetails } from "./components/UserProductDetails";
import { getProduct } from "@/lib/getProducts";

const URL = process.env.NEXT_PUBLIC_URL;
const URL_FRONT = process.env.NEXT_PUBLIC_URL_FRONT;

/**
 * The `generateStaticParams` function retrieves a list of product IDs for static generation.
 * It makes a GET request to the products API and maps the response data to create an array of IDs.
 *
 * Returns:
 * - An array of objects, each containing an `id` property.
 */

export async function generateStaticParams() {
  const response = await axios.get(`${URL}/products`);
  return response.data.products.map((_, index) => {
    const id = index + 1;
    return {
      id: `${id}`,
    };
  });
}

/**
 * The `generateMetadata` function generates metadata for the product page.
 * It retrieves the product details using the provided `id` from the URL parameters.
 *
 * Params:
 * - `params`: An object containing the `id` of the product.
 *
 * Returns:
 * - An object containing the title and description of the product, and a canonical URL.
 */

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const response = await axios.get(`${URL}/products/${id}`);
    const product = response.data.product;

    return {
      title: product.name,
      description: product.description1,
      alternates: {
        canonical: `${URL_FRONT}/products/${id}`,
      },
    };
  } catch (error) {
    return {
      title: "Product",
      description: "",
    };
  }
}

export default async function Page({ params }) {
  const { id } = await params;
  const { product, error } = await getProduct(id);
  return <UserProductDetails product={product} error={error} />;
}
