// "use client" is used to ensure this component only runs on the client side in Next.js applications.
"use client";
import Link from "next/link";

/**
 * Renders a single order item in a table row format.
 * Displays formatted date, order reference, customer name, total price, and status.
 * Provides a clickable area to navigate to detailed order view.
 *
 * @param {object} props Component props
 * @param {number} props.id Unique identifier for the order
 * @param {string} props.reference Order reference number
 * @param {string} props.created_at ISO date string when the order was created
 * @param {string} props.last_name Customer's last name
 * @param {string} props.first_name Customer's first name
 * @param {number} props.total_price Total price of the order
 * @param {string} props.status Current status of the order
 */
export function OrderItemUser({
  id,
  reference,
  created_at,
  last_name,
  first_name,
  total_price,
  status,
}) {
  const date = new Date(created_at);
  const localDateOfOrder = date.toLocaleDateString("fr-FR");

  return (
    <tr className="hover:bg-gray-100 rounded-sm relative">
      <td className="whitespace-nowrap min-w-[10rem] hidden md:inline-block py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/user/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {localDateOfOrder}
        </Link>
      </td>
      <td className="whitespace-nowrap hidden md:inline-block py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/user/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {reference}
        </Link>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Link
          href={`/user/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {last_name} {first_name}
        </Link>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Link
          href={`/user/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {total_price} €
        </Link>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Link
          href={`/user/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {status}
        </Link>
      </td>
    </tr>
  );
}
