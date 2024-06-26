export const OrderProduct = ({
  product_name,
  product_price,
  quantity_ordered,
}) => {
  // Calculate the subtotal for the product by multiplying the price by the quantity ordered.
  const subTotal = product_price * quantity_ordered;

  return (
    <tr className="hover:bg-gray-100 rounded-sm">
      <td className="pl-5 py-4 pr-3 text-sm font-medium text-gray-900">
        {product_name}
      </td>
      <td className="py-4 pr-3 text-sm font-medium text-gray-900">
        x{quantity_ordered}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500">
        {subTotal.toFixed(2)} €
      </td>
    </tr>
  );
};
