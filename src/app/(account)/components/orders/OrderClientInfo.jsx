import { SendEmailButton } from "./../SendEmailButton";

/**
 * `OrderClientInfo` displays detailed information about the client who placed the order.
 *
 * Features:
 * - Displays the client's name, email, phone number, and the date they became a client.
 * - Includes a `SendEmailButton` component to allow sending an email directly to the client.
 *
 * Props:
 * - `user`: An object containing client details such as `first_name`, `last_name`, `email`, `phone`, and `createdAt`.
 *
 * Components:
 * - `SendEmailButton`: A button to trigger sending an email to the user's email address.
 *
 * Content:
 * - Client information is formatted with labels ("Nom", "Email", "Téléphone", "Client depuis").
 * - Date is formatted to French ("fr-FR") locale.
 *
 * Interaction:
 * - The phone number is clickable, triggering a phone call using `tel:` link.
 */

export const OrderClientInfo = ({ user }) => {
  const date = new Date(user?.createdAt).toLocaleDateString("fr-FR");

  return (
    <div>
      <p className="font-semibold mb-2 flex justify-between">
        Nom{" "}
        <span className="font-normal">
          {user?.first_name} {user?.last_name}
        </span>
      </p>
      <p className="font-semibold mb-2 flex justify-between">
        Email
        <span className="font-normal">{user?.email}</span>
      </p>
      <p className="font-semibold mb-2 flex justify-between">
        Téléphone
        <a href={`tel:${user?.phone}`} className="font-normal">
          {user?.phone}
        </a>
      </p>
      <p className="font-semibold mb-2 flex justify-between">
        Client depuis le <span className="font-normal">{date}</span>
      </p>
      {user && <SendEmailButton email={user.email} />}
    </div>
  );
};
