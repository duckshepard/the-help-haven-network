// Persistent, site-wide — someone in active crisis shouldn't have to browse
// categories to find emergency help. Sits above the sponsor banner and
// header on every page (see app/layout.js), always visible, non-dismissible
// on purpose. Uses the same urgent-rust color language as .badge.urgent
// elsewhere on the site, so it reads as "urgent" at a glance.
export default function CrisisBar() {
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
      In crisis right now?{" "}
      <a href="tel:988" className="mono" style={{ color: "var(--rust)", fontWeight: 700, textDecoration: "underline" }}>
        Call or text 988
      </a>{" "}
      <span style={{ color: "var(--ink-soft)" }}>(Suicide &amp; Crisis Lifeline)</span>
      {" · "}
      <a href="tel:211" className="mono" style={{ color: "var(--rust)", fontWeight: 700, textDecoration: "underline" }}>
        Call 211
      </a>{" "}
      <span style={{ color: "var(--ink-soft)" }}>(local resources, 24/7)</span>
    </div>
  );
}
