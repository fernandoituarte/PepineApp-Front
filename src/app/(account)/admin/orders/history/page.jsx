import { Title } from "@/components";
import { Orders } from "../components/Orders";

export const metadata = {
  title: "Archives de commandes",
  description: "Vos commandes passées",
};
export default async function Page({ searchParams }) {
  const { limit = 15, offset = 0 } = await searchParams;
  return (
    <>
      <Title
        title={metadata.title}
        subtitle={metadata.description}
        className={"text-center"}
      />{" "}
      <Orders limit={limit} offset={offset} history={true} />
    </>
  );
}
