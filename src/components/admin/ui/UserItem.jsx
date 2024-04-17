"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export const UserItem = (user) => {
  const { first_name, last_name, email, phone, created_at, id } = user;

  const date = new Date(created_at);
  const DDMMYYYY = date.toLocaleDateString("fr-FR");
  return (
    <motion.tr
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="hover:bg-gray-100 rounded-sm relative"
    >
      <td className="whitespace-nowrap min-w-[10rem] py-4 pr-3 text-sm font-medium text-gray-900">
        {first_name} {last_name}
      </td>
      <td className="whitespace-nowrap min-w-[10rem] py-4 pr-3 text-sm font-medium text-gray-900">
        {email}
      </td>
      <td className="whitespace-nowrap min-w-[10rem] py-4 pr-3 text-sm font-medium text-gray-900">
        {phone}
      </td>
      <td className="whitespace-nowrap min-w-[10rem] py-4 pr-3 text-sm font-medium text-gray-900">
        {DDMMYYYY}
      </td>
      <td>
        <Link
          href={`/admin/users/${id}`}
          className="absolute z-5 top-0 bottom-0 right-0 left-0"
        />
      </td>
    </motion.tr>
  );
};
