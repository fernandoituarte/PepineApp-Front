// "use client";
// import { useEffect } from "react";

// import { ProductCard, Title } from "@/components";
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { fetchProducts } from "@/store/reducer/products/product";

// /**
//  * Component for displaying a grid of product cards with an animated title.
//  * Fetches product data on mount and displays each product using the ProductCard component.
//  */
// export function ProductsGrid() {
//   const dispatch = useAppDispatch();
//   const { products } = useAppSelector((state) => state.product);

//   // Effect hook to fetch products when the component mounts.
//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   return (
//     <div className="mx-auto my-10 lg:my-16 max-w-7xl px-6 lg:px-8">
//       <div className="mx-auto lg:mx-0">
//         {/* Title component with both a main title and a subtitle. */}
//         <Title
//           title="Tous nos produits disponibles"
//           subtitle="Explorez notre large gamme d'arbres, d'arbustes et de plantes pour
//           agrémenter votre espace de vie de verdure et créer une ambiance
//           naturelle dans votre quotidien."
//           className={"text-center"}
//         />
//       </div>
//       {/* Grid layout for products, dynamically adjusting columns based on screen size. */}
//       <ul
//         role="list" // ARIA role for accessibility.
//         className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 justify-center"
//       >
//         {products.map((product) => (
//           // Mapping through each product and rendering a ProductCard.
//           <ProductCard key={product.id} {...product} />
//         ))}
//       </ul>
//     </div>
//   );
// }
