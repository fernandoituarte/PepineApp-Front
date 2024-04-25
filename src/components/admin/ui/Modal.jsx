// Directive to ensure this component only runs on the client side in a Next.js environment.
"use client";

import { Fragment, useRef } from "react";
import Link from "next/link"; // Used for navigation within the app.

import { useAppSelector, useAppDispatch } from "@/hooks/redux"; // Hooks for accessing Redux state and dispatching Redux actions.
import { activeModal } from "@/store/reducer/products/update-categories/productCategories"; // Redux action for managing modal state.

import { Dialog, Transition } from "@headlessui/react"; // Components from Headless UI for building accessible UI elements.
import { IoCheckmarkSharp } from "react-icons/io5"; // Icon for visual feedback.

/**
 * Modal component that displays a confirmation message and an option to accept, which navigates back to the products page.
 * This modal is controlled through Redux state management to dynamically show or hide based on user interactions elsewhere in the application.
 */
export function Modal() {
  const { isModal } = useAppSelector((state) => state.productCategories); // Accesses modal visibility state from Redux.
  const dispatch = useAppDispatch(); // Hook to dispatch actions.
  const cancelButtonRef = useRef(null); // Ref for an element that should gain focus when the modal opens.

  // Function to close the modal and dispatch an action to update the modal state.
  function handleClose() {
    dispatch(activeModal(false));
  }

  return (
    <Transition.Root show={isModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        initialFocus={cancelButtonRef} // Focus the cancel button when the modal opens.
        onClose={handleClose} // Handle close when the overlay or escape key is used.
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" // Transition for entering the modal.
          enterFrom="opacity-0" // Start with fully transparent.
          enterTo="opacity-100" // End with fully opaque.
          leave="ease-in duration-200" // Transition for leaving the modal.
          leaveFrom="opacity-100" // Start with fully opaque.
          leaveTo="opacity-0" // End with fully transparent.
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" // More detailed transition for the modal dialog.
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-400 sm:mx-0 sm:h-10 sm:w-10">
                      <IoCheckmarkSharp
                        className="h-8 w-8 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Votre produit a été enregistré
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Link
                    href={"/admin/products"}
                    onClick={handleClose}
                    className="inline-flex w-full justify-center rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"
                  >
                    Accepter
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
