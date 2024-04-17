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
        Téléphone <span className="font-normal">{user?.phone} </span>
      </p>
      <p className="font-semibold mb-2 flex justify-between">
        Client depuis le<span className="font-normal">{DDMMYYYY} </span>
      </p>
      {/* TODO: */}
      {/* {note && (
        <p className="font-semibold mb-2 flex justify-between">
          Note:{" "}
          <span className="font-normal ml-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
          </span>
        </p>
      )} */}
    </div>
  );
};
