// Ensures the component runs only on the client side in a Next.js environment.
"use client";
import Link from "next/link"; // Used for navigation within the app.
import { useState, useEffect } from "react"; // React hooks for state and lifecycle management.
import { useRouter } from "next/navigation"; // Next.js router for programmatic navigation.
import { getCookie, deleteCookie } from "cookies-next"; // Utilities to handle cookies.
import { useAppSelector, useAppDispatch } from "@/hooks/redux"; // Custom hooks for Redux state management.
import { deleteAccount, getUserById } from "@/store/reducer/auth/login"; // Redux actions for user account management.
import { SkeletonText } from "@/components"; // A component to display a loading state placeholder.

export const UserInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading, userId, userRole } = useAppSelector(
    (state) => state.user,
  ); // Accessing user data and loading state from Redux store.

  // Effect hook to retrieve user details from cookies and fetch user data using Redux.
  useEffect(() => {
    dispatch(getUserById(userId)); // Fetching user data from the server.
  }, [dispatch, userId]);

  // Handler for account deletion.
  const handleDeleteAccount = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce compte ?")) {
      // Confirmation dialog.
      dispatch(deleteAccount(id)); // Dispatching the delete action.
      deleteCookie("user"); // Removing the user cookie.
      router.push("/"); // Redirecting to the home page.
    }
  };

  return (
    <div className="mx-2 sm:w-4/5 md:w-2/3 xl:w-1/2 sm:mx-auto mt-8 border rounded-lg p-6">
      {/* Displaying user name. */}
      <p className="font-semibold mb-2 flex justify-between">
        Nom{" "}
        {loading ? (
          <SkeletonText /> // Shows a placeholder when loading.
        ) : (
          <span className="font-normal">
            {user?.first_name} {user?.last_name}{" "}
          </span>
        )}
      </p>
      {/* Displaying user email. */}
      <p className="font-semibold mb-2 flex justify-between">
        Email{" "}
        {loading ? (
          <SkeletonText />
        ) : (
          <span className="font-normal">{user?.email}</span>
        )}
      </p>
      {/* Displaying user phone. */}
      <p className="font-semibold mb-2 flex justify-between">
        Telephone{" "}
        {loading ? (
          <SkeletonText />
        ) : (
          <span className="font-normal">{user?.phone}</span>
        )}
      </p>

      {/* Buttons for updating or deleting the account. */}
      <div className="flex flex-col mt-6 sm:flex-row justify-around">
        <Link
          href={`/${userRole}/update`}
          className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased bg-indigo-500 hover:bg-indigo-400 text-white text-center rounded-lg"
        >
          Modifier
        </Link>
        <button
          onClick={() => handleDeleteAccount(userId)}
          className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased text-white bg-red-400 rounded-lg hover:bg-red-500"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
};
