import { Register, Title } from "@/components";

export const metadata = {
  title: "Inscrivez vous",
  description: "Créer un compte",
};
// Register form
export default function Page() {
  return (
    <>
      <Title title={"Inscrivez vous"} className={"text-center"} />
      <Register />
    </>
  );
}
