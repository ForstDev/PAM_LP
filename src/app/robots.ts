import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const ALLOWED_BOTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot",
];

export default function robots(): MetadataRoute.Robots {
  // Los preview deployments de Vercel nunca deben indexarse.
  if (process.env.VERCEL_ENV === "preview") {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...ALLOWED_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.domain}/sitemap.xml`,
    host: site.domain,
  };
}
