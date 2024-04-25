"use client"; // Ensures that this module only runs on the client side.

import { useEffect } from "react"; // Import useEffect for handling side effects.

import { Category } from "@/components"; // Import the Category component to render each category.

import { useAppSelector, useAppDispatch } from "@/hooks/redux"; // Import hooks for accessing Redux state and dispatching actions.
import { fetchCategories } from "@/store/reducer/categories/categories"; // Import the fetchCategories action for loading category data.

// Define a functional component named 'Categories' to display a list of categories.
export function Categories() {
  const dispatch = useAppDispatch(); // Initialize dispatch to send actions to the Redux store.
  const categories = useAppSelector((state) => state.categories.categories); // Retrieve category data from the Redux store.

  // Fetch categories when the component mounts. This effect only runs once on component mount due to the empty dependency array.
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]); // Dependency array includes dispatch to avoid unnecessary re-dispatches if dispatch reference changes.

  // Render a container with a list of categories. Each category is passed to the Category component.
  return (
    <div className="mx-auto mb-16 max-w-7xl px-6 lg:px-8">
      {/* The 'role' attribute of the list helps with accessibility by informing assistive technologies that this is a list of items. */}
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-7 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-3 justify-center"
      >
        {/* Map through the categories array and render a Category component for each category, passing category details as props. */}
        {categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </ul>
    </div>
  );
}
