"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "@/validations/schemas";
import {
  updateUserDetails,
  getUserById,
  setStatus,
} from "@/store/reducer/auth/login";
import { Message, InputFieldAdmin } from "@/components";

export const UserUpdate = ({ id, role }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { status, user } = useAppSelector((state) => state.user);

  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userUpdateSchema) });

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      const { first_name, last_name, email, phone } = user;
      reset({
        first_name,
        last_name,
        email,
        phone,
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (status === "user updated") {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      setTimeout(() => {
        dispatch(setStatus(""));
        router.back();
      }, 1000);
    }
    if (status === "user failed to update") {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [status, router, dispatch]);

  const onSubmit = handleSubmit((data) => {
    const userInfo = { ...data };
    dispatch(updateUserDetails({ userInfo, id: user.id }));
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
          title={"Erreur de mise à jour: "}
          className={"bg-red-50 text-red-700 mb-5"}
          text={
            "Une erreur est survenue lors de la mise à jour de vos informations."
          }
        />
      )}
      <InputFieldAdmin
        label="Prénom"
        placeholder="Prénom"
        register={register}
        name="first_name"
        errors={errors}
      />
      <InputFieldAdmin
        label="Nom"
        placeholder="Nom"
        register={register}
        name="last_name"
        errors={errors}
      />
      <InputFieldAdmin
        label="Email"
        placeholder="Email"
        register={register}
        name="email"
        errors={errors}
      />
      <InputFieldAdmin
        label="Téléphone"
        placeholder="Phone"
        register={register}
        name="phone"
        errors={errors}
      />
      {/* Line Separator */}
      <div className="w-full h-px bg-gray-200 my-10" />

      <Link
        href={
          role === "admin" ? "/admin/change-password" : "/user/change-password"
        }
        className="font-semibold mb-1 text-orange-500"
      >
        Modifier mon mot de passe{" "}
      </Link>
      <div className="flex flex-col mt-8 sm:flex-row justify-around">
        <button
          type="submit"
          className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased bg-indigo-600 text-white rounded-lg hover:bg-indigo-400"
        >
          Valider
        </button>
        <Link
          href={role === "admin" ? "/admin" : "/user"}
          className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased text-white bg-red-400 rounded-lg hover:bg-red-500 text-center"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
};
