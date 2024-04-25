// Ensures the component runs only on the client-side in a Next.js application.
"use client";
import clsx from "clsx"; // A utility for conditionally joining classNames together.
import { useState } from "react"; // React hook for state management.

/**
 * Component that renders a dropdown button to change the status of an item.
 * The button's background color changes according to the item's current status.
 *
 * @param {Object} props - Component props
 * @param {Function} props.handleStart - Function to handle the 'en cours' status action.
 * @param {Function} props.handleValidate - Function to handle the 'validée' status action.
 * @param {Function} props.handleFinish - Function to handle the 'retirée' status action.
 * @param {Function} props.handleCancel - Function to handle the 'annulée' status action.
 * @param {string} props.status - Current status of the item.
 */
export const ChangeStatusButton = ({
  handleStart,
  handleValidate,
  handleFinish,
  handleCancel,
  status,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility.

  // Function to toggle dropdown visibility.
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className={clsx(
          "text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center",
          {
            "bg-red-500 hover:bg-red-700": status === "annulée", // Red theme for 'annulée' status.
          },
          {
            "bg-indigo-500 hover:bg-indigo-700": status === "en cours", // Indigo theme for 'en cours' status.
          },
          {
            "bg-green-500 hover:bg-green-700": status === "validée", // Green theme for 'validée' status.
          },
          {
            "bg-blue-500 hover:bg-blue-700": status === "retirée", // Blue theme for 'retirée' status.
          },
        )}
        type="button"
        onClick={toggleDropdown} // Handler for opening/closing the dropdown.
      >
        <span className="flex-grow text-center">{status}</span>{" "}
        {/* Display current status */}
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
        </svg>{" "}
        {/* Down arrow icon indicating a dropdown */}
      </button>

      {/* Dropdown menu for changing the status, shown or hidden based on `isOpen` state. */}
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
              En cours {/* Option to change status to 'En cours' */}
            </button>
          </li>
          <li>
            <button
              onClick={handleValidate}
              className="block w-full px-4 py-2 hover:bg-gray-100"
            >
              Validée {/* Option to change status to 'Validée' */}
            </button>
          </li>
          <li>
            <button
              onClick={handleFinish}
              className="block w-full px-4 py-2 hover:bg-gray-100"
            >
              Retirée {/* Option to change status to 'Retirée' */}
            </button>
          </li>
        </ul>
        <div className="py-2">
          <button
            onClick={handleCancel}
            className="block w-full px-4 py-2 text-sm "
          >
            Annulée {/* Option to change status to 'Annulée' */}
          </button>
        </div>
      </div>
    </>
  );
};
