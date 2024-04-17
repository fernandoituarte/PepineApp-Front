import { Title, UserUpdate } from "@/components";

export const metadata = {
  title: "Mon Compte",
  description: "Mon Compte",
};
export default function Page() {
  return (
    <div>
      <Title title={"Modifiez votre compte"} className={"text-center"} />
      <UserUpdate />
    </div>
  );
}
