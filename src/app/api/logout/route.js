import { cookies } from "next/headers";

export async function DELETE(req) {
  try {
    const cookieStore = await cookies();

    cookieStore.set("authToken", "", { maxAge: -1 });
    cookieStore.set("user", "", { maxAge: -1 });

    return new Response(
      JSON.stringify({
        success: true,
        status: 201,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
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
