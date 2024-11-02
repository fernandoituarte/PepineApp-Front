/**
 * The `InputFieldAdmin` component renders a labeled input field for admin forms
 * with validation and error handling.
 *
 * Props:
 * - `label`: The label displayed above the input field.
 * - `placeholder`: Placeholder text for the input.
 * - `register`: Function to register the input with validation.
 * - `name`: The name of the input field for form data.
 * - `errors`: Object containing validation error messages.
 *
 * Features:
 * - Displays a responsive layout for the label and input field.
 * - Shows a validation error message if the input is empty and required.
 */

export const InputFieldAdmin = ({
  label,
  placeholder,
  register,
  name,
  errors,
}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:justify-between mb-6">
      <p className="font-semibold mb-1">{label}:</p>
      <div className="flex flex-col sm:w-1/2">
        <input
          className="font-normal border rounded-md h-10 px-2"
          placeholder={placeholder}
          {...register(name, {
            required: `${label} est requis`,
          })}
        />
        {errors && errors[name]?.message && (
          <p className="ml-2 text-red-500 text-sm">{errors[name].message}</p>
        )}
      </div>
    </div>
  );
};
