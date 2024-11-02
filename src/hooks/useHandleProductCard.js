import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";

/* Custom hook to handle product card logic based on product, category, and pathname **/

export const useHandleProductCard = (product, category, pathname) => {
  const { id, name, media, price, stock, status } = product;

  // Prepare an item object with key product details to simplify adding it to the cart
  const item = {
    id,
    name,
    media: media[0] ? media[0].url : "",
    price,
    stock,
    status,
  };

  // Get authentication status and user information from Redux
  const { status: statusAuth, user } = useAppSelector((state) => state.auth);

  const [role, setRole] = useState();

  // Set the user's role when user data changes, useful for conditional URL handling
  useEffect(() => {
    if (user) setRole(user.role);
  }, [user]);

  // If user logs out, reset role to null
  useEffect(() => {
    if (statusAuth === "loggedOut") {
      setRole(null);
    }
  }, [statusAuth]);

  // Determine the product URL based on user role and current path (admin vs. regular user view)
  const url =
    pathname === `/categories/${category}`
      ? role === "admin"
        ? `/admin/products/${id}`
        : `/products/${id}`
      : role === "admin"
      ? `/admin/products/${id}`
      : `/products/${id}`;

  return { item, role, url };
};
