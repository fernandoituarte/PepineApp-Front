"use client";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { Message } from "@/components";

/**
 * `ForgotPassword` renders a form that allows users to request a password reset.
 *
 * Features:
 * - Displays success or error messages based on the email submission outcome.
 * - Validates email input using the `useForgotPassword` hook and shows form errors if present.
 *
 * Hook Dependencies:
 * - `useForgotPassword`: Manages the form logic, such as handling the submit event, managing errors, and tracking the loading state.
 *
 * Structure:
 * - Success message: Displays a green message when the password reset link is sent successfully.
 * - Error message: Shows a red error message if the email is not found.
 * - Form validation: Highlights errors related to email input if validation fails.
 *
 * Elements:
 * - `Message`: A reusable component to display success or error messages.
 * - Email input: The user enters their email to request the password reset.
 * - Submit button: Initiates the password reset process.
 */

export function ForgotPassword() {
  const { loading, register, errors, showMessage, errorMessage, onSubmit } =
    useForgotPassword();

  return (
    <form onSubmit={onSubmit} className="space-y-6" action="" method="POST">
      {showMessage && (
        <Message
          className={"bg-green-100 border border-green-400 text-green-700"}
          title={"Lien de connexion envoyé! "}
          text={"Nous avons envoyé un lien dans votre boîte mail."}
        />
      )}
      {errorMessage && (
        <Message
          className={"bg-red-100 border border-red-400 text-red-700"}
          title={"Email introuvable! "}
          text={errorMessage}
        />
      )}
      {Object.keys(errors).length > 0 && (
        <div className="flex flex-col w-full justify-center text-center rounded-md bg-red-500 px-3 p-2 mb-4 text-sm leading-6 text-white shadow-sm">
          {errors.email?.message && (
            <p className="text-white"> - {errors.email?.message}</p>
          )}
        </div>
      )}

      {/* Email input */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Entrez votre email
        </label>

        <input
          id="email"
          name="email"
          {...register("email")}
          type="email"
          autoComplete="email"
          required
          className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
        />
      </div>

      {/* Submit button */}
      <div>
        <button className="flex w-full justify-center rounded-md bg-amber-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
          {loading ? "Chargement en cours" : "Valider"}
        </button>
      </div>
    </form>
  );
}
