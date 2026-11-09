const SITE_URL = "https://thehhn.net";

// Points crawlers at the sitemap and keeps the internal review queue and
// backend API routes out of search results — neither is content a search
// engine should index.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
