/**
 * The `MediumInputs` component renders a text input field for medium-sized inputs.
 *
 * Props:
 * - `item`: An object containing attributes such as `label`, `name`, and `placeholder`.
 * - `errors`: An object holding validation errors for the input fields.
 * - `register`: A function from `react-hook-form` to register the input field for form validation and submission.
 *
 * Features:
 * - Renders a text input field based on the passed `item` props.
 * - Displays a label above the input field using `item.label`.
 * - The `register` function connects the input to form handling and validation.
 * - Shows a validation error message below the input if an error exists for this field.
 */

export function MediumInputs({ item, errors, register }) {
  return (
    <div className="col-span-1 md:col-span-2">
      <label
        htmlFor=""
        className="block text-md mb-1 font-medium leading-6 text-gray-900"
      >
        {item.label}
      </label>

      <input
        type="text"
        name="name"
        {...register(item.name)}
        autoComplete="off"
        className={
          "block w-full rounded-md shadow-sm border ring-gray-300 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
        }
        placeholder={item.placeholder}
      />
      {errors[item.name]?.message && (
        <p className="ml-2 text-red-500 text-sm">{errors[item.name].message}</p>
      )}
    </div>
  );
}
