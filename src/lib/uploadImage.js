"use server";
import axios from "axios";
import { cookies } from "next/headers";

const URL = process.env.NEXT_PUBLIC_URL;

export async function imageHandler(formData) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken");
  const token = authToken.value;

  try {
    const response = await axios.post(`${URL}/products/media`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.m;
  } catch (error) {
    throw error;
  }
}
