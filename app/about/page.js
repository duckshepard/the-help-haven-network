import AboutClient from "@/components/AboutClient";

export const metadata = { title: "About — The Help Haven Network" };

// Server Component wrapper (task 7, 2026-11-09) — keeps the static
// `metadata` export (title/SEO); the actual translated markup moved to
// AboutClient.js so it can read the EN/ES language context.
export default function AboutPage() {
  return <AboutClient />;
}
