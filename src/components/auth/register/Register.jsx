"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { registerSchema } from "@/validations/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/store/reducer/auth/register";

export function Register() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.register);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = handleSubmit((data) => {
    const userInfo = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      password: data.password,
    };

    dispatch(registerUser(userInfo));
  });

  useEffect(() => {
    if (status === "registered") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="mx-auto w-full max-w-sm lg:w-96">
      <div className="">
        {Object.keys(errors).length > 0 && (
          <div className="flex flex-col w-full justify-center text-center rounded-md bg-red-500 px-3 p-2 mb-4 text-sm leading-6 text-white shadow-sm">
            {errors.first_name?.message && (
              <p className="text-white"> - {errors.first_name?.message}</p>
            )}
            {errors.last_name?.message && (
              <p className="text-white"> - {errors.last_name?.message}</p>
            )}
            {errors.phone?.message && (
              <p className="text-white"> - {errors.phone?.message}</p>
            )}
            {errors.email?.message && (
              <p className="text-white"> - {errors.email?.message}</p>
            )}
            {errors.password?.message && (
              <p className="text-white"> - {errors.password?.message}</p>
            )}
            {errors.confirmPassword?.message && (
              <p className="text-white">- {errors.confirmPassword?.message}</p>
            )}
          </div>
        )}
        <div>
          <motion.form
            className="space-y-6"
            onSubmit={onSubmit}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Prénom
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  {...register("first_name", {
                    required: true,
                    message: "Ce champ est requis",
                  })}
                  className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Nom
              </label>
              <div className="mt-2">
                <input
                  id="last_name"
                  {...register("last_name", {
                    required: true,
                    message: "Ce champ est requis",
                  })}
                  className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Téléphone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  {...register("phone", {
                    required: true,
                    message: "Ce champ est requis",
                  })}
                  className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Adresse mail
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: true,
                    message: "Ce champ est requis",
                  })}
                  className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: true,
                    message: "Ce champ est requis",
                  })}
                  className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirmez votre mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: true,
                    message: "Ce champ est requis",
                  })}
                  className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button className="flex w-full justify-center rounded-md bg-amber-500 px-3 p-2 mt-10 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
              Créer mon compte
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
