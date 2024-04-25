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
      <button className="rounded-md w-[200px] px-3 py-2 text-sm font-semibold text-white shadow-sm bg-orange-500 hover:bg-orange-400">
        Valider
      </button>
    </div>
  );
}
