import { AddProduct, Title } from "@/components";

export const metadata = {
  title: "Ajoutez un produit",
  description: "",
};
export default function Page() {
  return (
    <>
      <Title
        title={metadata.title}
        subtitle={metadata.description}
        className={"text-center"}
      />
      <AddProduct />
    </>
  );
}
