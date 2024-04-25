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
