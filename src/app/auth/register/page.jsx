import { Title } from "@/components";
import { Register } from "./components/Register";

export const metadata = {
  title: "Inscrivez vous",
  description: "Créer un compte",
};

export default function Page() {
  return (
    <>
      <Title title={"Inscrivez vous"} className={"text-center"} />
      <Register />
    </>
  );
}
