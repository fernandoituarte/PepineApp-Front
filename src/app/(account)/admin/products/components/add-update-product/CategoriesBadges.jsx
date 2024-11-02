/**
 * The `CategoriesBadges` component displays a list of badges representing the selected categories for a product.
 * Each badge shows the category name and includes a button to remove the category from the selection.
 *
 * Props:
 * - `categoriesProduct`: An array of selected categories, each containing `id` and `value` properties.
 * - `setCategoriesProduct`: A function to update the selected categories when one is removed.
 *
 * Features:
 * - Displays each selected category as a green badge.
 * - Each badge includes a delete button, which removes the corresponding category when clicked.
 *
 * The `handleDeleteCategory` function filters out the deleted category from the `categoriesProduct` array
 * and updates the state accordingly.
 */

export function CategoriesBadges({ categoriesProduct, setCategoriesProduct }) {
  const handleDeleteCategory = (id) => {
    const updatedCategories = categoriesProduct.filter(
      (category) => category.id !== id,
    );
    setCategoriesProduct(updatedCategories);
  };
  return (
    <div className="mt-8 flex flex-wrap">
      {categoriesProduct &&
        categoriesProduct.map((category) => (
          <p
            key={category.id}
            id="badge-dismiss-green"
            className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded mb-2"
          >
            {category.value}
            <button
              type="button"
              onClick={() => handleDeleteCategory(category.id)}
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
        ))}
    </div>
  );
}
