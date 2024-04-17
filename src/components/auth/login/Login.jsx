"use client";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loginUser } from "@/store/reducer/auth/login";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, loading, error } = useAppSelector((state) => state.user);
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    dispatch(loginUser(data));
  });

  useEffect(() => {
    if (status === "logged") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <form onSubmit={onSubmit} className="space-y-6" action="" method="POST">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">
            Une erreur est survenue, veuillez réessayer
          </span>
        </div>
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

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          {...register("password")}
          type="password"
          autoComplete="current-password"
          required
          className="block mb-4 w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
        />
        <Link
          href={"/auth/forgot-password"}
          className="font-bold text-amber-600"
        >
          Mot de passe oublié?
        </Link>
      </div>
      <div>
        <button className="flex w-full justify-center rounded-md bg-amber-600 mb-5 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
          {loading ? "Chargement en cours" : "Valider"}
        </button>
      </div>
    </form>
  );
}
