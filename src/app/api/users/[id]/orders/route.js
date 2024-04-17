"use server";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

const URL = process.env.NEXT_PUBLIC_URL;

export async function GET(req, { params }) {
  const { id } = params;

  const cookieStore = cookies(req.headers);
  const authToken = cookieStore.get("authToken");
  const { value } = authToken;

  try {
    const response = await axios.get(`${URL}/users/${id}/orders`, {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    });

    return new NextResponse(JSON.stringify(response.data.data), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: error.response?.data?.message || error.message,
      }),
      {
        status: error.response?.status || 500,
      },
    );
  }
}
