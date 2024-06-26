import { UpdateProduct, Title } from "@/components";
import { getUserSessionCookieServer } from "@/lib/getUserServerSide";

export const metadata = {
  title: "Modifiez votre produit",
  description: "",
};
export default async function Page({ params }) {
  const { id } = params;
  const { id: userId } = getUserSessionCookieServer();
  return (
    <>
      <Title
        title={metadata.title}
        subtitle={metadata.description}
        className={"text-center"}
      />
      <UpdateProduct id={id} userId={userId} />
    </>
  );
}
