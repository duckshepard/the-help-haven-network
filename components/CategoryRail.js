import Link from "next/link";
import { CATEGORIES, ALL_CATEGORY } from "@/lib/categories";
import CategoryIcon from "@/lib/categoryIcons";

// Compact horizontal category switcher for the /browse results page. Was
// a vertical sticky sidebar; moved to a wrapping pill row between the page
// nav and the search/ZIP box per Josh's request (2026-11-08) — the
// sidebar ate a fixed 200px column at every width, and the "All
// Resources" view has grown too long to also need a persistent side rail.
// Deliberately no counts (a number here would just go stale as listings
// change) and no dropdown/local state — every item is a real link, so
// clicking one is a normal page navigation that keeps the current ZIP
// filter intact. Category links point at path-based routes
// (/browse/[category]) so each category has its own indexable URL and
// per-page title/description; "All resources" stays at /browse. Pills use
// the shorter `pill` label from lib/categories.js instead of the full
// `label` (which still shows as the page heading in BrowseClient) so a
// 14-category row doesn't wrap into a wall of long phrases. Each entry
// shows the same custom icon used on the homepage grid, for a consistent
// visual language across pages.
export default function CategoryRail({ activeCategory = "all", zip = "", detoxOnly = false, onToggleDetox }) {
  function hrefFor(slug) {
    const base = slug === "all" ? "/browse" : `/browse/${slug}`;
    return zip ? `${base}?zip=${zip}` : base;
  }

  return (
    <div className="category-pills">
      <Pill href={hrefFor("all")} slug={ALL_CATEGORY.slug} label={ALL_CATEGORY.label} active={activeCategory === "all"} />
      {CATEGORIES.map((c) => (
        <Pill
          key={c.slug}
          href={hrefFor(c.slug)}
          slug={c.slug}
          label={c.pill || c.label}
          active={activeCategory === c.slug}
          detoxOnly={c.slug === "recovery" ? detoxOnly : undefined}
          onToggleDetox={c.slug === "recovery" ? onToggleDetox : undefined}
        />
      ))}
    </div>
  );
}

function Pill({ href, slug, label, active, detoxOnly, onToggleDetox }) {
  const hasDetoxToggle = typeof onToggleDetox === "function";

  return (
    <div style={{ position: "relative" }} className={hasDetoxToggle ? "rail-detox-wrap" : undefined}>
      <Link href={href} aria-current={active ? "page" : undefined} className="category-pill">
        <CategoryIcon slug={slug} size={16} style={{ flex: "none" }} />
        {label}
      </Link>

      {hasDetoxToggle && (
        <div className="rail-detox-popover">
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 12.5,
              color: "var(--ink)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <input type="checkbox" checked={detoxOnly} onChange={onToggleDetox} />
            Only show places that offer detox
          </label>
        </div>
      )}
    </div>
  );
}
