"use client";
import Link from "next/link";
export const UserItem = (user) => {
  const { first_name, last_name, email, phone, created_at, id } = user;

  const date = new Date(created_at);
  const DDMMYYYY = date.toLocaleDateString("fr-FR");
  return (
    <tr className="hover:bg-gray-100 rounded-sm relative">
      <td className="whitespace-nowrap min-w-[10rem] py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/admin/users/${id}`}
          className="inline-block w-full h-full"
        >
          {first_name} {last_name}
        </Link>
      </td>
      <td className="whitespace-nowrap min-w-[10rem] py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/admin/users/${id}`}
          className="inline-block w-full h-full"
        >
          {email}
        </Link>
      </td>
      <td className="whitespace-nowrap min-w-[10rem] py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/admin/users/${id}`}
          className="inline-block w-full h-full"
        >
          {phone}
        </Link>
      </td>
      <td className="whitespace-nowrap min-w-[10rem] py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/admin/users/${id}`}
          className="inline-block w-full h-full"
        >
          {DDMMYYYY}
        </Link>
      </td>
    </tr>
  );
};
