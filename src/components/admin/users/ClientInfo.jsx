// Directive to ensure the component only runs on the client side.
"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux"; // Custom hooks for accessing Redux state and dispatching actions.
import { getUserById } from "@/store/reducer/auth/login"; // Redux action to fetch user details.
import { notFound } from "next/navigation"; // Function to handle 404 errors in Next.js.
import { SkeletonText } from "@/components"; // Component to display a loading placeholder.

export const ClientInfo = ({ id }) => {
  const dispatch = useAppDispatch();
  const { user, error, loading } = useAppSelector((state) => state.user); // Access user state, error and loading flags from Redux store.

  // Fetch user data on component mount or when `id` changes.
  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  // Handle errors by redirecting to a 404 page.
  useEffect(() => {
    if (error) {
      notFound();
    }
  }, [error]);

  // Function to initiate an email to the user using the default email client.
  const sendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <>
      <div className="mx-2 sm:w-4/5 md:w-2/3 xl:w-1/2 sm:mx-auto mt-8 border rounded-lg p-6">
        {/* Display user name or a skeleton text during loading. */}
        <p className="font-semibold mb-2 flex justify-between">
          Nom{" "}
          {loading ? (
            <SkeletonText />
          ) : (
            <span className="font-normal">
              {user?.first_name} {user?.last_name}
            </span>
          )}
        </p>
        {/* Display user email or a skeleton text during loading. */}
        <p className="font-semibold mb-2 flex justify-between">
          Email{" "}
          {loading ? (
            <SkeletonText />
          ) : (
            <span className="font-normal">{user?.email}</span>
          )}
        </p>
        {/* Display user telephone or a skeleton text during loading. */}
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
        {/* Button to send an email to the user. */}
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
