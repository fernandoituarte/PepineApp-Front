import { Title } from "@/components";
import { UserInfo } from "./../components/UserInfo";

export const metadata = {
  title: "Mon Compte",
  description: "Mon Compte",
};
export default async function Page() {
  return (
    <div>
      <Title
        title={"Paramètres du compte"}
        subtitle={`Bonjour, cette page permet de modifier vos données.`}
        className={"text-center"}
      />
      <UserInfo />
    </div>
  );
}
