export const InputField = ({
  id,
  label,
  register,
  required,
  message,
  type = "text",
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        {...register(id, { required, message })}
        type={type}
        aria-label={label}
        placeholder={label}
        className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
      />
    </div>
  </div>
);
