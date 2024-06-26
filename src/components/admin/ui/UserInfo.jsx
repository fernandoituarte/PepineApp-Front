"use client";

import { DeleteAccount, SkeletonText } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getUserById } from "@/store/reducer/auth/login";
import Link from "next/link";
import { useEffect } from "react";

export const UserInfo = ({ id, role }) => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserById(id));
  }, [id, dispatch]);

  const fields = [
    {
      name: "Nom",
      text: loading ? (
        <SkeletonText />
      ) : (
        `${user?.first_name} ${user?.last_name}`
      ),
    },
    { name: "Email", text: loading ? <SkeletonText /> : `${user?.email}` },
    { name: "Téléphone", text: loading ? <SkeletonText /> : `${user?.phone}` },
  ];

  return (
    <div className="mx-2 sm:w-4/5 md:w-2/3 xl:w-1/2 sm:mx-auto mt-8 border rounded-lg p-6">
      {/* Displaying user name. */}
      {fields.map((field) => (
        <p key={field.name} className="font-semibold mb-2 flex justify-between">
          {field.name} <span className="font-normal">{field.text} </span>
        </p>
      ))}
      {/* Buttons for updating or deleting the account. */}
      <div className="flex flex-col mt-6 sm:flex-row justify-around">
        <Link
          href={`/${role}/update`}
          className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased bg-indigo-500 hover:bg-indigo-400 text-white text-center rounded-lg"
        >
          Modifier
        </Link>
        <DeleteAccount id={user?.id} />
      </div>
    </div>
  );
};
