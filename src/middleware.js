import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function middleware(request) {
  const jwt = request.cookies.get("authToken");
  const secret = new TextEncoder().encode(SECRET);

  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  try {
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
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
