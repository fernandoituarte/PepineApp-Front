"use client";
import clsx from "clsx";
import { useState } from "react";

export const ChangeStatusButton = ({
  handleStart,
  handleValidate,
  handleFinish,
  handleCancel,
  status,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  console.log(status);
  return (
    <>
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className={clsx(
          "text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center",
          {
            "bg-red-500 hover:bg-red-700": status === "annulée",
          },
          {
            "bg-indigo-500 hover:bg-indigo-700": status === "en cours",
          },
          {
            "bg-green-500 hover:bg-green-700": status === "validée",
          },
          {
            "bg-blue-500 hover:bg-blue-700": status === "retirée",
          },
        )}
        type="button"
        onClick={toggleDropdown}
      >
        <span className="flex-grow text-center">{status}</span>{" "}
        <svg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownDivider"
        className={`absolute z-10 ${
          isOpen ? "" : "hidden"
        } bg-white divide-y divide-gray-100 w-full rounded-lg shadow top-full mt-1`}
      >
        <ul className="py-2 text-sm" aria-labelledby="dropdownDividerButton">
          <li>
            <button
              onClick={handleStart}
              className="block w-full px-4 py-2 hover:bg-gray-100"
            >
              En cours
            </button>
          </li>
          <li>
            <button
              onClick={handleValidate}
              className="block w-full px-4 py-2 hover:bg-gray-100"
            >
              Validée
            </button>
          </li>
          <li>
            <button
              onClick={handleFinish}
              className="block w-full px-4 py-2 hover:bg-gray-100"
            >
              Retirée
            </button>
          </li>
        </ul>
        <div className="py-2">
          <button
            onClick={handleCancel}
            className="block w-full px-4 py-2 text-sm "
          >
            Annulée
          </button>
        </div>
      </div>
    </>
  );
};
