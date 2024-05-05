import { ProductCard, Title } from "@/components";
import { Suspense } from "react";
import ProductListLoading from "./loading";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

export const metadata = {
  title: "Tous nos produit",
  description:
    "Découvrez notre sélection de produits de qualité répartis dans quatre catégories distinctes.",
};
//Product Grid

const getProducts = async () => {
  try {
    const response = await axios.get(`${URL}/products`);
    const products = response.data.data.product;

    return products;
  } catch (error) {
    //TODO:
    console.log(error);
  }
};

export default async function Page() {
  const products = await getProducts();

  return (
    <Suspense fallback={<ProductListLoading />}>
      <div className="mx-auto my-10 lg:my-16 max-w-7xl px-6 lg:px-8">
        {/* Animated container for the title using Framer Motion for a smooth appearance on load. */}
        <div className="mx-auto lg:mx-0">
          {/* Title component with both a main title and a subtitle. */}
          <Title
            title="Tous nos produits disponibles"
            subtitle="Explorez notre large gamme d'arbres, d'arbustes et de plantes pour
            agrémenter votre espace de vie de verdure et créer une ambiance
            naturelle dans votre quotidien."
            className={"text-center"}
          />
        </div>
        {/* Grid layout for products, dynamically adjusting columns based on screen size. */}
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 justify-center"
        >
          {products &&
            products.map((product) => (
              // Mapping through each product and rendering a ProductCard.
              <ProductCard key={product.id} {...product} />
            ))}
        </ul>
      </div>
    </Suspense>
  );
}
