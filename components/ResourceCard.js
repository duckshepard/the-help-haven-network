import Link from "next/link";

// The top-right category badge was dropped (2026-09-07) — cards are more
// compact now that several fit per row, and a category badge on every card
// stopped pulling its weight once cards read as a dense grid rather than a
// full-width list; category is still visible from the active rail item on
// the left and from the per-category browse route.
//
// Sizing pass (2026-11-08): trimmed padding, gaps, and font sizes across
// the card now that the grid runs 4-across on desktop instead of 3 — same
// fields, same information, just proportioned for the narrower column
// instead of carrying over sizing tuned for the old 3-up width.
export default function ResourceCard({ resource, onSelect }) {
  return (
    <article
      className="panel-block resource-card"
      style={{ padding: "11px 12px", display: "flex", flexDirection: "column", gap: 6, cursor: onSelect ? "pointer" : "default" }}
      onClick={() => onSelect && onSelect(resource.id)}
    >
      <h3 style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>
        {/* onFocus (not just the article's onClick) so keyboard users tabbing
            through the list get the same "highlight this one on the map"
            behavior mouse users get by clicking the card — the card's own
            onClick isn't reachable by keyboard since a div/article has no
            native key handling. */}
        <Link
          href={`/resource/${resource.id}`}
          onFocus={() => onSelect && onSelect(resource.id)}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {resource.name}
        </Link>
      </h3>

      <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: 12, lineHeight: 1.4 }}>
        {resource.description}
      </p>

      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {resource.verified && (
          <span className="badge" style={{ background: "var(--sage-tint)", color: "var(--sage)" }} title="Confirmed against the organization's own website">
            ✓ Verified
          </span>
        )}
        {resource.hours_247 && <span className="badge urgent">24/7</span>}
        {resource.free && <span className="badge free">Free</span>}
        {resource.offers_detox && <span className="badge">Detox available</span>}
        {resource.area && <span className="badge">{resource.area}</span>}
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingTop: 7,
          borderTop: "1px solid var(--line)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          fontSize: 12,
        }}
      >
        {resource.phone && (
          <div style={{ display: "flex", gap: 6, color: "var(--ink-soft)" }}>
            <span>Call</span>
            <a className="mono" style={{ color: "var(--ink)" }} href={`tel:${resource.phone.replace(/[^\d+]/g, "")}`}>
              {resource.phone}
            </a>
          </div>
        )}
        {resource.address && (
          <div style={{ display: "flex", gap: 6, color: "var(--ink-soft)" }}>
            <span>Where</span>
            <span style={{ color: "var(--ink)" }}>{resource.address}</span>
          </div>
        )}
        {resource.hours && (
          <div style={{ display: "flex", gap: 6, color: "var(--ink-soft)" }}>
            <span>Hours</span>
            <span style={{ color: "var(--ink)" }}>{resource.hours}</span>
          </div>
        )}
      </div>
    </article>
  );
}
