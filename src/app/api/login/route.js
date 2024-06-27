"use server";

import axios from "axios";
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
      sameSite: "none",
      maxAge: 23 * 60 * 60 * 1000,
    });
    cookies().set({
      name: "user",
      value: JSON.stringify({ role, id }),
      path: "/",
      secure: true,
      sameSite: "none",
      maxAge: 23 * 60 * 60 * 1000,
    });

    return new Response(
      JSON.stringify({
        status: "success",
      }),
    );
  } catch (error) {
    console.log(error);
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
