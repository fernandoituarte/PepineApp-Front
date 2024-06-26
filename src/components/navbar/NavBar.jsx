"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logOut } from "@/store/reducer/auth/login";
import { getUserSessionCookieClient } from "@/lib/getUserClientSide";

import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { FiLogOut } from "react-icons/fi";
import clsx from "clsx";
import { NavBarMobile } from "@/components";
import { totalCartItemSelector } from "@/store/reducer/cart/cart";

export function NavBar({ className }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useAppSelector(totalCartItemSelector);
  const { loading, loggedOut } = useAppSelector((state) => state.user);
  const [role, setRole] = useState();

  useEffect(() => {
    const user = getUserSessionCookieClient();
    if (user) setRole(user.role);
    if (loggedOut) setRole(null);
  }, [loading, loggedOut]);

  const handleLogout = () => {
    setMobileMenuOpen(false);
    dispatch(logOut());

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

          {/* Admin or user-specific links depending on the user.role. */}
          {role && role === "admin" ? (
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
          {role && role === "user" && (
            <Link
              href={"/user"}
              className={`text-md font-semibold flex items-center leading-6 text-gray-600 $, logged`}
            >
              <p
                className={`text-lg font-semibold flex items-center leading-6 text-gray-600 $, logged`}
              >
                Mon compte
              </p>
            </Link>
          )}
          {role && role ? (
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
        role={role && role}
      />
    </>
  );
}
