import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

export const getCategories = async () => {
  try {
    const response = await axios.get(`${URL}/categories`);

    return response.data;
  } catch (error) {
    return { error: error.response.data };
  }
};
