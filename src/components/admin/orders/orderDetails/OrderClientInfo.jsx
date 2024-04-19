"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { getUserById } from "@/store/reducer/auth/login";

export const OrderClientInfo = ({ order }) => {
  const { user_id } = order;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const date = new Date(user?.created_at);
  const DDMMYYYY = date.toLocaleDateString("fr-FR");

  useEffect(() => {
    dispatch(getUserById(user_id));
  }, [dispatch, user_id]);

  const sendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <div>
      <p className="font-semibold mb-2 flex justify-between">
        Nom{" "}
        <span className="font-normal">
          {user?.first_name} {user?.last_name}
        </span>
      </p>
      <p className="font-semibold mb-2 flex justify-between">
        Email <span className="font-normal">{user?.email} </span>
      </p>
      <p className="font-semibold mb-2 flex justify-between">
        Téléphone
        <a href={`tel:${user?.phone}`} className="font-normal">
          {user?.phone}
        </a>
      </p>

      <p className="font-semibold mb-2 flex justify-between">
        Client depuis le<span className="font-normal">{DDMMYYYY} </span>
      </p>
      <button
        onClick={() => sendEmail(user?.email)}
        className="w-full mt-2 py-2  text-white bg-orange-500 rounded-lg hover:bg-orange-400"
      >
        Envoyer un email
      </button>
    </div>
  );
};
