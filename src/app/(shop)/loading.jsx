import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function HomeLoading() {
  return (
    <>
      {/* Mimic of ImagesHeader */}
      <div className="relative m-auto mb-14 lg:w-4/5 md:w-full">
        <Skeleton height={700} className="mb-6" />
        <Skeleton height={100} width={`20%`} className="m-auto" />
      </div>

      {/* Mimic of Categories */}
      <div className="mx-auto mb-16 max-w-7xl px-6 lg:px-8">
        <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-4 xl:grid-cols-4 justify-center">
          {Array.from({ length: 4 }, (_, index) => (
            <li key={index} className="h-full">
              <Skeleton height={200} className="mb-4" />
              <Skeleton height={20} width={`80%`} className="mb-2" />
              <Skeleton height={20} width={`60%`} />
            </li>
          ))}
        </ul>
      </div>

      {/* Mimic of About */}
      <div className="mx-auto lg:w-4/5 md:w-full pb-36">
        <Skeleton height={30} width={`60%`} className="m-auto mb-4" />
        <Skeleton height={10} count={5} className="m-auto mb-4" />
        <Skeleton height={40} width={`30%`} className="m-auto" />
      </div>
    </>
  );
}
