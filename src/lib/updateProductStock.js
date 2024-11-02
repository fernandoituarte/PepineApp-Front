"use client";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

// Function to decrement the stock of a specific product by a certain quantity.
export const decrementProductStock = async (id, quantity) => {
  try {
    // Fetch the current details of the product using its ID.
    const response = await axios.get(`${URL}/products/${id}`);
    const product = response.data.product;

    // Check if the product exists and has a defined stock value.
    if (product && product.stock !== undefined) {
      const newStock = Math.max(0, product.stock - quantity);

      const updateResponse = await axios.patch(
        `${URL}/products/${id}`,
        {
          stock: newStock,
        },
        { withCredentials: true },
      );

      return updateResponse;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// Function to increment the stock of a specific product by a certain quantity.
export const incrementProductStock = async (id, quantity) => {
  try {
    // Fetch the current details of the product using its ID.
    const response = await axios.get(`${URL}/products/${id}`);
    const product = response.data.product;

    // Check if the product exists and has a defined stock value.
    if (product && product.stock !== undefined) {
      const newStock = product.stock + quantity;

      const updateResponse = await axios.patch(
        `${URL}/products/${id}`,
        {
          stock: newStock,
        },
        { withCredentials: true },
      );

      return updateResponse;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
