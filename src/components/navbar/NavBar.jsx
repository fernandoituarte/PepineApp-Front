"use client"; // Ensures that this module only runs on the client side.

import { useState, useEffect } from "react"; // Importing React hooks for state management and side effects.
import Link from "next/link"; // Imports the Link component for SPA navigation.
import Image from "next/image"; // Imports the Image component for optimized image handling.
import { getCookie } from "cookies-next"; // Imports a utility function for cookie retrieval.
import { useRouter, usePathname } from "next/navigation"; // useRouter for programmatic navigation, usePathname for current path retrieval.
import { useAppDispatch, useAppSelector } from "@/hooks/redux"; // Custom hooks for accessing Redux state and dispatch functions.
import { logOut } from "@/store/reducer/auth/login"; // Action creator for logging out users.

import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline"; // Icons for menu and shopping cart.
import { FiLogOut } from "react-icons/fi"; // Icon for logout button.
import clsx from "clsx"; // A utility for conditionally joining classNames together.
import { NavBarMobile } from "@/components"; // Mobile version of the navigation bar.
import { totalCartItemSelector } from "@/store/reducer/cart/cart"; // Selector for total items in the cart.

export function NavBar({ className }) {
  const router = useRouter();
  const pathname = usePathname(); // Retrieves the current path.
  const dispatch = useAppDispatch(); // Dispatch function from Redux.
  const { userRole: role } = useAppSelector((state) => state.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State to manage mobile menu visibility.
  const totalItems = useAppSelector(totalCartItemSelector); // Total cart items count from Redux store.

  const handleLogout = () => {
    setMobileMenuOpen(false); // Close mobile menu.
    dispatch(logOut()); // Dispatch logout action.

    // Refresh or navigate to the home page depending on current path.
    if (pathname === "/") {
      router.refresh();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <nav
        className="bg-white z-50 mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          {/* Conditional rendering of logo based on path, smaller on user/admin pages. */}
          {pathname.includes("user") || pathname.includes("admin") ? (
            <Link href={"/"} className={"-m-1.5 p-1.5 lg:hidden"}>
              <Image
                className="h-8 w-auto"
                src="/pépinière.png"
                width={500}
                height={500}
                alt=""
              />
            </Link>
          ) : (
            <Link href={"/"} className={"-m-1.5 p-1.5"}>
              <Image
                className="h-8 w-auto"
                src="/pépinière.png"
                width={500}
                height={500}
                alt=""
              />
            </Link>
          )}
        </div>
        {/* Hamburger menu for mobile view. */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {/* Desktop navigation links with conditional styling for active links. */}
        <div className="hidden lg:flex lg:gap-x-20">
          <Link
            href={"/products"}
            className={clsx(
              "flex items-center gap-x-1 text-lg font-semibold  leading-6 text-gray-600 transform transition-colors duration-300",
              { "border-b-2 border-b-amber-500": pathname === "/products" },
            )}
          >
            Produits
          </Link>
          <Link
            href={"/categories"}
            className={clsx(
              "flex items-center gap-x-1 text-lg font-semibold  leading-6 text-gray-600 transform transition-colors duration-300",
              { "border-b-2 border-b-amber-500": pathname === "/categories" },
            )}
          >
            Categories
          </Link>

          {/* Admin or user-specific links depending on the role. */}
          {role === "admin" ? (
            <Link
              href={"/admin/products"}
              className={clsx(
                "flex items-center gap-x-1 text-lg font-semibold  leading-6 text-gray-600 transform transition-colors duration-300",
                {
                  "border-b-2 border-b-amber-500":
                    pathname.includes("/admin") || pathname.includes("/user"),
                },
              )}
            >
              Gestion
            </Link>
          ) : (
            <Link
              href={"/cart"}
              className={clsx(
                "flex items-center gap-x-1 text-lg font-semibold  leading-6 text-gray-600 transform transition-colors duration-300",
                { "border-b-2 border-b-amber-500": pathname.includes("/cart") },
              )}
            >
              {!!totalItems && (
                <div className="text-amber-500">{totalItems}</div>
              )}
              <ShoppingCartIcon
                className="h-6 w-6 text-gray-600 group-hover:text-amber-600"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>

        {/* Right-aligned section for login/logout functionality based on user role. */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {role === "user" && (
            <Link
              href={"/user"}
              className={`text-md font-semibold flex items-center leading-6 text-gray-600 ${className}`}
            >
              <p
                className={`text-lg font-semibold flex items-center leading-6 text-gray-600 ${className}`}
              >
                Mon compte
              </p>
            </Link>
          )}
          {role ? (
            <button
              onClick={handleLogout}
              className={`flex justify-end items-center rounded-md px-2 ml-10 gap-x-1 text-md  leading-6 text-white bg-amber-300 hover:bg-amber-200 ${className}`}
            >
              <FiLogOut className="h-8 w-5" />
            </button>
          ) : (
            <Link
              href={"/auth/login"}
              className={`text-md font-semibold flex items-center leading-6 text-gray-600 ${className}`}
            >
              <p
                className={`text-lg font-semibold flex items-center leading-6 text-gray-600 ${className}`}
              >
                Se connecter
              </p>
            </Link>
          )}
        </div>
      </nav>
      {/* Mobile navigation bar component. */}
      <NavBarMobile
        handleLogout={handleLogout}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        role={role}
      />
    </>
  );
}
