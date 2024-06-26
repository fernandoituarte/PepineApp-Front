import axios from "axios";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const URL = process.env.NEXT_PUBLIC_URL;

export async function getOrder(id) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("authToken");

  const authToken = authCookie.value;

  try {
    const response = await axios.get(`${URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.data.order;
  } catch (error) {
    notFound();
  }
}

export async function getAllOrders() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("authToken");

  const authToken = authCookie.value;

  try {
    const response = await axios.get(`${URL}/orders`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.data.order;
  } catch (error) {}
}
