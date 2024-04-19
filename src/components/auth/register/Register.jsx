"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { registerSchema } from "@/validations/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/store/reducer/auth/register";
import { loginUser } from "@/store/reducer/auth/login";
import { Message } from "@/components";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export function Register() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status: statusRegister, error } = useAppSelector(
    (state) => state.register,
  );
  const { status: statusLogin } = useAppSelector((state) => state.user);
  const [user, setUser] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    setUser({ email: data.email, password: data.password });
    dispatch(registerUser(userInfo));
  });

  useEffect(() => {
    if (statusRegister === "registered") {
      dispatch(loginUser(user));
    }
  }, [statusRegister, router, dispatch, user]);

  useEffect(() => {
    if (statusLogin === "logged") {
      router.push("/");
    }
  }, [statusLogin, router]);

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
            {error && (
              <Message
                className={"bg-red-100 border border-red-400 text-red-700"}
                title={"Error: "}
                text={"Un compte existe déjà avec cette adresse mail"}
              />
            )}
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
            <button className="flex w-full justify-center rounded-md bg-amber-500 px-3 p-2 mt-10 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
              Créer mon compte
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
