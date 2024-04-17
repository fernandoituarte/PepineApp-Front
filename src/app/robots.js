import { MetadataRoute } from "next";

export default function robot() {
  return {
    rules: [
      {
        userAgen: "*",
        allow: "/",
        disallow: ["/admin", "/user"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
  };
}
