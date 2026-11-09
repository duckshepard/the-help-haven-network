import TermsClient from "@/components/TermsClient";

export const metadata = { title: "Terms of Service — The Help Haven Network" };

// Server Component wrapper (task 7, 2026-11-09) — keeps the static
// `metadata` export (title/SEO); the actual translated markup moved to
// TermsClient.js so it can read the EN/ES language context.
export default function TermsPage() {
  return <TermsClient />;
}
