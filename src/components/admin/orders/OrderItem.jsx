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
        <Link
          href={`/admin/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {DDMMYYYY}
        </Link>
      </td>
      <td className="whitespace-nowrap hidden md:inline-block py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/admin/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {reference}
        </Link>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Link
          href={`/admin/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {last_name} {first_name}
        </Link>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Link
          href={`/admin/orders/${id}`}
          className="inline-block w-full h-full"
        >
          {total_price} €
        </Link>
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
