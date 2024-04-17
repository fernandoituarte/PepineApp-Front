"use server";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

const URL = process.env.NEXT_PUBLIC_URL;

export async function PATCH(req, { params }) {
  const { id } = params;

  const data = await req.json();

  const cookieStore = cookies(req.headers);

  const authToken = cookieStore.get("authToken");

  const { value } = authToken;

  try {
    const response = await axios.patch(`${URL}/products/${id}/media`, data, {
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

export async function DELETE(req, { params }) {
  const { id } = params;

  const cookieStore = cookies(req.headers);

  const authToken = cookieStore.get("authToken");

  const { value } = authToken;
  try {
    const response = await axios.delete(`${URL}/products/media/${id}`, {
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
