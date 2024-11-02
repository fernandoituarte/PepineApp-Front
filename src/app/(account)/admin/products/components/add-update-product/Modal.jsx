"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { resetProductState } from "@/store/reducer/products/product";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";

import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoCheckmarkSharp } from "react-icons/io5";

/**
 * Modal component that displays a confirmation message and an option to accept, which navigates back to the products page.
 * This modal is controlled through Redux state management to dynamically show or hide based on user interactions elsewhere in the application.
 */
export function Modal() {
  const dispatch = useAppDispatch();
  const cancelButtonRef = useRef(null);
  const { status } = useAppSelector((state) => state.product);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (
      status === "Product updated successfully" ||
      status === "The product has been successfully registered."
    ) {
      setIsModal(true);
    }
  }, [status]);

  // Function to close the modal and dispatch an action to update the modal state.
  function handleClose() {
    setIsModal(false);
    dispatch(resetProductState());
  }

  return (
    <Transition show={isModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-400 sm:mx-0 sm:h-10 sm:w-10">
                      <IoCheckmarkSharp
                        className="h-8 w-8 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Votre produit a été enregistré
                      </DialogTitle>
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
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
