import { Order } from "../../../components/orders";
export const metadata = {
  title: "Order",
  description: "Order",
};

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <div className="px-6 sm:px-6 lg:px-8">
      <Order id={id} />
    </div>
  );
}
