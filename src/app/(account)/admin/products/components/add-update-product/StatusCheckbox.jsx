/**
 * The `StatusCheckbox` component renders a toggle switch for selecting a status (available or not).
 *
 * Props:
 * - `register`: A function from `react-hook-form` that registers the checkbox for form handling and validation.
 *
 * Features:
 * - The checkbox is hidden using `sr-only` class for accessibility, while a styled div represents the toggle switch.
 * - The switch changes its appearance based on its checked state, with a smooth transition effect.
 * - The label "Disponible" is displayed next to the toggle, indicating its function.
 */

export function StatusCheckbox({ register }) {
  return (
    <div className="flex sm:justify-center items-center mt-5">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          {...register("status")}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gren-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        <span className="ms-3 text-sm font-medium text-gray-900">
          Disponible
        </span>
      </label>
    </div>
  );
}
