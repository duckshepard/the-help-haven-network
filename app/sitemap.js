import { CATEGORIES } from "@/lib/categories";
import { getInitialResources } from "@/lib/resources";

const SITE_URL = "https://thehhn.net";

// Dynamic sitemap (Next.js App Router file convention — served at
// /sitemap.xml) so every category page and every individual resource
// listing is directly discoverable by search engines instead of relying
// purely on crawled internal links. Resource URLs are pulled live from
// Supabase so new listings show up here automatically.
export default async function sitemap() {
  const staticRoutes = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/browse`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/add`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/share`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/volunteer`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/suggestions`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/accessibility`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryRoutes = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/browse/${c.slug}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  let resourceRoutes = [];
  try {
    const resources = await getInitialResources();
    resourceRoutes = resources.map((r) => ({
      url: `${SITE_URL}/resource/${r.id}`,
      lastModified: r.updated_at || r.created_at || undefined,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // If Supabase is unreachable at build/request time, ship the sitemap
    // without resource URLs rather than failing the whole route — static
    // and category pages are still far better than no sitemap at all.
  }

  return [...staticRoutes, ...categoryRoutes, ...resourceRoutes];
}
