/**
 * `OrderProduct` displays information about a specific product in an order.
 *
 * Features:
 * - Shows the product name, the quantity ordered, and the subtotal for that product.
 *
 * Props:
 * - `price_time_order`: The price of the product at the time the order was placed.
 * - `quantity`: The quantity of the product ordered.
 * - `product`: The product object, which contains information such as `name`.
 */

export const OrderProduct = ({ price_time_order, quantity, product }) => {
  const subTotal = price_time_order * quantity;

  return (
    <tr className="hover:bg-gray-100 rounded-sm">
      <td className="pl-5 py-4 pr-3 text-sm font-medium text-gray-900">
        {product.name}
      </td>
      <td className="py-4 pr-3 text-sm font-medium text-gray-900">
        x{quantity}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500">
        {subTotal.toFixed(2)} €
      </td>
    </tr>
  );
};
