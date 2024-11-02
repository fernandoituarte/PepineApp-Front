/**
 * The `SmallInputs` component renders an input field for smaller-sized inputs.
 *
 * Props:
 * - `item`: An object containing `label`, `name`, and `placeholder` for the input field.
 * - `errors`: An object that holds validation error messages for the input fields.
 * - `register`: A function from `react-hook-form` that registers the input field for form handling and validation.
 *
 * Features:
 * - Displays a label above the input field using `item.label`.
 * - The input field is connected to form handling through the `register` function, allowing for validation.
 * - The input handles special parsing for specific fields:
 *   - If the field name is "price", it parses the value as a float.
 *   - If the field name is "stock" or "vat", it parses the value as an integer.
 * - Returns `0` if the parsed value is `NaN`.
 * - Shows a validation error message below the input field if errors exist for this field.
 */

export function SmallInputs({ item, errors, register }) {
  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-1">
      <label
        htmlFor=""
        className="block text-md mb-1 font-medium leading-6 text-gray-900"
      >
        {item.label}
      </label>
      <div className="rounded-md shadow-sm border ring-gray-300 ">
        <input
          type="text"
          {...register(item.name, {
            setValueAs: (value) => {
              if (item.name === "price") {
                const parsed = parseFloat(value);
                return isNaN(parsed) ? 0 : parsed;
              } else if (item.name === "stock" || item.name === "vat") {
                const parsed = parseInt(value, 10);
                return isNaN(parsed) ? 0 : parsed;
              }
              return value;
            },
          })}
          autoComplete="off"
          className="block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
          placeholder={item.placeholder}
        />
      </div>
      {errors[item.name]?.message && (
        <p className="ml-2 text-red-500 text-sm">{errors[item.name].message}</p>
      )}
    </div>
  );
}
