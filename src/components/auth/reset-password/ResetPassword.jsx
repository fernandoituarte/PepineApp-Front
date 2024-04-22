"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { resetPassword } from "@/store/reducer/auth/login";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/validations/schemas";

import { Message } from "@/components";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export function ResetPassword({ token }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, status } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });
  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = handleSubmit((data) => {
    dispatch(resetPassword({ newPassword: data.password, resetToken: token }));
  });

  useEffect(() => {
    if (status === "reset succeeded") {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        router.push("/auth/login");
      }, 3000);
    }
    if (status === "reset failed") {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [status, router]);

  return (
    <form onSubmit={onSubmit} className="space-y-6" action="" method="POST">
      {showMessage && (
        <Message
          className={"bg-green-100 border border-green-400 text-green-700"}
          title={"Success: "}
          text={"Nous avons actualisé votre mot de passe."}
        />
      )}
      {showErrorMessage && (
        <Message
          className={"bg-red-100 border border-red-400 text-red-700"}
          title={"Error: "}
          text={"Une erreur est survenue, veuillez réessayer"}
        />
      )}
      {Object.keys(errors).length > 0 && (
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
      <div className="relative block mb-4">
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
          className="w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 pr-10" // Added pr-10 to make space for the icon
        />
        {showConfirmPassword ? (
          <div
            className="absolute top-7 bottom-0 right-0 pt-1 w-10 h-8 text-lg text-gray-500"
            onClick={() => setShowConfirmPassword(false)}
          >
            <IoEyeOffOutline size={25} className="m-auto" />
          </div>
        ) : (
          <div
            className="absolute top-7 bottom-0 right-0 w-10 h-8 text-lg text-gray-500"
            onClick={() => setShowConfirmPassword(true)}
          >
            <IoEyeOutline size={25} className="m-auto h-full" />
          </div>
        )}
      </div>
      <div>
        <button className="flex w-full justify-center rounded-md bg-amber-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
          {loading ? "Chargement en cours" : "Valider"}
        </button>
      </div>
    </form>
  );
}
