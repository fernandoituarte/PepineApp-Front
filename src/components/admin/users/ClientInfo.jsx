"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { getUserById } from "@/store/reducer/auth/login";
import { notFound } from "next/navigation";
import { SkeletonText } from "@/components";

export const ClientInfo = ({ id }) => {
  const dispatch = useAppDispatch();
  const { user, error, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      notFound();
    }
  }, [error]);

  const sendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <>
      <div className="mx-2 sm:w-4/5 md:w-2/3 xl:w-1/2 sm:mx-auto mt-8 border rounded-lg p-6">
        <p className="font-semibold mb-2 flex justify-between">
          Nom{" "}
          {loading ? (
            <SkeletonText />
          ) : (
            <span className="font-normal">
              {user?.first_name} {user?.last_name}{" "}
            </span>
          )}
        </p>
        <p className="font-semibold mb-2 flex justify-between">
          Email{" "}
          {loading ? (
            <SkeletonText />
          ) : (
            <span className="font-normal">{user?.email}</span>
          )}
        </p>
        <p className="font-semibold mb-2 flex justify-between">
          Telephone{" "}
          {loading ? (
            <SkeletonText />
          ) : (
            <a href={`tel:${user?.phone}`} className="font-normal">
              {user?.phone}
            </a>
          )}
        </p>
        <div className="flex flex-col mt-6 sm:flex-row justify-around">
          <button
            onClick={() => sendEmail(user?.email)}
            className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased text-white bg-orange-500 rounded-lg hover:bg-orange-400"
          >
            Envoyer un email
          </button>
        </div>
      </div>
    </>
  );
};
