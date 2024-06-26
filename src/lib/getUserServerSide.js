import { cookies } from "next/headers";

export function getUserSessionCookieServer() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    return null;
  }
  const user = JSON.parse(userCookie.value);

  return user;
}
