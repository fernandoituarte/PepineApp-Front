/**
 * The `CategorySelect` component allows users to select categories from a dropdown and add them to the list of selected categories.
 *
 * Props:
 * - `categoriesProduct`: An array representing the currently selected categories.
 * - `setCategoriesProduct`: A function to update the selected categories when a new one is added.
 * - `categoriesList`: A list of all available categories to be shown in the dropdown.
 *
 * Features:
 * - Displays a dropdown with a list of categories.
 * - Adds the selected category to the `categoriesProduct` array if it has not already been added.
 * - Prevents adding duplicate categories by checking if the category already exists in `categoriesProduct`.
 *
 * The `handleAddCategory` function handles the selection and updates the state when a category is chosen from the dropdown.
 */

export function CategorySelect({
  categoriesProduct,
  setCategoriesProduct,
  categoriesList,
}) {
  function handleAddCategory(event) {
    const selectedId = event.target.selectedOptions[0].getAttribute("data-id");
    const selectedValue = event.target.value;

    if (!selectedValue) return;

    const selectedCategory = {
      id: +selectedId,
      value: selectedValue,
    };

    if (
      selectedCategory &&
      !categoriesProduct.some((category) => category.id === +selectedId)
    ) {
      setCategoriesProduct([...categoriesProduct, selectedCategory]);
    }
  }

  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-1">
      <label
        htmlFor="categorySelect"
        className="block text-md mb-1 font-medium leading-6 text-gray-900"
      >
        Categories
      </label>
      <div className="rounded-md shadow-sm border ring-gray-300">
        <select
          id="categorySelect"
          onChange={handleAddCategory}
          className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
        >
          <option value="" type="text">
            Select
          </option>
          {categoriesList &&
            categoriesList.map((category) => (
              <option
                key={category.id}
                value={category.value}
                data-id={category.id}
                type="text"
              >
                {category.value}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
