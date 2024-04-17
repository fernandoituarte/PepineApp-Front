import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CategoriesLoading({ skeletonCategoryCount = 4 }) {
  return (
    <div className="mx-auto mb-16 max-w-7xl px-6 lg:px-8">
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-7 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-4 xl:grid-cols-4 justify-center"
      >
        {Array.from({ length: skeletonCategoryCount }, (_, index) => (
          <li key={index} className="h-full">
            <Skeleton height={150} className="mb-4" />
            <Skeleton height={20} width={`80%`} className="mb-2" />
            <Skeleton height={20} width={`60%`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
