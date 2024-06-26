import { cookies } from "next/headers";

export async function DELETE(req) {
  if (req.method === "DELETE") {
    cookies().delete({
      name: "authToken",
    });
    cookies().delete({
      name: "user",
    });

    return new Response(
      JSON.stringify({
        success: true,
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
