import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${URL}/products/${id}`);

    return response.data;
  } catch (error) {
    return { error: error.response.data };
  }
};

export const getAllProducts = async ({ limit = 16, offset = 0 }) => {
  try {
    const response = await axios.get(
      `${URL}/products?limit=${limit}&offset=${offset}`,
    );
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};

export const getProductsByCategory = async ({ id, limit = 16, offset = 0 }) => {
  try {
    const response = await axios.get(
      `${URL}/categories/${id}/products?limit=${limit}&offset=${offset}`,
    );
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};
