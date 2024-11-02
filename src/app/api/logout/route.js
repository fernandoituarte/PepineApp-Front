import { cookies } from "next/headers";

export async function DELETE(req) {
  const cookie = await cookies();
  if (req.method === "DELETE") {
    cookie.delete({
      name: "authToken",
    });
    cookie.delete({
      name: "user",
    });

    return new Response(
      JSON.stringify({
        success: true,
        status: 201,
      }),
    );
  } else {
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
