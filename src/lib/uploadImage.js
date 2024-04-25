"use server";
import axios from "axios";
import { cookies } from "next/headers";

const URL = process.env.NEXT_PUBLIC_URL;

// This function handles uploading images to the server
export async function imageHandler(formData) {
  // Retrieves cookies from the browser
  const cookieStore = cookies();
  // Retrieves the authToken cookie
  const authToken = cookieStore.get("authToken");
  // Extracts the token value from the authToken cookie
  const token = authToken.value;

  try {
    // Sends a POST request to the server to upload the image
    const response = await axios.post(`${URL}/products/media`, formData, {
      // Sets the Authorization header with the token value
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Returns the image URL from the server response
    return response.data.data.m;
  } catch (error) {
    // Throws any errors that occur during the upload process
    throw error;
  }
}
