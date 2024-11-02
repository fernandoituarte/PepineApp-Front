"use client";
import { Message } from "@/components";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { useRegister } from "../hooks/useRegister";
import { useState } from "react";

/**
 * `Register` component enables user account creation via a registration form.
 *
 * Features:
 * - Displays success or error messages based on registration outcomes.
 * - Includes input fields for first name, last name, phone, email, password, and password confirmation.
 * - Utilizes custom `InputField` and `PasswordField` components for better organization.
 * - Toggles password visibility.
 *
 * Interaction:
 * - Validates input on submission.
 * - Shows success message upon successful registration; displays error messages for invalid fields.
 */

export function Register() {
  const { onSubmit, register, success, errors, errorMessage } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            {success && (
              <Message
                className={
                  "bg-green-100 border border-green-400 text-green-700"
                }
                title={"Succès : "}
                text={"Votre compte a été créé avec succès."}
              />
            )}
            {errorMessage && (
              <Message
                className={"bg-red-100 border border-red-400 text-red-700"}
                title={"Error: "}
                text={errorMessage}
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
