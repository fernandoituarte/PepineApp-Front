"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { logOut } from "@/store/reducer/auth/login";
import {
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
  IoCartOutline,
} from "react-icons/io5";

export const Dashboard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      const { role } = JSON.parse(userCookie);
      setRole(role);
    }
  }, []);

  const handleLogout = () => {
    setRole(null);
    dispatch(logOut());

    router.push("/");
  };

  return (
    <nav className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[27%] xl:w-[23%] 2xl:w-[17%] shadow-lg">
      <div className="flex mt-6 pl-2">
        <Link href={"/"} className="">
          <Image
            className="h-8 w-auto"
            src="/pépinière.png"
            width={500}
            height={500}
            alt=""
          />
        </Link>
      </div>
      {/* Menu */}

      {/*User */}
      {role !== "admin" ? (
        <>
          <Link
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            href={"/user"}
          >
            <IoPersonOutline size={30} />
            <span className="ml-3 text-lg">Profile</span>
          </Link>
          <Link
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            href={"/user/orders"}
          >
            <IoTicketOutline size={30} />
            <span className="ml-3 text-lg">Commandes</span>
          </Link>
          <Link
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            href={"/cart"}
          >
            <IoCartOutline size={30} />
            <span className="ml-3 text-lg">Mon Panier</span>
          </Link>

          {/* Line Separator */}
          <div className="w-full h-px bg-gray-200 my-10" />
        </>
      ) : (
        <>
          {/*Admin */}
          <Link
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            href={"/admin"}
          >
            <IoPersonOutline size={30} />
            <span className="ml-3 text-lg">Profile</span>
          </Link>
          <Link
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            href={"/admin/products"}
          >
            <IoShirtOutline size={30} />
            <span className="ml-3 text-lg">Produits</span>
          </Link>
          <Link
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            href={"/admin/orders"}
          >
            <IoTicketOutline size={30} />
            <span className="ml-3 text-lg">Commandes</span>
          </Link>
          <Link
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            href={"/admin/users"}
          >
            <IoPeopleOutline size={30} />
            <span className="ml-3 text-lg">Utilisateurs</span>
          </Link>
        </>
      )}

      <div className="fixed hidden lg:flex left-5 bottom-3">
        <button
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={handleLogout}
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-lg">Logout</span>
        </button>
      </div>
    </nav>
  );
};
