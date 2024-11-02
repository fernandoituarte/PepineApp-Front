import { Title } from "@/components";
import { Users } from "./components/Users";

export const metadata = {
  title: "Utilisateurs",
  description: "Gerez vos utilisateurs",
};

export default async function Page({ searchParams }) {
  const { limit = 15, offset = 0 } = await searchParams;
  return (
    <div className="px-6 sm:px-6 lg:px-8">
      <Title title={metadata.title} className={"text-center"} />
      <Users limit={limit} offset={offset} />
    </div>
  );
}
