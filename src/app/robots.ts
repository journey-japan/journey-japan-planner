import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/editor/", "/auth/"],
      },
    ],
    sitemap: "https://plan.journeyjpn.com/sitemap.xml",
  };
}
