// Import necessary modules from Next.js and jose for JWT handling.
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Retrieve the JWT secret key from environment variables.
const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

// Define an asynchronous middleware function to handle JWT authentication and authorization.
export async function middleware(request) {
  // Retrieve the JWT from the cookies in the incoming request.
  const jwt = request.cookies.get("authToken");
  // Encode the JWT secret key to be used in the verification process.
  const secret = new TextEncoder().encode(SECRET);

  // Check if the JWT is not present in the cookies.
  if (jwt === undefined) {
    // Redirect the user to the login page if the JWT is missing.
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  try {
    // Verify the JWT using the provided secret key. `jwtVerify` returns the payload if the token is valid.
    const { payload } = await jwtVerify(jwt.value, secret);
    // Check if the user's role is "admin".
    if (payload.role === "admin") {
      // Prevent admin users from accessing user-specific paths that are not designated for admin users.
      if (
        request.nextUrl.pathname.startsWith("/user") &&
        !request.nextUrl.pathname.startsWith("/admin/users")
      ) {
        // Redirect admin users trying to access general user paths to the login page.
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }
    // Check if the user's role is "user".
    if (payload.role === "user") {
      // Prevent regular users from accessing any admin-specific paths.
      if (request.nextUrl.pathname.includes("/admin")) {
        // Redirect regular users trying to access admin paths back to the login page.
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }
  } catch (error) {
    // If the JWT verification fails (e.g., token is expired or tampered with), redirect to login page.
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// Specify URL patterns that this middleware should apply to. It targets URLs under "/admin" and "/user" paths.
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
