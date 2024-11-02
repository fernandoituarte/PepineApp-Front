export function QtyBtn({ onIncrease, onDecrease, qty }) {
  // onIncrease - a function to be called when increasing the quantity.
  // onDecrease - a function to be called when decreasing the quantity.
  // qty - the current quantity of the item.

  return (
    <div className="flex justify-between border rounded-sm w-20 py-2 px-2 md:ml-2">
      {/* Button to decrease the quantity. It triggers the onDecrease function passed as a prop. */}
      <button
        className="text-gray-400 font-semibold"
        type="button"
        onClick={onDecrease}
      >
        -
      </button>
      {/* Display the current quantity. */}
      <p>{qty}</p>

      {/* Button to increase the quantity. It triggers the onIncrease function passed as a prop. */}
      <button
        className="text-gray-400 font-semibold"
        type="button"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
}
