/**
 * The `ButtonsForm` component renders two buttons: one for cancelling the form action and another for submitting it.
 *
 * Props:
 * - `handleCancel`: A function that is called when the cancel button is clicked.
 *
 * Features:
 * - "Annuler" button: Cancels the current operation and triggers the `handleCancel` function when clicked.
 * - "Valider" button: Submits the form when clicked.
 *
 * Both buttons are styled with rounded corners, padding, and hover effects for better user interaction.
 */

export function ButtonsForm({ handleCancel }) {
  return (
    <div className="mt-6 flex items-center justify-around gap-x-6">
      <button
        type="button"
        onClick={handleCancel}
        className="rounded-md w-[200px] px-3 py-2 text-sm font-semibold border hover:text-white shadow-sm hover:bg-red-400"
      >
        Annuler
      </button>
      <button className="rounded-md w-[200px] px-3 py-2 text-sm font-semibold text-white shadow-sm bg-[#af5f02] hover:bg-[#af5e0286]">
        Valider
      </button>
    </div>
  );
}
