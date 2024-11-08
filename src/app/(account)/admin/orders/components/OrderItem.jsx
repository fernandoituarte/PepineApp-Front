import Link from "next/link";
import clsx from "clsx";

export function OrderItem({
  id,
  createdAt,
  user,
  total_price,
  status,
  reference,
}) {
  const date = new Date(createdAt).toLocaleDateString("fr-FR");

  // Return a table row with each cell as a clickable link to the order's detail page.
  return (
    <tr className="hover:bg-gray-100 rounded-sm relative">
      {/* Date cell with a link to the order details */}
      <td className="whitespace-nowrap min-w-[10rem] hidden md:inline-block py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/admin/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {date}
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
          {user.last_name} {user.first_name}
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
          "text-red-600": status === "annulée",
          "text-blue-600": status === "en cours",
          "text-orange-600": status === "validée",
          "text-green-600": status === "retirée",
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
