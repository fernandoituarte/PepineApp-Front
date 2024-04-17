import { ClientInfo, Title } from "@/components";

export const metadata = {
  title: "User",
  description: "Gestion des Clients",
};
export default function Page({ params }) {
  const { id } = params;
  return (
    <>
      <Title title={`Info du client #${id}`} className={"text-center"} />
      <ClientInfo id={id} />
    </>
  );
}
