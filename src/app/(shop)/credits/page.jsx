import Link from "next/link";
import { Title } from "@/components";

const URL_FRONT = process.env.NEXT_PUBLIC_URL_FRONT;

export const metadata = {
  title: "Credits",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur possimus recusandae? Iusto saepe quas eligendi. Corporis atque ipsam exercitationem quaerat velit?",
  alternates: {
    canonical: `${URL_FRONT}/credits`,
  },
};

export default function Credits() {
  return (
    <article className="w-2/3 m-auto text-center my-20">
      <Title title={metadata.title} className={"text-center"} />
      <section>
        <h2 className="font-bold leading-6 my-6">Merci aux créateurs</h2>
        <p>
          <Link href="https://fr.freepik.com">
            Illustration home page : vecstock
          </Link>{" "}
          sur Freepik
        </p>
      </section>
    </article>
  );
}
