import { UpdateProduct, Title } from "@/components";

export const metadata = {
  title: "Modifiez votre produit",
  description: "",
};
export default function Page({ params }) {
  const { id } = params;
  return (
    <>
      <Title
        title={metadata.title}
        subtitle={metadata.description}
        className={"text-center"}
      />
      <UpdateProduct id={id} />
    </>
  );
}
