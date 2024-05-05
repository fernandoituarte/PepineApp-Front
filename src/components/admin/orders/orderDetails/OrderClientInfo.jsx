// "use client" ensures that this file runs only on the client side in Next.js.
"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { getUserById } from "@/store/reducer/auth/login";

/**
 * Component that displays detailed information about the user associated with an order.
 * It fetches user data on mount and provides functionality to send an email to the user.
 *
 * @param {object} order - Order object containing the user's identifier.
 */
export const OrderClientInfo = ({ order }) => {
  const { user_id } = order;
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  // Convert user's account creation date from ISO string to readable format.
  const date = new Date(user?.created_at);
  const accountCreationTime = date.toLocaleDateString("fr-FR"); // Format date in French date style.

  // Effect hook to fetch user details based on user_id from the order when the component mounts.
  useEffect(() => {
    dispatch(getUserById(user_id));
  }, [dispatch, user_id]);

  // Function to initiate an email to the user using the default mail client.
  const sendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div>
      <p className="font-semibold mb-2 flex justify-between">
        Nom{" "}
        <span className="font-normal">
          {user?.first_name} {user?.last_name}
        </span>
      </p>
      <p className="font-semibold mb-2 flex justify-between">
        Email <span className="font-normal">{user?.email}</span>
      </p>
      <p className="font-semibold mb-2 flex justify-between">
        Téléphone
        <a href={`tel:${user?.phone}`} className="font-normal">
          {user?.phone}
        </a>
      </p>
      <p className="font-semibold mb-2 flex justify-between">
        Client depuis le{" "}
        <span className="font-normal">{accountCreationTime}</span>
      </p>
      <button
        onClick={() => sendEmail(user?.email)}
        className="w-full mt-2 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-400"
      >
        Envoyer un email
      </button>
    </div>
  );
};
