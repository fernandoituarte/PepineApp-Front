import { Orders, Title } from "@/components";

export const metadata = {
  title: "Archives de commandes",
  description: "Vos commandes passées",
};
export default function Page() {
  return (
    <>
      <Title
        title={metadata.title}
        subtitle={metadata.description}
        className={"text-center"}
      />{" "}
      <Orders files={true} />
    </>
  );
}
