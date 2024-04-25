"use client"; // Ensures this module loads only in the client environment.

import { Fragment, useRef } from "react"; // Import necessary React features.
import { useRouter } from "next/navigation"; // Router for navigation in Next.js applications.

import { useAppSelector, useAppDispatch } from "@/hooks/redux"; // Custom hooks for accessing Redux state and dispatching actions.
import { activeModal } from "@/store/reducer/orders/orders"; // Action to toggle modal visibility.
import { setCartItems } from "@/store/reducer/cart/cart"; // Action to reset the cart items.

import { Dialog, Transition } from "@headlessui/react"; // Import UI components for accessible, unstyled UI.
import { IoCheckmarkSharp } from "react-icons/io5"; // Import an icon for visual elements.

export function ModalCart({ title, subtitle }) {
  const { isModal } = useAppSelector((state) => state.orders); // Retrieve modal state from Redux.
  const dispatch = useAppDispatch(); // Access Redux dispatch function.
  const router = useRouter(); // Router for navigating.
  const cancelButtonRef = useRef(null); // Reference for the cancel button for initial focus.

  function handleClose() {
    dispatch(activeModal(false)); // Dispatch action to hide modal.
    router.push("/products"); // Navigate to the products page.
    setTimeout(() => {
      dispatch(setCartItems([])); // Reset cart items after a slight delay.
    }, 200);
  }

  return (
    <Transition.Root show={isModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20" // Styling for positioning.
        initialFocus={cancelButtonRef} // Initial focus when the dialog opens.
        onClose={handleClose} // Function to call on dialog close.
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" // Enter animation configuration.
          enterFrom="opacity-0" // Start state for enter animation.
          enterTo="opacity-100" // End state for enter animation.
          leave="ease-in duration-200" // Leave animation configuration.
          leaveFrom="opacity-100" // Start state for leave animation.
          leaveTo="opacity-0" // End state for leave animation.
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" // Enter animation for the dialog.
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200" // Leave animation for the dialog.
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
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={handleClose} // Button to accept and close the modal.
                    className="inline-flex w-full justify-center rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"
                  >
                    Accepter
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
