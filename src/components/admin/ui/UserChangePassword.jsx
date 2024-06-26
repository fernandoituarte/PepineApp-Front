"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "@/validations/schemas";
import { updatePassword } from "@/store/reducer/auth/login";
import { Message } from "@/components";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export const UserChangePassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.user);
  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(changePassword) });

  useEffect(() => {
    if (status === "password updated") {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        router.back();
      }, 3000);
    }
    if (status === "password failed to update") {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [status, router]);

  // Function to handle form submission, dispatching the updatePassword action.
  const onSubmit = handleSubmit((data) => {
    const password = {
      oldPassword: data.oldPassword,
      newPassword: data.password,
    };
    console.log(password);
    dispatch(updatePassword(password));
  });

  return (
    <form
      onSubmit={onSubmit}
      className="mx-2 sm:w-4/5 md:w-2/3 sm:mx-auto mt-12 border rounded-lg p-6"
    >
      {/* Error/Success message */}
      {showMessage && (
        <Message
          title={"Mot de passe mise à jour :"}
          className={"bg-green-50 text-green-700 mb-5"}
          text={"Vos informations ont été mises à jour."}
        />
      )}
      {showErrorMessage && (
        <Message
          title={"Erreur de mise à jour :"}
          className={"bg-red-50 text-red-700 mb-5"}
          text={
            "La mise à jour de votre mot de passe a échoué. Veuillez vérifier vos informations et réessayer."
          }
        />
      )}

      {/* Form sections for old password, new password, and password confirmation with validation feedback. */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between mb-6">
        <label className="font-semibold mb-1">Ancien mot de passe:</label>
        <div className="flex flex-col sm:w-1/2">
          <input
            type="password"
            {...register("oldPassword")}
            className="font-normal border rounded-md h-10 px-2"
            placeholder="Entrez l'ancien mot de passe"
          />
          {errors.oldPassword && (
            <p className="ml-2 text-red-500 text-sm">
              {errors.oldPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Input for new password with a toggle to show/hide the password. */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between mb-6">
        <label className="font-semibold mb-1">Nouveau mot de passe:</label>
        <div className="relative flex flex-col sm:w-1/2">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="font-normal border rounded-md h-10 pl-2 pr-10"
            placeholder="Entrez le nouveau mot de passe"
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <IoEyeOffOutline size={25} />
            ) : (
              <IoEyeOutline size={25} />
            )}
          </div>
        </div>
      </div>

      {/* Input for confirming the new password. */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between mb-6">
        <label className="font-semibold mb-1">
          Confirmez le nouveau mot de passe:
        </label>
        <div className="flex flex-col sm:w-1/2">
          <input
            type="password"
            {...register("confirmPassword")}
            className="font-normal border rounded-md h-10 px-2"
            placeholder="Confirmez le nouveau mot de passe"
          />
          {errors.confirmPassword && (
            <p className="ml-2 text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Submission and cancel buttons. */}
      <div className="flex flex-col mt-8 sm:flex-row justify-around">
        <button
          type="submit"
          className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-400"
        >
          Valider
        </button>
        <button
          onClick={() => router.back()}
          className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};
