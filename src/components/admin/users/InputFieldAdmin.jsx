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
