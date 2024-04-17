import { Title, Order } from "@/components";

export const metadata = {
  title: "Order",
  description: "Order",
};

export default async function Page({ params }) {
  return (
    <div className="px-6 sm:px-6 lg:px-8">
      <Title title={`Commande #${params.id}`} className={"text-center"} />
      <div className="lg:mx-auto xl:grid xl:grid-cols-3 xl:grid-row-6 gap-y-5 xl:gap-4 xl:max-h-[700px] xl:max-w-[1000px]">
        <Order id={params.id} />
      </div>
    </div>
  );
}
