import { Title } from "@/components";
import { ChangePassword } from "../../components/change-password/ChangePassword";

export const metadata = {
  title: "Mon Compte",
  description: "Changement de mot de passe",
};

export default async function Page() {
  return (
    <>
      <Title title={"Modifiez votre mot de passe"} className={"text-center"} />
      <ChangePassword />
    </>
  );
}
