import PrivacyClient from "@/components/PrivacyClient";

export const metadata = { title: "Privacy Policy — The Help Haven Network" };

// Server Component wrapper (task 7, 2026-11-09) — keeps the static
// `metadata` export (title/SEO); the actual translated markup moved to
// PrivacyClient.js so it can read the EN/ES language context.
export default function PrivacyPage() {
  return <PrivacyClient />;
}
