import { Title } from "@/components";
import { Products, AddProductFloating } from "./components";

export const metadata = {
  title: "Vos produits",
  description: "Vos produits",
};
export default async function Page({ searchParams }) {
  const { limit = 15, offset = 0 } = await searchParams;

  return (
    <>
      <Title title={"Liste des produits"} className={"text-center"} />
      <div className="lg:px-8">
        <div className="mt-12 flow-root m-auto">
          <div className="px-5 -mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <Products limit={limit} offset={offset} />
            {/* Floating action button for adding a new product, with an icon from react-icons. */}
            <AddProductFloating />
          </div>
        </div>
      </div>
    </>
  );
}
