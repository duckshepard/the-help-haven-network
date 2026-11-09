"use client";

import { useLanguage } from "@/components/LanguageProvider";

// Client Component (task 7, 2026-11-09) holding the actual About page
// markup, so it can read the EN/ES language context. Split out from
// app/about/page.js, which stays a thin Server Component so it can still
// export static `metadata` (a Server Component only feature) for the
// page title/SEO.
export default function AboutClient() {
  const { t } = useLanguage();

  return (
    <div style={{ maxWidth: 680 }}>
      <div className="hero-panel" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>{t("about.title")}</h2>
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.6 }}>
          {t("about.p1a")} <a className="mono" href="tel:211">211</a> {t("about.p1b")}
        </p>
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.6 }}>{t("about.p2")}</p>

        <p style={{ color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 0 }}>{t("about.p3")}</p>
      </div>

      <div className="panel-block">
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 }}>
          <strong>{t("about.disclaimerStrong")}</strong>
          {t("about.disclaimerRest")}
        </p>
      </div>
    </div>
  );
}
