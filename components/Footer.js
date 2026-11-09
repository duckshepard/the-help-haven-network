"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

// Extracted out of app/layout.js (task 7, 2026-11-09) — the disclaimer and
// link labels needed to read the language context, which a Server
// Component (RootLayout) can't do directly. Visually and structurally
// identical to the footer that used to live inline in layout.js.
export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="shell" style={{ paddingTop: 24, paddingBottom: 24, color: "var(--ink-soft)", fontSize: 12 }}>
      {t("footer.disclaimer")}
      {" · "}
      <Link href="/accessibility" style={{ color: "var(--ink-soft)" }}>
        {t("footer.accessibility")}
      </Link>
      {" · "}
      <Link href="/privacy" style={{ color: "var(--ink-soft)" }}>
        {t("footer.privacy")}
      </Link>
      {" · "}
      <Link href="/terms" style={{ color: "var(--ink-soft)" }}>
        {t("footer.terms")}
      </Link>
      {" · "}
      <Link href="/admin" style={{ color: "var(--ink-soft)" }}>
        {t("footer.admin")}
      </Link>
    </footer>
  );
}
