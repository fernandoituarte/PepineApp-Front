"use client";
import { SendEmailButton } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { getUserById } from "@/store/reducer/auth/login";

export const ClientInfo = ({ id }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="mx-2 sm:w-4/5 md:w-2/3 xl:w-1/2 sm:mx-auto mt-8 border rounded-lg p-6">
        {/* Display user name or a skeleton text during loading. */}
        <p className="font-semibold mb-2 flex justify-between">
          Nom{" "}
          <span className="font-normal">
            {user?.first_name} {user?.last_name}
          </span>
        </p>
        {/* Display user email or a skeleton text during loading. */}
        <p className="font-semibold mb-2 flex justify-between">
          Email <span className="font-normal">{user?.email}</span>
        </p>
        {/* Display user telephone or a skeleton text during loading. */}
        <p className="font-semibold mb-2 flex justify-between">
          Telephone{" "}
          <a href={`tel:${user?.phone}`} className="font-normal">
            {user?.phone}
          </a>
        </p>
        {/* Button to send an email to the user. */}
        <div className="flex flex-col mt-6 sm:flex-row justify-around">
          <SendEmailButton email={user?.email} />
        </div>
      </div>
    </>
  );
};
