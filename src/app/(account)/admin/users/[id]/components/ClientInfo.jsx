"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getUserById } from "@/store/reducer/user/user";

import { Title, Spinner, ErrorComponent } from "@/components";
import { SendEmailButton } from "../../../../components/SendEmailButton";

/**
 * The `ClientInfo` component displays detailed information about a specific user.
 *
 * Props:
 * - `id`: The ID of the user to fetch and display.
 *
 * Features:
 * - Fetches user data and manages loading states.
 * - Displays user details: name, email, phone, role, status, and creation date.
 * - Handles unauthorized access and redirects to 404 if user is not found.
 * - Includes a button to send an email to the user.
 *
 * State Management:
 * - `loading`: Fetching state.
 * - `user`: User details from Redux.
 * - `status`: Fetching status.
 * - `unauthorized`: Indicates insufficient permissions.
 */

export const ClientInfo = ({ id }) => {
  const dispatch = useAppDispatch();
  const { user, loading, status } = useAppSelector((state) => state.user);
  const [unauthorized, setUnauthorized] = useState(false);
  const date = new Date(user?.createdAt).toLocaleDateString("fr-FR");

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (status === 404) {
      notFound();
    }

    if (status === 401) {
      setUnauthorized(true);
    }
  }, [status]);

  if (loading) {
    return (
      <div className="sm:w-4/5 md:w-2/3 xl:w-1/2 mx-auto mt-8 p-6">
        <Spinner />
      </div>
    );
  }

  if (unauthorized) {
    return (
      <ErrorComponent
        text={`Autorisations insuffisantes pour afficher ces informations.`}
      />
    );
  }

  return (
    <>
      <Title
        title={`Client: ${user?.first_name} ${user?.last_name}`}
        className={"text-center"}
      />

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
        <p className="font-semibold mb-2 flex justify-between">
          Role <span className="font-normal">{user?.role}</span>
        </p>
        <p className="font-semibold mb-2 flex justify-between">
          Statut{" "}
          <span className="font-normal">
            {user?.isActive ? "Active" : "Inactive"}
          </span>
        </p>
        <p className="font-semibold mb-2 flex justify-between">
          Compte cree le: <span className="font-normal">{date}</span>
        </p>
        {/* Button to send an email to the user. */}
        <div className="flex flex-col mt-6 sm:flex-row justify-around">
          <SendEmailButton email={user?.email} />
        </div>
      </div>
    </>
  );
};
