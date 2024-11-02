"use client";
import { Message } from "@/components";
import { useResetPassword } from "../hooks/useResetPassword";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

/**
 * `ResetPassword` component allows users to reset their password
 * using a provided token.
 *
 * Features:
 * - Displays success and error messages based on password reset outcomes.
 * - Includes input fields for the new password and password confirmation.
 * - Utilizes toggle functionality to show/hide password input fields.
 * - Integrates with custom hook `useResetPassword` for handling logic.
 *
 * Interaction:
 * - Validates password inputs on submission.
 * - Shows loading state while processing the password reset request.
 */

export function ResetPassword({ token }) {
  const {
    loading,
    register,
    errors,
    showMessage,
    showErrorMessage,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    onSubmit,
  } = useResetPassword(token);

  return (
    <form onSubmit={onSubmit} className="space-y-6" action="" method="POST">
      {showMessage && (
        // Success message component
        <Message
          className={"bg-green-100 border border-green-400 text-green-700"}
          title={"Success: "}
          text={"Nous avons actualisé votre mot de passe."}
        />
      )}
      {showErrorMessage && (
        // Error message component
        <Message
          className={"bg-red-100 border border-red-400 text-red-700"}
          title={"Error: "}
          text={"Une erreur est survenue, veuillez réessayer"}
        />
      )}
      {Object.keys(errors).length > 0 && (
        // Display form errors if any
        <div className="flex flex-col w-full justify-center text-center rounded-md bg-red-500 px-3 p-2 mb-4 text-sm leading-6 text-white shadow-sm">
          {errors.password?.message && (
            <p className="text-white"> - {errors.password?.message}</p>
          )}
          {errors.confirmPassword?.message && (
            <p className="text-white">- {errors.confirmPassword?.message}</p>
          )}
        </div>
      )}
      <div className="relative block mb-4">
        {/* Password input field with dynamic type for hiding/showing password */}
        <label
          htmlFor="password"
          className="text-sm font-medium leading-6 text-gray-900 block"
        >
          Entrez votre nouveau mot de passe
        </label>
        <input
          id="password"
          name="password"
          {...register("password")}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          required
          className="w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 pr-10"
        />
        {showPassword ? (
          // Toggle icon for hiding password
          <div
            className="absolute top-7 bottom-0 right-0 pt-1 w-10 h-8 text-lg text-gray-500"
            onClick={() => setShowPassword(false)}
          >
            <IoEyeOffOutline size={25} className="m-auto" />
          </div>
        ) : (
          // Toggle icon for showing password
          <div
            className="absolute top-7 bottom-0 right-0 w-10 h-8 text-lg text-gray-500"
            onClick={() => setShowPassword(true)}
          >
            <IoEyeOutline size={25} className="m-auto h-full" />
          </div>
        )}
      </div>
      <div className="relative block mb-4">
        {/* Confirm password input field with similar toggle functionality */}
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium leading-6 text-gray-900 block"
        >
          Confirmez votre mot de passe
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          {...register("confirmPassword")}
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="confirmPassword"
          required
          className="w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 pr-10" // Additional class for padding
        />
        {showConfirmPassword ? (
          // Toggle icon for hiding confirm password
          <div
            className="absolute top-7 bottom-0 right-0 pt-1 w-10 h-8 text-lg text-gray-500"
            onClick={() => setShowConfirmPassword(false)}
          >
            <IoEyeOffOutline size={25} className="m-auto" />
          </div>
        ) : (
          // Toggle icon for showing confirm password
          <div
            className="absolute top-7 bottom-0 right-0 w-10 h-8 text-lg text-gray-500"
            onClick={() => setShowConfirmPassword(true)}
          >
            <IoEyeOutline size={25} className="m-auto h-full" />
          </div>
        )}
      </div>
      <div>
        {/* Submit button */}
        <button className="flex w-full justify-center rounded-md bg-amber-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
          {loading ? "Chargement en cours" : "Valider"}
        </button>
      </div>
    </form>
  );
}
