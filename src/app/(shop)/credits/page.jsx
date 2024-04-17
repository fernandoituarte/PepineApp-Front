import Link from "next/link";
import { Title } from "@/components";

export const metadata = {
  title: "Credits",
  description: "...",
};

export default function credits() {
  return (
    <div className="w-2/3 m-auto text-center my-20">
      <Title title={metadata.title} className={"text-center"} />
      <h2 className="font-bold leading-6 my-6">Merci aux créateurs</h2>
      <Link href="https://fr.freepik.com/photos-gratuite/nouvelle-vie-emerge-dans-ia-generative-du-printemps-humide_40933359.htm#query=growing&position=0&from_view=search&track=sph">
        Illustration home page : vecstock
      </Link>{" "}
      sur Freepik
    </div>
  );
}
