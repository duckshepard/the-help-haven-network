import Link from "next/link";
import { CATEGORIES, ALL_CATEGORY } from "@/lib/categories";
import CategoryIcon from "@/lib/categoryIcons";

// Server Component: the homepage is the category nav — a grid of
// same-size, icon-labeled tiles on a colorful shared background — plus a
// short mission statement below it. Each tile links straight to its own
// /browse/[category] page; "All Resources" goes to /browse. Search, ZIP
// filtering, and the map all live one click away on the browse page, so
// this page stays a fast menu with nothing that goes stale (no resource
// counts, no in-place filtering).
export default function HomePage() {
  return (
    <div>
      <div className="hero-panel" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, marginBottom: 8, color: "var(--ink)" }}>Helping North Texas — and growing</h2>
        <p style={{ color: "var(--ink-soft)", fontSize: 14.5, maxWidth: "56ch", margin: "0 0 24px" }}>
          Pick a category below to get started, or browse everything at once — search and ZIP filtering
          are on the next page. For 24/7 crisis and social-service referrals anywhere in the country, you
          can also dial 211.
        </p>

        <div
          className="tile-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: 14,
          }}
        >
          <CategoryTile href="/browse" slug={ALL_CATEGORY.slug} label={ALL_CATEGORY.label} isAll />
          {CATEGORIES.map((c) => (
            <CategoryTile key={c.slug} href={`/browse/${c.slug}`} slug={c.slug} label={c.label} />
          ))}
        </div>
      </div>

      {/* Mission statement (2026-11-08) — short and heartfelt by design,
          below the category nav so it doesn't slow anyone down who just
          needs a phone number right now, but still greets anyone who
          scrolls or who's here to understand what this site is and why. */}
      <div className="panel-block">
        <h2 style={{ fontSize: 19, marginBottom: 10 }}>Why we&apos;re doing this</h2>
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.6, margin: 0, maxWidth: "62ch" }}>
          We started The Help Haven Network to do the next right thing — because finding help
          shouldn&apos;t be its own crisis. Right now we&apos;re new, small, and built mostly by hand, so
          we know we&apos;re limited in how much ground we cover. But we&apos;re not staying small. Every
          resource we add and every listing we verify is a step toward a directory that reaches city
          after city, until help is never more than a search away, no matter where someone is. If this
          page gets even one person to the next right thing, it was worth building.
        </p>
      </div>
    </div>
  );
}

function CategoryTile({ href, slug, label, isAll }) {
  return (
    <Link
      href={href}
      className={isAll ? "tile all" : "tile"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        minHeight: 112,
        padding: "18px 10px",
        borderRadius: 14,
        textDecoration: "none",
        textAlign: "center",
        border: "1px solid rgba(150,180,255,0.4)",
      }}
    >
      <CategoryIcon slug={slug} size={28} className="tile-icon" />
      <span className="tile-label" style={{ fontSize: 13 }}>
        {label}
      </span>
    </Link>
  );
}
