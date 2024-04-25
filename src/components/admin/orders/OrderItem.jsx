// "use client" ensures that this component only executes on the client-side in Next.js.
"use client";
import Link from "next/link";
import clsx from "clsx"; // A utility for conditionally joining classNames together.

/**
 * Component to render a single order as a table row.
 * Each cell in the row is a clickable link that leads to a detailed view of the order.
 *
 * @param {object} order - The order data passed to the component.
 * @param {string} order.id - Unique identifier for the order.
 * @param {string} order.reference - Order reference number.
 * @param {string} order.created_at - ISO string of order creation date.
 * @param {string} order.last_name - Customer's last name.
 * @param {string} order.first_name - Customer's first name.
 * @param {number} order.total_price - Total price of the order.
 * @param {string} order.status - Current status of the order.
 */
export function OrderItem({
  id,
  reference,
  created_at,
  last_name,
  first_name,
  total_price,
  status,
}) {
  // Convert the ISO string to a JavaScript Date object and format it in French date style.
  const date = new Date(created_at);
  const DDMMYYYY = date.toLocaleDateString("fr-FR");

  // Return a table row with each cell as a clickable link to the order's detail page.
  return (
    <tr className="hover:bg-gray-100 rounded-sm relative">
      {/* Date cell with a link to the order details */}
      <td className="whitespace-nowrap min-w-[10rem] hidden md:inline-block py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/admin/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {DDMMYYYY}
        </Link>
      </td>
      {/* Reference number cell */}
      <td className="whitespace-nowrap hidden md:inline-block py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/admin/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {reference}
        </Link>
      </td>
      {/* Customer name cell */}
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Link
          href={`/admin/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {last_name} {first_name}
        </Link>
      </td>
      {/* Total price cell */}
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Link
          href={`/admin/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {total_price} €
        </Link>
      </td>
      {/* Status cell, which uses clsx to conditionally apply color styles based on the order's status */}
      <td
        className={clsx("whitespace-nowrap px-3 py-4 text-sm font-medium", {
          "text-red-400": status === "annulée", // Red text for cancelled orders
          "text-blue-400": status === "en cours", // Blue text for ongoing orders
          "text-orange-400": status === "validée", // Orange text for validated orders
          "text-green-400": status === "retirée", // Green text for retired orders
        })}
      >
        <Link
          href={`/admin/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {status}
        </Link>
      </td>
    </tr>
  );
}
