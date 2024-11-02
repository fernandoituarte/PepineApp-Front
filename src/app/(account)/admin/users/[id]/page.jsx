import { ClientInfo } from "./components/ClientInfo";

export const metadata = {
  title: "User",
  description: "Gestion des Clients",
};
export default async function Page({ params }) {
  const { id } = await params;

  return (
    <>
      <ClientInfo id={id} />
    </>
  );
}
