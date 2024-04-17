import { Categories, Title } from "@/components";

export const metadata = {
  title: "Categories",
  description:
    "Découvrez notre sélection de produits de qualité répartis dans quatre catégories distinctes.",
};
export default function Page() {
  return (
    <>
      <Title
        title={metadata.title}
        subtitle={metadata.description}
        className={"text-center"}
      />
      <Categories />
    </>
  );
}
