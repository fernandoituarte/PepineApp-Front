import axios from "axios"; // Import axios for making HTTP requests.

// Function to decrement the stock of a specific product by a certain quantity.
export const decrementProductStock = async (id, quantity) => {
  try {
    // Fetch the current details of the product using its ID.
    const response = await axios.get(`/api/products/${id}`);
    const product = response.data.data.product;

    // Check if the product exists and has a defined stock value.
    if (product && product.stock !== undefined) {
      // Calculate the new stock value ensuring it doesn't drop below zero.
      const newStock = Math.max(0, product.stock - quantity);

      // Update the product's stock on the server.
      const updateResponse = await axios.patch(`/api/products/${id}`, {
        stock: newStock,
      });
      return updateResponse;
    } else {
      // Throw an error if the product data is invalid.
      throw new Error("Product not found or stock undefined");
    }
  } catch (error) {
    // Log and re-throw the error for further handling.
    console.error("Error updating product stock:", error);
    throw error;
  }
};

// Function to increment the stock of a specific product by a certain quantity.
export const incrementProductStock = async (id, quantity) => {
  try {
    // Fetch the current details of the product using its ID.
    const response = await axios.get(`/api/products/${id}`);
    const product = response.data.data.product;

    // Check if the product exists and has a defined stock value.
    if (product && product.stock !== undefined) {
      // Calculate the new stock value by adding the quantity.
      const newStock = product.stock + quantity;

      // Update the product's stock on the server.
      const updateResponse = await axios.patch(`/api/products/${id}`, {
        stock: newStock,
      });
      return updateResponse;
    } else {
      // Throw an error if the product data is invalid.
      throw new Error("Product not found or stock undefined");
    }
  } catch (error) {
    // Log and re-throw the error for further handling.
    console.error("Error updating product stock:", error);
    throw error;
  }
};
