import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductDetailsLoading() {
  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mb-6">
            {/* Image gallery */}
            <div>
              <Skeleton height={500} />
              <div className="grid grid-cols-4 gap-4 mt-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} height={100} />
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Skeleton height={30} width={300} />
              <Skeleton height={24} width={200} className="mt-2" />

              <div className="mt-6">
                <Skeleton height={20} count={5} />
              </div>

              {/* Icons and features */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Skeleton circle={true} height={40} width={40} />
                    <Skeleton height={20} width={70} className="mt-2" />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-10">
                <Skeleton height={50} width={200} />
              </div>

              {/* Additional details */}
              <div className="mt-12">
                {Array.from({ length: 2 }).map((_, detailIndex) => (
                  <div key={detailIndex} className="py-6">
                    <Skeleton height={20} width={150} />
                    <div className="mt-4">
                      <Skeleton height={10} count={4} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
