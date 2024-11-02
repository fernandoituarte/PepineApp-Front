"use client";
import Link from "next/link";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  deleteAccount,
  getUserById,
  resetUserState,
} from "@/store/reducer/user/user";
import { logOut } from "@/store/reducer/auth/auth";
import { useEffect, useState } from "react";
import { Spinner, ErrorComponent } from "@/components";

/**
 * `UserInfo` component displays user information and provides options to update or delete the account.
 *
 * Features:
 * - Displays user's name, email, and phone number.
 * - Allows the user to update or delete their account (non-admins only).
 * - Handles unauthorized access and loading states.
 *
 * State Management:
 * - `unauthorized`: Determines if the user has permission to view the information.
 * - `loading`: Displays a loading indicator while fetching data.
 *
 * Effects:
 * - Fetches user data on mount.
 * - Logs out the user and redirects to home on account deletion.
 * - Handles 401, 403 and 404 status codes.
 */

export const UserInfo = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [unauthorized, setUnauthorized] = useState(false);
  const { status, user, loading } = useAppSelector((state) => state.user);
  const { user: userSession } = useAppSelector((state) => state.auth);
  const isAdmin = pathname.includes("admin");

  // Fetch user
  useEffect(() => {
    if (userSession) {
      dispatch(getUserById(userSession.id));
    }
  }, [dispatch, userSession]);

  // Delete user
  const handleDeleteAccount = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce compte ?")) {
      dispatch(deleteAccount(id));
    }
  };

  // Handles account deletion
  useEffect(() => {
    if (status === "Account deleted") {
      dispatch(logOut());

      setTimeout(() => {
        dispatch(resetUserState());
        router.replace("/");
      }, 2000);
    }
  }, [status, dispatch, router]);

  // Handles 401, 403 and 404 status codes.
  useEffect(() => {
    if (status === 401 || status === 403) {
      setUnauthorized(true);
    }
    if (status === 404) {
      notFound();
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
        text={`Vous n'avez pas des droits pour acceder a ce contenu`}
      />
    );
  }

  return (
    <div className="mx-2 sm:w-4/5 md:w-2/3 xl:w-1/2 sm:mx-auto mt-8 border rounded-lg p-6">
      {/* Displaying user name. */}
      <p className="font-semibold mb-2 flex justify-between">
        Nom{" "}
        <span className="font-normal">
          {user?.first_name} {user?.last_name}{" "}
        </span>
      </p>

      <p className="font-semibold mb-2 flex justify-between">
        Email <span className="font-normal">{user?.email} </span>
      </p>

      <p className="font-semibold mb-2 flex justify-between">
        Téléphone <span className="font-normal">{user?.phone} </span>
      </p>
      {/* Buttons for updating or deleting the account. */}
      <div className="flex flex-col mt-6 sm:flex-row justify-around">
        <Link
          href={isAdmin ? `/admin/update` : `/user/update`}
          className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased bg-[#5e60e4] hover:bg-[#5e60e485] text-white text-center rounded-lg"
        >
          Modifier
        </Link>
        {user?.role !== "admin" && (
          <button
            onClick={() => handleDeleteAccount(user?.id)}
            className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased text-white bg-[#be5555] rounded-lg hover:bg-[#be55557e]"
          >
            Supprimer mon compte
          </button>
        )}
      </div>
    </div>
  );
};
