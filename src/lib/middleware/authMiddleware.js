import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import axios from "axios";

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export const handleAuth = async (request) => {
  const jwt = request.cookies.get("authToken");
  const secret = new TextEncoder().encode(SECRET);

  if (!SECRET) {
    throw new Error("JWT Secret not defined");
  }

  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    if (jwt !== undefined) {
      const { payload } = await jwtVerify(jwt.value, secret);

      if (payload.role === "admin") {
        if (
          request.nextUrl.pathname.startsWith("/user") &&
          !request.nextUrl.pathname.startsWith("/admin/users")
        ) {
          return NextResponse.redirect(new URL("/auth/login", request.url));
        }
      }

      if (payload.role === "user") {
        if (request.nextUrl.pathname.includes("/admin")) {
          return NextResponse.redirect(new URL("/auth/login", request.url));
        }
      }
    }
  } catch (error) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("authToken");
    response.cookies.delete("user");
    return response;
  }

  return NextResponse.next();
};
