"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useForm } from "react-hook-form";
import { getCookie } from "cookies-next";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "@/validations/schemas";
import { updateUserDetails } from "@/store/reducer/auth/login";
import { Message } from "@/components";

export const UserUpdate = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, user } = useAppSelector((state) => state.user);
  const [userId, setUserId] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userUpdateSchema) });

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      const { id } = JSON.parse(userCookie);
      setUserId(id);
    }
    if (user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [reset, user]);

  useEffect(() => {
    if (status === "user updated") {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
    if (status === "user failed to update") {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [status]);

  const onSubmit = handleSubmit((data) => {
    const userInfo = { ...data };
    dispatch(updateUserDetails({ userInfo, id: userId }));
    setTimeout(() => {
      router.back();
    }, 1000);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="mx-2 sm:w-4/5 md:w-2/3 sm:mx-auto mt-12 border rounded-lg p-6"
    >
      {showMessage && (
        <Message
          title={"Informations mises à jour: "}
          className={"bg-green-50 text-green-700 mb-5"}
          text={"Vos informations ont étés mises à jour"}
        />
      )}
      {showErrorMessage && (
        <Message
          title={"Informations mises à jour: "}
          className={"bg-red-50 text-red-700 mb-5"}
          text={"Vos informations ont étés mises à jour"}
        />
      )}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between  mb-6">
        <p className="font-semibold mb-1">Prénom </p>
        <div className="flex flex-col sm:w-1/2">
          <input
            className="font-normal border rounded-md h-8 px-2 "
            placeholder={"Prénom"}
            {...register("first_name", {
              required: true,
              message: "Ce champ est requis",
            })}
          />
          {errors.first_name?.message && (
            <p className="ml-2 text-red-500 text-sm">
              {errors.first_name?.message}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row sm:justify-between mb-6">
        <p className="font-semibold mb-1">Nom </p>
        <div className="flex flex-col sm:w-1/2">
          <input
            className="font-normal border rounded-md h-8 px-2 "
            placeholder={"Nom"}
            {...register("last_name", {
              required: true,
              message: "Ce champ est requis",
            })}
          />
          {errors.last_name?.message && (
            <p className="ml-2 text-red-500 text-sm">
              {errors.last_name?.message}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row sm:justify-between mb-6">
        <p className="font-semibold mb-1">Email </p>
        <div className="flex flex-col sm:w-1/2">
          <input
            className="font-normal border rounded-md h-8 px-2 "
            placeholder={"Email"}
            {...register("email", {
              required: true,
              message: "Ce champ est requis",
            })}
          />
          {errors.email?.message && (
            <p className="ml-2 text-red-500 text-sm">{errors.email?.message}</p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row sm:justify-between mb-4">
        <p className="font-semibold mb-1">Téléphone </p>
        <input
          className="font-normal border rounded-md h-8 px-2 sm:w-1/2"
          placeholder={"Phone"}
          {...register("phone", {
            required: true,
            message: "Ce champ est requis",
          })}
        />
        {errors.phone?.message && (
          <p className="ml-2 text-red-500 text-sm">{errors.phone?.message}</p>
        )}
      </div>
      <div className="flex flex-col mt-8 sm:flex-row justify-around">
        <button
          type="submit"
          className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased bg-indigo-600 text-white rounded-lg hover:bg-indigo-400"
        >
          Valider
        </button>
        <button
          onClick={() => router.back()}
          className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased text-white bg-red-400 rounded-lg hover:bg-red-500 text-center"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};
