"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAllUsers } from "@/store/reducer/auth/login";
import { UserItem } from "@/components";

export function Users() {
  const { users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {users && users.map((user) => <UserItem key={user.email} {...user} />)}
    </tbody>
  );
}
