"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logOut } from "@/store/reducer/auth/login";
import { getUserSessionCookieClient } from "@/lib/getUserClientSide";

// Import icons from react-icons library
import {
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
  IoCartOutline,
} from "react-icons/io5";
import { BsInboxes } from "react-icons/bs";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, loggedOut } = useAppSelector((state) => state.user);
  const [role, setRole] = useState();

  useEffect(() => {
    const user = getUserSessionCookieClient();
    if (user) setRole(user.role);
    if (loggedOut) setRole(null);
  }, [loading, loggedOut]);

  // Function to handle user logout
  const handleLogout = () => {
    dispatch(logOut());
    router.push("/");
  };

  const userLinks = [
    {
      name: "Profil",
      path: "/user",
      icon: <IoPersonOutline size={30} />,
    },
    {
      name: "Commandes",
      path: "/user/orders",
      icon: <IoTicketOutline size={30} />,
    },
    {
      name: "Mon Panier",
      path: "/cart",
      icon: <IoCartOutline size={30} />,
    },
  ];

  const adminLinks = [
    {
      name: "Profil",
      path: "/admin",
      icon: <IoPersonOutline size={30} />,
    },
    {
      name: "Produits",
      path: "/admin/products",
      icon: <IoShirtOutline size={30} />,
    },
    {
      name: "Commandes",
      path: "/admin/orders",
      icon: <IoTicketOutline size={30} />,
    },
    {
      name: "Archives",
      path: "/admin/orders-history",
      icon: <BsInboxes size={26} />,
    },
    {
      name: "Utilisateurs",
      path: "/admin/users",
      icon: <IoPeopleOutline size={30} />,
    },
  ];

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

      {role !== "admin" ? (
        <>
          {/*User */}
          {userLinks.map((link) => (
            <Link
              key={link.name}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              href={link.path}
            >
              {link.icon}
              <span className="ml-3 text-lg">{link.name}</span>
            </Link>
          ))}

          {/* Line Separator */}
          <div className="w-full h-px bg-gray-200 my-10" />
        </>
      ) : (
        <>
          {/*Admin */}
          {adminLinks.map((link) => (
            <Link
              key={link.name}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              href={link.path}
            >
              {link.icon}
              <span className="ml-3 text-lg">{link.name}</span>
            </Link>
          ))}
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
