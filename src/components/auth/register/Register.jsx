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
import { Message, PasswordField, InputField } from "@/components";

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

  // Initialize form handling with react-hook-form and Zod validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  // Handler for form submission, dispatches registration action
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

  // Effect to handle user login after registration success
  useEffect(() => {
    if (statusRegister === "registered") {
      dispatch(loginUser(user));
    }
  }, [statusRegister, router, dispatch, user]);

  // Effect to navigate to home page upon successful login
  useEffect(() => {
    if (statusLogin === "logged") {
      router.push("/");
    }
  }, [statusLogin, router]);

  return (
    <div className="mx-auto w-full max-w-sm lg:w-96">
      <div className="mx-2">
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
          <form className="space-y-6" onSubmit={onSubmit}>
            {error && (
              <Message
                className={"bg-red-100 border border-red-400 text-red-700"}
                title={"Error: "}
                text={"Un compte existe déjà avec cette adresse mail"}
              />
            )}
            <InputField
              id="first_name"
              label="Prénom"
              register={register}
              required
              message="Ce champ est requis"
            />
            <InputField
              id="last_name"
              label="Nom"
              register={register}
              required
              message="Ce champ est requis"
            />
            <InputField
              id="phone"
              label="Téléphone"
              register={register}
              required
              message="Ce champ est requis"
            />
            <InputField
              id="email"
              label="Adresse mail"
              register={register}
              required
              message="Ce champ est requis"
            />
            <PasswordField
              id="password"
              label="Entrez votre nouveau mot de passe"
              register={register}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <PasswordField
              id="confirmPassword"
              label="Confirmez votre mot de passe"
              register={register}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />
            <button className="flex w-full justify-center rounded-md bg-amber-500 px-3 p-2 mt-10 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
              Créer mon compte
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
