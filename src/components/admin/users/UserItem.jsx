import Link from "next/link";

export const UserItem = (user) => {
  // Destructuring user details from the user object.
  const { first_name, last_name, email, phone, created_at, id } = user;

  // Formatting the date to a local string.
  const date = new Date(created_at);
  const DDMMYYYY = date.toLocaleDateString("fr-FR");

  return (
    <tr className="hover:bg-gray-100 rounded-sm relative">
      {/* User name cell with link to user's details page */}
      <td className="whitespace-nowrap min-w-[10rem] py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/admin/users/${id}`}
          className="inline-block w-full h-full"
        >
          {first_name} {last_name}
        </Link>
      </td>

      {/* User email cell with link to user's details page */}
      <td className="whitespace-nowrap min-w-[10rem] py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/admin/users/${id}`}
          className="inline-block w-full h-full"
        >
          {email}
        </Link>
      </td>

      {/* User phone cell with link to user's details page */}
      <td className="whitespace-nowrap min-w-[10rem] py-4 pr-3 text-sm font-medium text-gray-900">
        <Link
          href={`/admin/users/${id}`}
          className="inline-block w-full h-full"
        >
          {phone}
        </Link>
      </td>

      {/* User registration date cell with link to user's details page */}
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
