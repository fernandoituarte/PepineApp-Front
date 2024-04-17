import { useAppDispatch } from "@/hooks/redux";
import { deleteCategory } from "@/store/reducer/products/products";

export function CategoriesBadges({ categoriesByProduct }) {
  const dispatch = useAppDispatch();
  return (
    <div className="mt-8 flex flex-wrap">
      {categoriesByProduct.includes(1) && (
        <p
          id="badge-dismiss-green"
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded mb-2"
        >
          Aromates et Médicinales
          <button
            type="button"
            onClick={() => dispatch(deleteCategory(1))}
            className="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 "
            data-dismiss-target="#badge-dismiss-green"
            aria-label="Remove"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </p>
      )}

      {categoriesByProduct.includes(2) && (
        <p
          id="badge-dismiss-green"
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded mb-2"
        >
          Fruitiers
          <button
            type="button"
            onClick={() => dispatch(deleteCategory(2))}
            className="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 "
            data-dismiss-target="#badge-dismiss-green"
            aria-label="Remove"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </p>
      )}

      {categoriesByProduct.includes(3) && (
        <p
          id="badge-dismiss-green"
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded mb-2"
        >
          Agrumes
          <button
            type="button"
            onClick={() => dispatch(deleteCategory(3))}
            className="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 "
            data-dismiss-target="#badge-dismiss-green"
            aria-label="Remove"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </p>
      )}

      {categoriesByProduct.includes(4) && (
        <p
          id="badge-dismiss-green"
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded mb-2"
        >
          Plantes équines
          <button
            type="button"
            onClick={() => dispatch(deleteCategory(4))}
            className="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 "
            data-dismiss-target="#badge-dismiss-green"
            aria-label="Remove"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </p>
      )}
    </div>
  );
}
