"use client";
import { ProductCard, Title } from "@/components";

import { categoriesInfo } from "@/utils/categoriesInfo";

//Products By Category
export function CategoryGrid({ products, id }) {
  const category = categoriesInfo.find((category) => category.id == id);

  return (
    <div className="mx-auto my-10 lg:my-16 max-w-7xl px-6 lg:px-8">
      <Title
        title={`${category && category.name}`}
        subtitle={`${category && category.description}`}
        className={"text-center"}
      />
      <div
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 justify-center"
      >
        {products &&
          products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
      </div>
    </div>
  );
}
