"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useAppDispatch } from "@/hooks/redux";
import { deleteAccount } from "@/store/reducer/auth/login";

export const DeleteAccount = ({ id }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDeleteAccount = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce compte ?")) {
      dispatch(deleteAccount(id));
      deleteCookie("user");
      router.push("/");
    }
  };
  return (
    <button
      onClick={() => handleDeleteAccount(id)}
      className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased text-white bg-red-400 rounded-lg hover:bg-red-500"
    >
      Supprimer mon compte
    </button>
  );
};
