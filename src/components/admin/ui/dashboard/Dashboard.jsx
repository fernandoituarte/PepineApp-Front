// Use strict mode to avoid common mistakes
"use client";

// Import necessary modules and components from libraries and frameworks
import Link from "next/link"; // Import Link component from Next.js for client-side transitions
import Image from "next/image"; // Import Image component for optimized image handling
import { useState, useEffect } from "react"; // Import useState for state management and useEffect for side effects
import { getCookie } from "cookies-next"; // Import cookie handling functions from cookies-next library
import { useRouter } from "next/navigation"; // Import useRouter from Next.js for routing control
import { useAppDispatch, useAppSelector } from "@/hooks/redux"; // Custom hook to access the Redux dispatch function
import { logOut } from "@/store/reducer/auth/login"; // Import logout action from Redux store

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

// Define a functional component for the Dashboard
export const Dashboard = () => {
  const router = useRouter(); // Hook to access the router object
  const dispatch = useAppDispatch(); // Hook to dispatch Redux actions
  const { userRole: role } = useAppSelector((state) => state.user);

  // Function to handle user logout
  const handleLogout = () => {
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
            <span className="ml-3 text-lg">Profil</span>
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
            <span className="ml-3 text-lg">Profil</span>
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
            href={"/admin/files"}
          >
            <BsInboxes size={26} />
            <span className="ml-3 text-lg">Archives</span>
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
