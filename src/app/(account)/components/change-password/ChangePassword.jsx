"use client";
import { Message } from "@/components";
import { useUpdateUserPassword } from "@/hooks/useUpdateUserPassword";
import MoonLoader from "react-spinners/MoonLoader";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

/**
 * `ChangePassword` component allows users to update their password.
 *
 * Features:
 * - Displays success or error messages after form submission.
 * - Form fields for old password, new password, and password confirmation with validation.
 * - Option to toggle visibility for the new password.
 * - Shows loading spinner during form submission.
 * - Buttons to submit the form or cancel the operation.
 *
 * Hooks:
 * - `useUpdateUserPassword`: Handles form submission, validation, and routing.
 *
 * State Management:
 * - `showMessage`, `showErrorMessage`: Toggles success or error messages.
 * - `showPassword`: Controls the visibility of the new password.
 * - `loading`: Displays loading spinner during the submission.
 */

export const ChangePassword = () => {
  const {
    onSubmit,
    showMessage,
    errorMessage,
    register,
    errors,
    showPassword,
    setShowPassword,
    router,
    loading,
  } = useUpdateUserPassword();

  return (
    <form
      onSubmit={onSubmit}
      className="mx-2 sm:w-4/5 md:w-2/3 sm:mx-auto mt-7 border rounded-lg p-6"
    >
      {/* Error/Success message */}
      {showMessage && (
        <Message
          title={"Mot de passe mise à jour :"}
          className={"bg-green-50 text-green-700 mb-5"}
          text={"Vos informations ont été mises à jour."}
        />
      )}
      {errorMessage && (
        <Message
          title={"Erreur de mise à jour :"}
          className={"bg-red-50 text-red-700 mb-5"}
          text={errorMessage}
        />
      )}

      {/* Form sections for old password, new password, and password confirmation with validation feedback. */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between mb-6">
        <label className="font-semibold mb-1">Ancien mot de passe:</label>
        <div className="flex flex-col sm:w-1/2">
          <input
            type="password"
            {...register("oldPassword")}
            className="font-normal border rounded-md h-10 px-2"
            placeholder="Entrez l'ancien mot de passe"
          />
          {errors.oldPassword && (
            <p className="ml-2 text-red-500 text-sm">
              {errors.oldPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Input for new password with a toggle to show/hide the password. */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between mb-6">
        <label className="font-semibold mb-1">Nouveau mot de passe:</label>
        <div className="relative flex flex-col sm:w-1/2">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="font-normal border rounded-md h-10 pl-2 pr-10"
            placeholder="Entrez le nouveau mot de passe"
          />
          <div
            className="absolute top-2 right-0 flex pr-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <IoEyeOffOutline size={25} />
            ) : (
              <IoEyeOutline size={25} />
            )}
          </div>
          {errors.password && (
            <p className="ml-2 text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {/* Input for confirming the new password. */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between mb-6">
        <label className="font-semibold mb-1">Confirmez le mot de passe:</label>
        <div className="flex flex-col sm:w-1/2">
          <input
            type="password"
            {...register("confirmPassword")}
            className="font-normal border rounded-md h-10 px-2"
            placeholder="Confirmez le mot de passe"
          />
          {errors.confirmPassword && (
            <p className="ml-2 text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Submission and cancel buttons. */}
      <div className="flex flex-col mt-8 sm:flex-row justify-around">
        <button
          type="submit"
          className="inline-flex items-center justify-center w-[300px] sm:w-[200px] mx-auto mt-3 py-2 bg-[#5e60e4] hover:bg-[#5e60e485] text-white rounded-lg"
        >
          {loading ? (
            <MoonLoader color="#ffffff" size={20} speedMultiplier={0.4} />
          ) : (
            "Valider"
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="w-[300px] sm:w-[200px] mx-auto mt-3 py-2 bg-[#be5555] hover:bg-[#be55557e] text-white rounded-lg"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};
