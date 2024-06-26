import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export const PasswordField = ({
  id,
  label,
  register,
  showPassword,
  setShowPassword,
}) => (
  <div className="relative block mb-4">
    <label className="text-sm font-medium leading-6 text-gray-900 block">
      {label}
    </label>
    <input
      id={id}
      {...register(id)}
      type={showPassword ? "text" : "password"}
      autoComplete={id}
      required
      className="w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 pr-10"
    />
    <div
      className="absolute top-7 bottom-0 right-0 w-10 h-8 text-lg text-gray-500"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <IoEyeOffOutline size={25} className="m-auto" />
      ) : (
        <IoEyeOutline size={25} className="m-auto" />
      )}
    </div>
  </div>
);
