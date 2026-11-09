// Placeholder sponsor banner. Sits at the top of every page, above the
// header, as a contained rounded pill inside the same shell width as the
// rest of the site (not a full-bleed edge-to-edge bar) — matching the
// approved dark-cobalt mockup, where the sponsor strip sits inside the
// content column like a card, not spanning the browser width. No ad
// network is wired up — there's no paying sponsor yet — so this is just a
// clearly-labeled placeholder that shows where that space will live once
// there is one. Swap the contents of this component (or route it through a
// real ad slot/sponsor rotation) once a sponsor is signed.
export default function AdBanner() {
  // Fixed dark-navy-to-cobalt colors here (not the --teal/--teal-dark
  // variables) on purpose: those variables now hold light pastel-blue
  // values meant for text/accents against the site's dark theme, and this
  // banner needs its own dark background regardless of theme so its light
  // text stays readable (light-on-light here would fail contrast).
  return (
    <div className="shell no-print" style={{ paddingTop: 20, paddingBottom: 0 }}>
      <div
        style={{
          background: "linear-gradient(180deg, #33509e 0%, #16224f 100%)",
          borderRadius: 10,
          padding: "10px 18px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 6px 18px -8px rgba(20,50,180,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 13, color: "#eef7f5" }}>
          <strong>Sponsor space available.</strong> This spot is reserved for a community partner.
        </span>
        <a
          href="mailto:nisusconcepts@gmail.com?subject=Sponsoring%20The%20Help%20Haven%20Network"
          style={{
            color: "#eef7f5",
            fontSize: 12.5,
            fontWeight: 600,
            textDecoration: "underline",
            flex: "none",
          }}
        >
          Inquire about sponsoring &rarr;
        </a>
      </div>
    </div>
  );
}
