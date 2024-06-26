import { Title, UserChangePassword } from "@/components";

export const metadata = {
  title: "Mon Compte",
  description: "Changement de mot de passe",
};
export default async function Page() {
  return (
    <div>
      <Title title={"Modifiez votre mot de passe"} className={"text-center"} />
      <UserChangePassword />
    </div>
  );
}
