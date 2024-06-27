import { cookies } from "next/headers";

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
      maxAge: 30 * 24 * 60 * 60,
    });
    cookies().set({
      name: "user",
      value: JSON.stringify({ role, id }),
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return new Response(
      JSON.stringify({
        status: "success",
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
