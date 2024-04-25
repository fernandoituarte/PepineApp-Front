export function DescriptionInputs({ item, errors, register }) {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4">
      <label
        htmlFor=""
        className="block text-md mb-1 font-medium leading-6 text-gray-900"
      >
        {item.label}
      </label>
      <div className="rounded-md shadow-sm border ring-gray-300 ">
        <textarea
          name="description1"
          {...register(item.name)}
          rows="3"
          className="block w-full border-0 bg-transparent py-1.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder={item.placeholder}
        />
      </div>
      {errors[item.name]?.message && (
        <p className="ml-2 text-red-500 text-sm">{errors[item.name].message}</p>
      )}
    </div>
  );
}
