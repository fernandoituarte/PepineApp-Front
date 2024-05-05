/**
 * Component to display product details in an order summary.
 * It shows the product name, quantity ordered, and subtotal price.
 *
 * @param {object} product - Product data including name, price, and quantity.
 * @param {string} product.product_name - Name of the product.
 * @param {number} product.product_price - Price of one unit of the product.
 * @param {number} product.quantity_ordered - Quantity of the product ordered.
 */
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
