"use client";

import { useLanguage } from "@/components/LanguageProvider";

const EMAIL = "nisusconcepts@gmail.com";
// Mailto subjects by section key, matching the original English page's
// links exactly (section titles differ by language, so matching is done
// by the language-independent `key` field added to each dictionary entry
// instead of by title text).
const MAILTO_SUBJECT = {
  yourChoices: "Privacy%20request",
  contact: "Privacy%20question",
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

// Client Component (task 7, 2026-11-09) holding the actual Privacy Policy
// markup, so it can read the EN/ES language context. Split out from
// app/privacy/page.js, which stays a thin Server Component so it can
// still export static `metadata` for the page title/SEO. The Spanish
// translation of this page was written by Claude (machine translation);
// a visible notice says so and points back to the English original as
// the authoritative text, matching how the resource-description
// translations (task 8) are flagged.
export default function PrivacyClient() {
  const { t, lang } = useLanguage();
  const sections = t("privacy.sections");

  return (
    <div style={{ maxWidth: 720 }}>
      <div className="hero-panel" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>{t("privacy.title")}</h2>
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 }}>
          {t("privacy.intro")}
          <br />
          <span style={{ fontSize: 12.5 }}>{t("privacy.lastUpdated")}</span>
        </p>
        {lang === "es" && (
          <p style={{ color: "var(--ink-soft)", lineHeight: 1.5, margin: "10px 0 0", fontSize: 12, fontStyle: "italic" }}>
            {t("privacy.machineTranslatedNotice")}
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
