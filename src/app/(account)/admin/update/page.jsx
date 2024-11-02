import { Title } from "@/components";
import { UserUpdate } from "../../components/user-update/UserUpdate";

export const metadata = {
  title: "Mon Compte",
  description: "Mon Compte",
};
export default async function Page() {
  return (
    <div>
      <Title title={"Modifiez votre compte"} className={"text-center"} />
      <UserUpdate />
    </div>
  );
}
