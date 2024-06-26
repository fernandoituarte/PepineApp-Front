"use client";
import { UserItem } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { getAllUsers } from "@/store/reducer/auth/login";

export function Users() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {/* Map over the array of users and render a UserItem for each user. */}
      {users && users.map((user) => <UserItem key={user.email} {...user} />)}
    </tbody>
  );
}
