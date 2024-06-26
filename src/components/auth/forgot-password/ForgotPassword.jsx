"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { forgotPassword } from "@/store/reducer/auth/login";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/validations/schemas";

export function ForgotPassword() {
  const dispatch = useAppDispatch();
  const { loading, status } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const onSubmit = handleSubmit((data) => {
    dispatch(forgotPassword(data)); // Dispatching the forgot password action with the form data.
  });

  useEffect(() => {
    if (status === "email sended") {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false); // Auto-hide the success message after 3 seconds.
      }, 3000);
    }
    if (status === "email rejected") {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false); // Auto-hide the error message after 3 seconds.
      }, 3000);
    }
  }, [status]);

  return (
    <form onSubmit={onSubmit} className="space-y-6" action="" method="POST">
      {showMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
          role="alert"
        >
          <strong className="font-bold">Lien de connexion envoyé !</strong>
          <span className="block sm:inline">
            Nous avons envoyé un lien dans votre boîte mail.
          </span>
        </div>
      )}
      {showErrorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
          <strong className="font-bold">Email introuvable !</strong>
          <span className="block sm:inline">
            Nous n&apos;avons pas retrouvé cette adresse mail.
          </span>
        </div>
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
