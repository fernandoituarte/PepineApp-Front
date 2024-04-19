import axios from "axios";

export const decrementProductStock = async (id, quantity) => {
  try {
    const response = await axios.get(`/api/products/${id}`);
    const product = response.data.data.product;

    if (product && product.stock !== undefined) {
      const newStock = Math.max(0, product.stock - quantity);

      const updateResponse = await axios.patch(`/api/products/${id}`, {
        stock: newStock,
      });
      return updateResponse;
    } else {
      console.log(error);
      throw new Error("Product not found or stock undefined");
    }
  } catch (error) {
    console.error("Error updating product stock:", error);
    throw error;
  }
};

export const incrementProductStock = async (id, quantity) => {
  try {
    const response = await axios.get(`/api/products/${id}`);
    const product = response.data.data.product;

    if (product && product.stock !== undefined) {
      const newStock = Math.max(0, product.stock - quantity);

      const updateResponse = await axios.patch(`/api/products/${id}`, {
        stock: newStock,
      });
      return updateResponse;
    } else {
      console.log(error);
      throw new Error("Product not found or stock undefined");
    }
  } catch (error) {
    console.error("Error updating product stock:", error);
    throw error;
  }
};
