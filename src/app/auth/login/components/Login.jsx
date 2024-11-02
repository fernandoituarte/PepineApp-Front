"use client";

import Link from "next/link";

import { Message } from "@/components";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

/**
 * `Login` component handles user authentication by providing a login form.
 *
 * Features:
 * - Displays an error message if the login attempt fails.
 * - Allows users to toggle the visibility of the password field.
 *
 * Hook Dependencies:
 * - `useLogin`: Custom hook that manages the login logic, including form submission, loading state, and error handling.
 *
 * Structure:
 * - Error message: Displays if there is an error during the login process.
 * - Email input: The user enters their email address, which is required for login.
 * - Password input: Users can enter their password, with an option to show/hide it.
 * - Password visibility toggle: An icon that allows the user to toggle between showing and hiding the password.
 * - Forgot password link: Directs users to a password recovery page.
 * - Submit button: Initiates the login process.
 *
 * Interaction:
 * - Clicking the eye icon toggles the password visibility, changing the input type accordingly.
 * - The form captures the email and password inputs and submits them via the `onSubmit` method from the `useLogin` hook.
 */

export function Login() {
  const { register, onSubmit, loading, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-6" action="" method="POST">
      {/* Error message */}
      {error && (
        <Message
          className={"bg-red-100 border border-red-400 text-red-700"}
          title={"Error: "}
          text={error}
        />
      )}
      {/* Email input */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Adresse mail
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

      {/* Password input */}
      <div className="relative block mb-4">
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
          className="w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 pr-10" // Added pr-10 to make space for the icon
        />
        {showPassword ? (
          <div
            className="absolute top-7 bottom-0 right-0 pt-1 w-10 h-8 text-lg text-gray-500"
            onClick={() => setShowPassword(false)}
          >
            <IoEyeOffOutline size={25} className="m-auto" />
          </div>
        ) : (
          <div
            className="absolute top-7 bottom-0 right-0 w-10 h-8 text-lg text-gray-500"
            onClick={() => setShowPassword(true)}
          >
            <IoEyeOutline size={25} className="m-auto h-full" />
          </div>
        )}
      </div>

      {/* Forgot Password Link */}
      <div>
        <Link
          href={"/auth/forgot-password"}
          className="font-bold text-amber-600"
        >
          Mot de passe oublié?
        </Link>
        <button className="flex w-full justify-center rounded-md bg-amber-600 my-5 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
          {loading ? "Chargement en cours" : "Valider"}
        </button>
      </div>
    </form>
  );
}
