"use client";
import Link from "next/link";

import { motion } from "framer-motion";

export function OrderItemUser({
  id,
  created_at,
  last_name,
  first_name,
  total_price,
  status,
}) {
  const date = new Date(created_at);
  const DDMMYYYY = date.toLocaleDateString("fr-FR");

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
      className="hover:bg-gray-100 rounded-sm relative"
    >
      <td className="whitespace-nowrap min-w-[10rem] hidden md:inline-block py-4 pr-3 text-sm font-medium text-gray-900">
        {DDMMYYYY}
      </td>
      <td className="whitespace-nowrap hidden md:inline-block py-4 pr-3 text-sm font-medium text-gray-900">
        {id}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {last_name} {first_name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {total_price} €
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {status}
      </td>
      <td>
        <Link
          href={`/user/orders/${id}`}
          className="absolute z-5 top-0 bottom-0 right-0 left-0"
        />
      </td>
    </motion.tr>
  );
}
