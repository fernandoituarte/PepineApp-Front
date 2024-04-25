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
