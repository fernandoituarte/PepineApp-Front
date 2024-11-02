import { AdminProductDetails } from "./components/AdminProductDetails";

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <div className="mx-auto mb-28 max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
      <AdminProductDetails id={id} />
    </div>
  );
}
