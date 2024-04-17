import { Orders, Title } from "@/components";

export const metadata = {
  title: "Commandes",
  description: "Gestion des réservations",
};
export default function Page() {
  return (
    <>
      <Title
        title={metadata.title}
        subtitle={metadata.description}
        className={"text-center"}
      />{" "}
      <Orders />
    </>
  );
}
