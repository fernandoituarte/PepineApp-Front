"use server";
import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const URL = process.env.NEXT_PUBLIC_URL;

export async function POST(req) {
  const data = await req.json();

  const cookieStore = cookies(req.headers);

  const authToken = cookieStore.get("authToken");

  const { value } = authToken;

  console.log(data);
  try {
    const response = await axios.post(`${URL}/users/change-password`, data, {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    });

    return new NextResponse(JSON.stringify(response.data), {
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
