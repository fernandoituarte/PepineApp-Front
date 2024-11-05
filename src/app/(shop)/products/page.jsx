import { Suspense } from "react";
import { getAllProducts } from "@/lib/getProducts";
import {
  ProductCard,
  Title,
  Pagination,
  NotFoundResult,
  ErrorComponent,
} from "@/components";

import ProductListLoading from "./loading";

export const metadata = {
  title: "Tous nos produit",
  description:
    "Découvrez notre sélection de produits de qualité répartis dans quatre catégories distinctes.",
};

/**
 * The main Page component fetches all products and handles display, pagination, and error states.
 *
 * @param {Object} searchParams - The query parameters for pagination (limit and offset).
 * @returns JSX elements to display products, or appropriate messages in case of errors or no products.
 */

export default async function Page({ searchParams }) {
  const { limit = 16, offset = 0 } = await searchParams;
  const { products, totalPages, totalProducts, error } = await getAllProducts({
    limit,
    offset,
  });

  if (error) {
    return <ErrorComponent text={error} />;
  }

  if (totalProducts === 0) {
    return <NotFoundResult text={`Aucun produit n'a été trouvé`} />;
  }

  return (
    <Suspense fallback={<ProductListLoading />}>
      <div className="mx-auto my-4 lg:my-8 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto lg:mx-0">
          {/* Title component with both a main title and a subtitle. */}
          <Title
            title="Tous nos produits disponibles"
            subtitle="Explorez notre large gamme d'arbres, d'arbustes et de plantes."
            className={"text-center"}
          />
        </div>
        {/* Grid layout for products, dynamically adjusting columns based on screen size. */}
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 justify-center"
        >
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
        </ul>
      </div>
      <Pagination limit={limit} baseUrl="/products" totalPages={totalPages} />
    </Suspense>
  );
}
