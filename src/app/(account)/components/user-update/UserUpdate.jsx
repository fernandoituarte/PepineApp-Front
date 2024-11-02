"use client";

import Link from "next/link";

import { Message } from "@/components";
import { InputFieldAdmin } from "./InputFieldAdmin";
import { useUpdateUserInfo } from "@/hooks/useUpdateUserInfo";
import MoonLoader from "react-spinners/MoonLoader";

/**
 * The `UserUpdate` component enables users to update their personal information
 * and provides feedback on the update status.
 *
 * Features:
 * - Displays a form for updating first name, last name, email, and phone number.
 * - Uses a custom hook for form submission, input registration, and error handling.
 * - Shows success or error messages based on the update outcome.
 * - Includes a password change link based on the user's role (admin or user).
 * - Provides buttons for submitting or canceling the operation, directing users back
 *   to their dashboards.
 *
 * State Management:
 * - `onSubmit`: Handles form submission.
 * - `errors`: Contains validation error messages.
 * - `showMessage`: Indicates if a success message is shown.
 * - `showErrorMessage`: Indicates if an error message is shown.
 * - `register`: Registers input fields for validation.
 * - `user`: Contains the current user's information and role.
 */

export const UserUpdate = () => {
  const {
    onSubmit,
    errors,
    loading,
    showMessage,
    errorMessage,
    register,
    user,
  } = useUpdateUserInfo();

  return (
    <form
      onSubmit={onSubmit}
      className="mx-2 sm:w-4/5 md:w-2/3 sm:mx-auto mt-12 border rounded-lg p-6"
    >
      {showMessage && (
        <Message
          title={"Informations mises à jour: "}
          className={"bg-green-100 border border-green-300 text-green-600 mb-5"}
          text={"Vos informations ont étés mises à jour"}
        />
      )}
      {errorMessage && (
        <Message
          title={"Erreur de mise à jour: "}
          className={"bg-red-100 border border-red-300 text-red-600 mb-5"}
          text={errorMessage}
        />
      )}
      <InputFieldAdmin
        label="Prénom"
        placeholder="Prénom"
        register={register}
        name="first_name"
        errors={errors}
      />
      <InputFieldAdmin
        label="Nom"
        placeholder="Nom"
        register={register}
        name="last_name"
        errors={errors}
      />
      <InputFieldAdmin
        label="Email"
        placeholder="Email"
        register={register}
        name="email"
        errors={errors}
      />
      <InputFieldAdmin
        label="Téléphone"
        placeholder="Phone"
        register={register}
        name="phone"
        errors={errors}
      />
      {/* Line Separator */}
      <div className="w-full h-px bg-gray-200 my-10" />

      <Link
        href={
          user?.role === "admin"
            ? "/admin/change-password"
            : "/user/change-password"
        }
        className="font-semibold mb-1 text-[#be5555]"
      >
        Modifier mon mot de passe{" "}
      </Link>
      <div className="flex flex-col mt-8 sm:flex-row justify-around">
        <button
          type="submit"
          className="inline-flex items-center justify-center w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased bg-[#5e60e4] hover:bg-[#5e60e485] text-white rounded-lg"
        >
          {loading ? (
            <MoonLoader color="#ffffff" size={20} speedMultiplier={0.4} />
          ) : (
            <span className="flex-grow text-center"> Valider </span>
          )}{" "}
        </button>
        <Link
          href={user?.role === "admin" ? "/admin" : "/user"}
          className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 antialiased text-white bg-[#be5555] rounded-lg hover:bg-[#be55557e] text-center"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
};
