import axios from "axios";
import { Suspense } from "react";

import {
  Pagination,
  ProductCard,
  Title,
  NotFoundResult,
  ErrorComponent,
} from "@/components";
import { getProductsByCategory } from "@/lib/getProducts";

import ProductListLoading from "./loading";

const URL = process.env.NEXT_PUBLIC_URL;

/**
 * `generateMetadata` function is used to dynamically generate the metadata for the page.
 *
 * - Fetches category information using the category ID from the URL params.
 * - If successful, it sets the page's title and description based on the category data.
 * - In case of an error, it defaults to a generic "Category" title with an empty description.
 *
 * @param {object} params - URL parameters, including the category ID.
 * @returns {object} Metadata for the category page.
 */

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const response = await axios.get(`${URL}/categories/${id}`);

    return {
      title: response.data.category.value,
      description: response.data.category.description,
    };
  } catch (error) {
    return {
      title: "Category",
      description: "",
    };
  }
}

/**
 * Main category page component. Displays products under a specific category and handles pagination.
 *
 * - Fetches products based on category ID, search parameters (limit, offset).
 * - Displays a message if no products are found or if there's an error.
 * - Renders a `Title` component for the category and maps over the products array to generate `ProductCard` components.
 * - Includes pagination controls at the bottom.
 *
 * @param {object} params - URL parameters, including the category ID.
 * @param {object} searchParams - Query parameters for pagination (limit, offset).
 */

export default async function Page({ params, searchParams }) {
  const { limit = 16, offset = 0 } = await searchParams;
  const { id } = await params;

  const { category, products, totalProducts, totalPages, error } =
    await getProductsByCategory({
      id,
      limit,
      offset,
    });

  if (error) {
    return <ErrorComponent text={error} />;
  }

  if (totalProducts === 0) {
    return (
      <NotFoundResult
        text={`Aucun produit n'a été trouvé dans cette categorie`}
      />
    );
  }

  return (
    <Suspense fallback={<ProductListLoading />}>
      <div className="mx-auto my-10 lg:my-16 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto lg:mx-0">
          {/* Title component displays the category name and description. */}
          <Title
            title={`${category && category.value}`}
            subtitle={`${category && category.description}`}
            className={"text-center"}
          />
        </div>
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 justify-center"
        >
          {/* Maps over the products array to generate a ProductCard for each product. */}
          {products &&
            products.map((product, index) => (
              <ProductCard key={index} {...product} category={category} />
            ))}
        </ul>
        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          limit={limit}
          baseUrl={`/categories/${id}`}
        />
      </div>
    </Suspense>
  );
}
