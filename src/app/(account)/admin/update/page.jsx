import { Title, UserUpdate } from "@/components";
import { getUserSessionCookieServer } from "@/lib/getUserServerSide";

export const metadata = {
  title: "Mon Compte",
  description: "Mon Compte",
};
export default async function Page() {
  const { id, role } = getUserSessionCookieServer();

  return (
    <div>
      <Title title={"Modifiez votre compte"} className={"text-center"} />
      <UserUpdate id={id} role={role} />
    </div>
  );
}
