import { handleAuth } from "./lib/middleware/authMiddleware";

export async function middleware(request) {
  return await handleAuth(request);
}
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
