import Cookies from "js-cookie";

export function getUserSessionCookieClient() {
  const userCookie = Cookies.get("user");
  if (!userCookie) return null;

  try {
    const user = JSON.parse(userCookie);

    return user;
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    return null;
  }
}
