/**
 * The `SelectInputs` component renders a select dropdown for selecting options.
 *
 * Props:
 * - `item`: An object that includes `label`, `name`, and `options` (an array of options for the select).
 * - `errors`: An object that contains validation error messages for the input fields.
 * - `register`: A function from `react-hook-form` to register the select field for form handling and validation.
 *
 * Features:
 * - Displays a label above the select field using `item.label`.
 * - The `register` function connects the select field to form handling and validation.
 * - Dynamically renders options from the `item.options` array.
 * - Shows a validation error message below the select field if there are errors for this field.
 */

export function SelectInputs({ item, errors, register }) {
  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-1">
      <label
        htmlFor={item.name}
        className="block text-md mb-1 font-medium leading-6 text-gray-900"
      >
        {item.label}
      </label>
      <div className="rounded-md shadow-sm border ring-gray-300 ">
        <select
          id={item.name}
          className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
          {...register(item.name, {
            setValueAs: (value) => value,
          })}
        >
          {item.options?.map((item, index) => (
            <option key={item} value={item} type="text">
              {item}
            </option>
          ))}
        </select>
      </div>
      {errors[item.name]?.message && (
        <p className="ml-2 text-red-500 text-sm">{errors[item.name].message}</p>
      )}
    </div>
  );
}
