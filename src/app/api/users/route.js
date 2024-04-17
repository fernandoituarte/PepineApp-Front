"use server";

import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const URL = process.env.NEXT_PUBLIC_URL;

export async function POST(req) {
  const data = await req.json();
  try {
    const response = await axios.post(`${URL}/users/login`, data);
    const token = response.data.data.token;
    const { id, role } = jwtDecode(token);

    cookies().set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
    cookies().set({
      name: "user",
      value: JSON.stringify({ role, id }),
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return new Response(
      JSON.stringify({
        success: "true",
      }),
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          Allow: "POST",
          "Content-Type": "application/json",
        },
      },
    );
  }
}

export async function DELETE(req) {
  if (req.method === "DELETE") {
    cookies().delete({
      name: "authToken",
    });
    cookies().delete({
      name: "user",
    });

    return new Response(
      JSON.stringify({
        success: true,
      }),
    );
  } else {
    return new Response(
      JSON.stringify({ error: `Method ${req.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          Allow: "DELETE",
          "Content-Type": "application/json",
        },
      },
    );
  }
}

export async function GET(req) {
  const cookieStore = cookies(req.headers);

  const authToken = cookieStore.get("authToken");

  const { value } = authToken;

  try {
    const response = await axios.get(`${URL}/users`, {
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
      }
    );
  }
}
