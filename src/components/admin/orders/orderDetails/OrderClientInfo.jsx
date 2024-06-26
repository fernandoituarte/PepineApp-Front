"use client";

import { useEffect } from "react";
import { SendEmailButton } from "@/components";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { getUserById } from "@/store/reducer/auth/login";

export const OrderClientInfo = ({ id }) => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id, dispatch]);
  // Convert user's account creation date from ISO string to readable format.
  const date = new Date(user?.created_at);
  const accountCreationTime = date.toLocaleDateString("fr-FR");

  return (
    <div>
      <p className="font-semibold mb-2 flex justify-between">
        Nom{" "}
        <span className="font-normal">
          {user?.first_name} {user?.last_name}
        </span>
      </p>
      <p className="font-semibold mb-2 flex justify-between">
        Email
        <span className="font-normal">{user?.email}</span>
      </p>
      <p className="font-semibold mb-2 flex justify-between">
        Téléphone
        <a href={`tel:${user?.phone}`} className="font-normal">
          {user?.phone}
        </a>
      </p>
      <p className="font-semibold mb-2 flex justify-between">
        Client depuis le{" "}
        <span className="font-normal">{accountCreationTime}</span>
      </p>
      {user && <SendEmailButton email={user.email} />}
    </div>
  );
};
