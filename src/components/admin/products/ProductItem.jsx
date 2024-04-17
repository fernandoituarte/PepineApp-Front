"use client";

import Link from "next/link";

import { motion } from "framer-motion";

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
    <motion.tr
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      key={id}
      className="hover:bg-slate-100 relative"
    >
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
        {name}
      </td>

      <td className="whitespace-nowrap hidden text-sm text-gray-500 xl:table-cell">
        {category && category[0]}
      </td>

      <td className="whitespace-nowrap hidden text-sm text-gray-500 xl:table-cell">
        {scientific_name}
      </td>

      <td className="whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
        {size}
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {pot}
      </td>

      <td
        className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-medium ${
          stock < 5 ? "text-red-400" : "text-green-600"
        }`}
      >
        {stock}
      </td>

      <td className="whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
        {vat} €
      </td>

      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {price} €
      </td>

      <td
        className={`whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 font-medium sm:table-cell ${
          status ? "text-green-600" : "text-red-400"
        }`}
      >
        {status ? "en ligne" : "hors ligne"}
      </td>
      <td>
        <Link
          href={`/admin/products/${id}`}
          className="absolute z-5 top-0 bottom-0 right-0 left-0"
        />
      </td>
    </motion.tr>
  );
}
