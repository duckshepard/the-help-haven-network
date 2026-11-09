"use client";

import { useLanguage } from "@/components/LanguageProvider";

const EMAIL = "nisusconcepts@gmail.com";
// Mailto subject by section key (language-independent — section titles
// differ between English and Spanish), matching the original page's link.
const MAILTO_SUBJECT = {
  contact: "Terms%20question",
};

function renderBody(body, subject) {
  const paragraphs = body.split("\n\n");
  return paragraphs.map((para, i) => {
    if (!subject || !para.includes(EMAIL)) return <p key={i}>{para}</p>;
    const idx = para.indexOf(EMAIL);
    const before = para.slice(0, idx);
    const after = para.slice(idx + EMAIL.length);
    return (
      <p key={i}>
        {before}
        <a href={`mailto:${EMAIL}?subject=${subject}`}>{EMAIL}</a>
        {after}
      </p>
    );
  });
}

// Client Component (task 7, 2026-11-09) holding the actual Terms of
// Service markup, so it can read the EN/ES language context. Split out
// from app/terms/page.js, which stays a thin Server Component so it can
// still export static `metadata` for the page title/SEO. The Spanish
// translation of this page was written by Claude (machine translation);
// a visible notice says so and points back to the English original as
// the authoritative text.
export default function TermsClient() {
  const { t, lang } = useLanguage();
  const sections = t("terms.sections");

  return (
    <div style={{ maxWidth: 720 }}>
      <div className="hero-panel" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>{t("terms.title")}</h2>
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 }}>
          {t("terms.intro")}
          <br />
          <span style={{ fontSize: 12.5 }}>{t("terms.lastUpdated")}</span>
        </p>
        {lang === "es" && (
          <p style={{ color: "var(--ink-soft)", lineHeight: 1.5, margin: "10px 0 0", fontSize: 12, fontStyle: "italic" }}>
            {t("terms.machineTranslatedNotice")}
          </p>
        )}
      </div>

      <div className="panel-block" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {sections.map((section) => (
          <Section key={section.key} title={section.title}>
            {renderBody(section.body, MAILTO_SUBJECT[section.key])}
          </Section>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 style={{ fontSize: 16, marginBottom: 8 }}>{title}</h3>
      <div style={{ color: "var(--ink-soft)", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 10 }}>
        {children}
      </div>
    </div>
  );
}
