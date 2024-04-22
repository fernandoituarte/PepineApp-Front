import { Title, UserChangePassword } from "@/components";

export const metadata = {
  title: "Mon Compte",
  description: "Mon Compte",
};
export default function Page() {
  return (
    <div>
      <Title title={"Modifiez votre mot de passe"} className={"text-center"} />
      <UserChangePassword />
    </div>
  );
}
