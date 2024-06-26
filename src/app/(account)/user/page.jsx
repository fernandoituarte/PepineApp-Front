import { Title, UserInfo } from "@/components";
import { getUserSessionCookieServer } from "@/lib/getUserServerSide";

export const metadata = {
  title: "Mon Compte",
  description: "Mon Compte",
};
export default function Page() {
  const { id, role } = getUserSessionCookieServer();
  return (
    <div>
      <Title
        title={"Paramètres du compte"}
        subtitle={`Bonjour, cette page permet de modifier vos données.`}
        className={"text-center"}
      />
      <UserInfo id={id} role={role} />
    </div>
  );
}
