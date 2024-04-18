"use client";
import Link from "next/link";
import clsx from "clsx";

export function OrderItem(order) {
  const {
    id,
    reference,
    created_at,
    last_name,
    first_name,
    total_price,
    status,
  } = order;
  const date = new Date(created_at);
  const DDMMYYYY = date.toLocaleDateString("fr-FR");

  return (
    <tr className="hover:bg-gray-100 rounded-sm relative">
      <td className="whitespace-nowrap min-w-[10rem] hidden md:inline-block py-4 pr-3 text-sm font-medium text-gray-900">
        {DDMMYYYY}
      </td>
      <td className="whitespace-nowrap hidden md:inline-block py-4 pr-3 text-sm font-medium text-gray-900">
        {reference}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {last_name} {first_name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {total_price} €
      </td>
      <td
        className={clsx(
          "whitespace-nowrap px-3 py-4 text-sm font-medium",
          {
            "text-red-400": status === "annulée",
          },
          {
            "text-blue-400": status === "en cours",
          },
          {
            "text-orange-400": status === "validée",
          },
          {
            "text-green-400": status === "retirée",
          },
        )}
      >
        {status}
      </td>
      <td>
        <Link
          href={`/admin/orders/${id}`}
          className="absolute z-5 top-0 bottom-0 right-0 left-0"
        />
      </td>
    </tr>
  );
}
// className={clsx(
//   "flex items-center gap-x-1 text-lg font-semibold  leading-6 text-gray-600 transform transition-colors duration-300",
//   {
//     "border-b-2 border-b-amber-500": pathname === "/products",
//   },
// )}
