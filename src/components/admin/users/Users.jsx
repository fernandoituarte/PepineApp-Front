// Directive to ensure the component only runs on the client side.
"use client";

import { useEffect } from "react"; // React hook for side effects.
import { useAppDispatch, useAppSelector } from "@/hooks/redux"; // Custom hooks for Redux state management.
import { getAllUsers } from "@/store/reducer/auth/login"; // Redux action to fetch all users.
import { UserItem } from "@/components"; // Component that represents a single user row.

/**
 * Users component fetches and displays a list of users.
 * It utilizes Redux for state management and automatically fetches users when the component mounts.
 */
export function Users() {
  const { users } = useAppSelector((state) => state.user); // Access users from Redux state.
  const dispatch = useAppDispatch(); // Get the Redux dispatch function.

  // Effect to fetch all users when the component mounts.
  useEffect(() => {
    dispatch(getAllUsers()); // Dispatch action to load users from backend.
  }, [dispatch]);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {/* Map over the array of users and render a UserItem for each user. */}
      {users && users.map((user) => <UserItem key={user.email} {...user} />)}
    </tbody>
  );
}
