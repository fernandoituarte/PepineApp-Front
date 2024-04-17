import { Title, UserInfo } from "@/components";

export const metadata = {
  title: "Mon Compte",
  description: "Mon Compte",
};

export default function Page() {
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
