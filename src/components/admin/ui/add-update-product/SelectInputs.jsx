export function SelectInputs({ item, errors, register }) {
  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-1">
      <label
        htmlFor=""
        className="block text-md mb-1 font-medium leading-6 text-gray-900"
      >
        {item.label}
      </label>
      <div className="rounded-md shadow-sm border ring-gray-300 ">
        <select
          className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
          {...register(item.name, {
            setValueAs: (value) => parseInt(value, 10),
          })}
        >
          {item.options?.map((item, index) => (
            <option key={item} value={index + 1} type="number">
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
