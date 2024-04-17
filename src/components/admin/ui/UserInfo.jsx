"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { deleteAccount, getUserById } from "@/store/reducer/auth/login";
import { SkeletonText } from "@/components";

export const UserInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  const [userId, setUserId] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      const { id, role } = JSON.parse(userCookie);
      setUserId(id);
      setRole(role);
      dispatch(getUserById(id));
    }
  }, [dispatch]);

  const handleDeleteAccount = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce compte ?")) {
      dispatch(deleteAccount(id));
      deleteCookie("user");
      router.push("/");
    }
  };

  return (
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
          <span className="font-normal">{user?.phone}</span>
        )}
      </p>

      <div className="flex flex-col mt-6 sm:flex-row justify-around">
        <Link
          href={`/${role}/update`}
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
