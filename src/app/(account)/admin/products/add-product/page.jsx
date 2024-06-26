import { AddProduct, Title } from "@/components";
import { getUserSessionCookieServer } from "@/lib/getUserServerSide";

export const metadata = {
  title: "Ajoutez un produit",
  description: "",
};
export default function Page() {
  const { id } = getUserSessionCookieServer();
  return (
    <>
      <Title
        title={metadata.title}
        subtitle={metadata.description}
        className={"text-center"}
      />
      <AddProduct userId={id} />
    </>
  );
}
