export const OrderProduct = (product) => {
  const { product_name, product_price, quantity_ordered } = product;
  const subTotal = product_price * quantity_ordered;

  return (
    <tr className="hover:bg-gray-100 rounded-sm">
      <td className="whitespace-nowrap min-w-[10rem] pl-5 md:inline-block py-4 pr-3 text-sm font-medium text-gray-900">
        {product_name}
      </td>
      <td className="whitespace-nowrap md:inline-block py-4 pr-3 text-sm font-medium text-gray-900">
        x{quantity_ordered}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {subTotal} €
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {subTotal} €
      </td>
    </tr>
  );
};
