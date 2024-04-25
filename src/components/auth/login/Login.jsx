"use client"; // Ensures the component only runs on the client side.

import Link from "next/link"; // Used for navigation between routes.
import { useAppDispatch, useAppSelector } from "@/hooks/redux"; // Custom hooks for Redux state management.
import { loginUser } from "@/store/reducer/auth/login"; // Redux action to handle user login.

import { useForm } from "react-hook-form"; // Hook for handling form validation and submission.
import { useEffect, useState } from "react"; // React hooks for managing state and side effects.
import { useRouter } from "next/navigation"; // Hook to programmatically navigate.

import { Message } from "@/components"; // Component to display messages like errors.

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"; // Icons for showing/hiding password.

export function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, loading, error } = useAppSelector((state) => state.user); // Access Redux state for user.
  const { register, handleSubmit } = useForm(); // Setup form handling with react-hook-form.
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility.

  // Function to handle form submission, dispatching the login action.
  const onSubmit = handleSubmit((data) => {
    dispatch(loginUser(data)); // Dispatch login action with form data.
  });

  // Effect to handle redirection on successful login.
  useEffect(() => {
    if (status === "logged") {
      router.back(); // Navigate back on successful login.
    }
  }, [status, router]);

  return (
    <form onSubmit={onSubmit} className="space-y-6" action="" method="POST">
      {error && ( // Conditionally render error message if login fails.
        <Message
          className={"bg-red-100 border border-red-400 text-red-700"}
          title={"Error: "}
          text={"Une erreur est survenue, veuillez réessayer"}
        />
      )}
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
