"use client";

import Link from "next/link";

export function ProductItem({
  name,
  id,
  scientific_name,
  pot,
  size,
  stock,
  vat,
  price,
  status,
  category,
}) {
  return (
    <tr key={id} className="hover:bg-slate-100 relative">
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
        <Link
          href={`/admin/products/${id}`}
          className="inline-block w-full h-full"
        >
          {name}
        </Link>
      </td>

      <td className="whitespace-nowrap hidden text-sm text-gray-500 xl:table-cell">
        <Link
          href={`/admin/products/${id}`}
          className="inline-block w-full h-full"
        >
          {category && category[0]}
        </Link>
      </td>

      <td className="whitespace-nowrap hidden text-sm text-gray-500 xl:table-cell">
        <Link
          href={`/admin/products/${id}`}
          className="inline-block w-full h-full"
        >
          {scientific_name}
        </Link>
      </td>

      <td className="whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
        <Link
          href={`/admin/products/${id}`}
          className="inline-block w-full h-full"
        >
          {size}
        </Link>
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Link
          href={`/admin/products/${id}`}
          className="inline-block w-full h-full"
        >
          {pot}
        </Link>
      </td>

      <td
        className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-medium ${
          stock < 5 ? "text-red-400" : "text-green-600"
        }`}
      >
        <Link
          href={`/admin/products/${id}`}
          className="inline-block w-full h-full"
        >
          {stock}
        </Link>
      </td>

      <td className="whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
        <Link
          href={`/admin/products/${id}`}
          className="inline-block w-full h-full"
        >
          {vat} €
        </Link>
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Link
          href={`/admin/products/${id}`}
          className="inline-block w-full h-full"
        >
          {price} €
        </Link>
      </td>

      <td
        className={`whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 font-medium sm:table-cell ${
          status ? "text-green-600" : "text-red-400"
        }`}
      >
        <Link
          href={`/admin/products/${id}`}
          className="inline-block w-full h-full"
        >
          {status ? "en ligne" : "hors ligne"}
        </Link>
      </td>
    </tr>
  );
}
