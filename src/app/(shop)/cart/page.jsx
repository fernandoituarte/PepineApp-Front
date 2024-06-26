import { Cart, Title } from "@/components";
import { getUserSessionCookieServer } from "@/lib/getUserServerSide";

export const metadata = {
  title: "Votre panier",
  description: "Articles dans votre panier",
};
export default function Page() {
  const user = getUserSessionCookieServer();
  return (
    <>
      <Title title={metadata.title} className={"text-center"} />
      <Cart id={user?.id} role={user?.role} />
    </>
  );
}
