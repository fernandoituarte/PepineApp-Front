"use client"; // Directs Next.js to only load this module on the client side.

import Link from "next/link"; // Imports Link component for navigation within the app without full page reloads.
import Image from "next/image"; // Imports optimized Image component for handling images efficiently in Next.js.
import { useAppSelector } from "@/hooks/redux"; // Custom hook for selecting state from the Redux store.
import { totalCartItemSelector } from "@/store/reducer/cart/cart"; // Selector to get the total number of items in the cart.

import { Dialog } from "@headlessui/react"; // Import Dialog component for accessible modals.
import { XMarkIcon } from "@heroicons/react/24/outline"; // Import icon for close button.
import { FiLogIn, FiLogOut } from "react-icons/fi"; // Import login and logout icons.
import { BsInboxes, BsShopWindow } from "react-icons/bs"; // Import icon for admin archive link.

import {
  IoPeopleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
  IoCartOutline,
} from "react-icons/io5"; // Import various Ionicons for menu items.
import { BsShop } from "react-icons/bs"; // Import shop icon for product link.

// Functional component for mobile navigation bar.
export function NavBarMobile({
  handleLogout, // Function to handle logout.
  setMobileMenuOpen, // Function to set the state of the mobile menu.
  mobileMenuOpen, // State indicating whether the mobile menu is open.
  role, // User role to conditionally render links.
}) {
  const totalItems = useAppSelector(totalCartItemSelector); // Retrieve total cart items from Redux store.

  return (
    <Dialog
      as="div"
      className="lg:hidden" // Hide on larger screens where the main nav bar is used.
      open={mobileMenuOpen} // Control the visibility of the modal based on mobileMenuOpen state.
      onClose={setMobileMenuOpen} // Set the mobile menu state to false when the dialog is closed.
    >
      <Dialog.Panel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        {/* Dialog panel containing all content */}
        <div className="flex items-center justify-between">
          {/* Top section with logo and close button */}
          <Link href={"/"} className="-m-1.5 p-1.5">
            <Image
              className="h-8 w-auto"
              src="/pépinière.png"
              width={500}
              height={500}
              alt=""
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="py-8">
              {/* Conditionally render user or admin specific links */}
              {role !== "admin" ? (
                <>
                  {/* Links for general users */}
                  <Link
                    className="flex items-center mt-8 p-2 hover:bg-gray-100 rounded transition-all"
                    href={!role ? "/auth/login" : "/user"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IoPersonOutline size={30} />
                    <span className="ml-3 text-lg">Profil</span>
                  </Link>
                  <Link
                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                    href={"/products"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BsShop size={30} />
                    <span className="ml-3 text-lg">Produits</span>
                  </Link>
                  <Link
                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                    href={"/categories"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BsShopWindow size={30} />
                    <span className="ml-3 text-lg">Categories</span>
                  </Link>
                  {role && (
                    <Link
                      className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                      href={"/user/orders"}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <IoTicketOutline size={30} />
                      <span className="ml-3 text-lg">Commandes</span>
                    </Link>
                  )}
                  <Link
                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                    href={"/cart"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IoCartOutline size={30} />
                    {!!totalItems && (
                      <div className="text-amber-600">{totalItems}</div>
                    )}
                    <span className="ml-3 text-lg">Mon Panier</span>
                  </Link>
                </>
              ) : (
                <>
                  {/* Links for admin users */}
                  <Link
                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                    href={"/admin"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IoPersonOutline size={30} />
                    <span className="ml-3 text-lg">Profil</span>
                  </Link>
                  <Link
                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                    href={"/admin/products"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IoShirtOutline size={30} />
                    <span className="ml-3 text-lg">Produits</span>
                  </Link>
                  <Link
                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                    href={"/admin/orders"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IoTicketOutline size={30} />
                    <span className="ml-3 text-lg">Commandes</span>
                  </Link>
                  <Link
                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                    href={"/admin/files"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BsInboxes size={26} />
                    <span className="ml-3 text-lg">Archives</span>
                  </Link>
                  <Link
                    className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                    href={"/admin/users"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IoPeopleOutline size={30} />
                    <span className="ml-3 text-lg">Utilisateurs</span>
                  </Link>
                </>
              )}

              {/* Logout or login button based on user role */}
              {role ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center -mx-3 absolute bottom-6 left-10"
                >
                  <FiLogOut
                    size={50}
                    className="rounded-lg px-3 py-2 text-white bg-amber-400 hover:bg-amber-300"
                  />
                  <p className="flex  ml-3 text-lg">Déconnexion</p>
                </button>
              ) : (
                <Link
                  href={"/auth/login"}
                  className="flex items-center -mx-3 absolute bottom-6 left-10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiLogIn
                    size={50}
                    className="rounded-lg px-3 py-2 text-white bg-green-500 hover:bg-green-400"
                  />
                  <p className="flex  ml-3 text-lg">Se connecter</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
