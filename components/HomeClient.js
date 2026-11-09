"use client";

import Link from "next/link";
import { CATEGORIES, ALL_CATEGORY, categoryLabel } from "@/lib/categories";
import CategoryIcon from "@/lib/categoryIcons";
import { useLanguage } from "@/components/LanguageProvider";

// Client Component (task 7, 2026-11-09) — split out of app/page.js, which
// was a Server Component and so couldn't read the EN/ES language context
// directly. Everything else about this is unchanged: the category tile
// grid plus the short mission statement below it, same markup, same
// classes. app/page.js is now just a thin wrapper that renders this.
export default function HomeClient() {
  const { t, lang } = useLanguage();

  return (
    <div>
      <div className="hero-panel" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, marginBottom: 8, color: "var(--ink)" }}>{t("home.heroTitle")}</h2>
        <p style={{ color: "var(--ink-soft)", fontSize: 14.5, maxWidth: "56ch", margin: "0 0 24px" }}>
          {t("home.heroSubtitle")}
        </p>

        <div
          className="tile-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: 14,
          }}
        >
          <CategoryTile href="/browse" slug={ALL_CATEGORY.slug} label={categoryLabel(ALL_CATEGORY, lang)} isAll />
          {CATEGORIES.map((c) => (
            <CategoryTile key={c.slug} href={`/browse/${c.slug}`} slug={c.slug} label={categoryLabel(c, lang)} />
          ))}
        </div>
      </div>

      {/* Mission statement (2026-11-08) — short and heartfelt by design,
          below the category nav so it doesn't slow anyone down who just
          needs a phone number right now, but still greets anyone who
          scrolls or who's here to understand what this site is and why. */}
      <div className="panel-block">
        <h2 style={{ fontSize: 19, marginBottom: 10 }}>{t("home.missionTitle")}</h2>
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.6, margin: 0, maxWidth: "62ch" }}>{t("home.missionBody")}</p>
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
