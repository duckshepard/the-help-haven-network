"use client";

import { useLanguage } from "@/components/LanguageProvider";

// Persistent, site-wide — someone in active crisis shouldn't have to browse
// categories to find emergency help. Sits above the sponsor banner and
// header on every page (see app/layout.js), always visible, non-dismissible
// on purpose. Uses the same urgent-rust color language as .badge.urgent
// elsewhere on the site, so it reads as "urgent" at a glance.
//
// Converted to a Client Component (task 7, 2026-11-09) so it can read the
// EN/ES language context — the content itself is unchanged otherwise.
export default function CrisisBar() {
  const { t } = useLanguage();

  return (
    <div
      role="note"
      style={{
        background: "var(--rust-tint)",
        borderBottom: "1px solid var(--line)",
        padding: "8px 16px",
        textAlign: "center",
        fontSize: 13,
        fontWeight: 500,
        color: "var(--ink)",
      }}
    >
      {t("crisisBar.prefix")}{" "}
      <a href="tel:988" className="mono" style={{ color: "var(--rust)", fontWeight: 700, textDecoration: "underline" }}>
        {t("crisisBar.call988")}
      </a>{" "}
      <span style={{ color: "var(--ink-soft)" }}>{t("crisisBar.call988Label")}</span>
      {" · "}
      <a href="tel:211" className="mono" style={{ color: "var(--rust)", fontWeight: 700, textDecoration: "underline" }}>
        {t("crisisBar.call211")}
      </a>{" "}
      <span style={{ color: "var(--ink-soft)" }}>{t("crisisBar.call211Label")}</span>
    </div>
  );
}
