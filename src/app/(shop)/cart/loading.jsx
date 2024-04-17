import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CartLoading() {
  return (
    <div className="mx-auto my-10 lg:my-16 max-w-7xl px-6 lg:px-8">
      <div className="mx-auto lg:mx-0">
        <Skeleton height={30} className="mb-2" />
        <Skeleton height={20} width={`80%`} className="mb-6" />
      </div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 justify-center"
      >
        <li className="h-full">
          <Skeleton height={200} className="mb-4" />
          <Skeleton height={20} width={`80%`} className="mb-2" />
          <Skeleton height={20} width={`60%`} className="mb-2" />
          <Skeleton height={20} width={`50%`} />
        </li>
      </ul>
    </div>
  );
}
