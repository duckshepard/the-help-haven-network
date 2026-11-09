// Single source of truth for category metadata — used by the homepage,
// the browse page, the submission form, and the seed script. Add a
// category here once and it shows up everywhere (including its icon,
// used on the homepage grid and the browse sidebar).
//
// Color scheme (2026-11-09, per-category pass): restores a distinct
// (color, tint) pair per category — replacing the 2026-09-07 "glossy
// cobalt" pass that had unified every category onto one shared accent.
// Per Josh's request ("different colors per category on the pins"),
// categories are distinguished by hue again, not just icon + label.
// Used in exactly two live UI surfaces: the map pin fill in
// ResourceMap.js, and the category badge (tint = background, color =
// text) on the resource-detail page and twice in the admin dashboard.
//
// Every pair is WCAG 2.1 AA-checked the same way as the 2026-09-07 pass
// (actual relative-luminance contrast via script, not eyeballing): each
// category's `color` on its own `tint` clears 4.5:1 (min achieved across
// all 14: 4.637:1). Pairs were generated mechanically — 14 evenly spaced
// hues around the wheel, with a per-hue binary search for the lightness
// needed to hit the contrast target against a fixed tint lightness,
// because a single fixed lightness badly fails WCAG for yellow/green
// hues (the luminance formula weights green ~10x red/blue, so a
// yellow-green at the same HSL lightness as a red reads much lighter
// and collapses contrast against the tint). Two swaps were then applied
// by hand for semantic fit without touching contrast or distinctness:
// domestic-violence <-> financial-assistance (so DV reads as purple,
// not the mechanical yellow-brown), and lgbtq <-> human-trafficking (so
// LGBTQ+ reads as pink/magenta, not mechanical green).
//
// `pill` (2026-11-08): a shorter label for the horizontal pill row on
// /browse (see CategoryRail.js) — several `label` values are full phrases
// ("Military & First Responder Support") that read fine as a sidebar link
// but make a wrapping pill row unwieldy. `label` is still the full name
// used as the page heading once a category is selected; `pill` is only
// for the compact switcher itself.
//
// `label_es` / `pill_es` (task 7, 2026-11-09): Spanish equivalents of
// `label` / `pill`, used by any client component reading the language
// context from components/LanguageProvider.js. Category *data itself*
// (the resources table) is a separate translation effort (task 8) — this
// is just the fixed category names shown in nav, tiles, pills, and the
// Add a Resource form's category dropdown.

export const CATEGORIES = [
  {
    slug: "crisis",
    label: "Crisis & Mental Health",
    label_es: "Crisis y Salud Mental",
    pill: "Crisis Support",
    pill_es: "Apoyo en Crisis",
    color: "#c52020",
    tint: "#f8e2e2",
  },
  {
    slug: "recovery",
    label: "Substance Abuse & Recovery",
    label_es: "Abuso de Sustancias y Recuperación",
    pill: "Recovery",
    pill_es: "Recuperación",
    color: "#a2551a",
    tint: "#f8ece2",
  },
  {
    slug: "domestic-violence",
    label: "Domestic Violence Support",
    label_es: "Apoyo en Violencia Doméstica",
    pill: "Domestic Violence",
    pill_es: "Violencia Doméstica",
    color: "#a022d3",
    tint: "#f2e2f8",
  },
  {
    slug: "shelter",
    label: "Shelter & Housing",
    label_es: "Refugio y Vivienda",
    pill: "Shelter",
    pill_es: "Refugio",
    color: "#5a7613",
    tint: "#f2f8e2",
  },
  {
    slug: "sober-living",
    label: "Sober Living Homes",
    label_es: "Casas de Vida Sobria",
    pill: "Sober Living",
    pill_es: "Vida Sobria",
    color: "#317b14",
    tint: "#e9f8e2",
  },
  {
    slug: "lgbtq",
    label: "LGBTQ+ Support",
    label_es: "Apoyo LGBTQ+",
    pill: "LGBTQ+",
    pill_es: "LGBTQ+",
    color: "#b41d9e",
    tint: "#f8e2f5",
  },
  {
    slug: "food",
    label: "Food Assistance",
    label_es: "Asistencia Alimentaria",
    pill: "Food",
    pill_es: "Alimentos",
    color: "#147b4f",
    tint: "#e2f8ef",
  },
  {
    slug: "clothing",
    label: "Clothing & Essentials",
    label_es: "Ropa y Artículos Esenciales",
    pill: "Clothing",
    pill_es: "Ropa",
    color: "#137676",
    tint: "#e2f8f8",
  },
  {
    slug: "military-first-responder",
    label: "Military & First Responder Support",
    label_es: "Apoyo Militar y para Primeros Respondientes",
    pill: "Military & Veterans",
    pill_es: "Militares y Veteranos",
    color: "#1c6eab",
    tint: "#e2eff8",
  },
  {
    slug: "support-groups",
    label: "Support Groups & Peer Recovery",
    label_es: "Grupos de Apoyo y Recuperación entre Pares",
    pill: "Support Groups",
    pill_es: "Grupos de Apoyo",
    color: "#3a51df",
    tint: "#e2e6f8",
  },
  {
    slug: "legal-aid",
    label: "Legal Aid & Protective Orders",
    label_es: "Asistencia Legal y Órdenes de Protección",
    pill: "Legal Aid",
    pill_es: "Asistencia Legal",
    color: "#693adf",
    tint: "#e9e2f8",
  },
  {
    slug: "financial-assistance",
    label: "Financial & Utility Assistance",
    label_es: "Asistencia Financiera y de Servicios Públicos",
    pill: "Financial Help",
    pill_es: "Ayuda Financiera",
    color: "#7b6c14",
    tint: "#f8f5e2",
  },
  {
    slug: "human-trafficking",
    label: "Human Trafficking Support",
    label_es: "Apoyo contra la Trata de Personas",
    pill: "Trafficking Support",
    pill_es: "Trata de Personas",
    color: "#147b23",
    tint: "#e2f8e6",
  },
  {
    slug: "teachers",
    label: "Teachers & Educators",
    label_es: "Maestros y Educadores",
    pill: "Teachers",
    pill_es: "Maestros",
    color: "#c11f65",
    tint: "#f8e2ec",
  },
];

export const CATEGORY_BY_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));

// Shared "all categories" pseudo-entry, for pages that render an "All
// Resources" tile/link alongside the real categories (homepage grid,
// browse sidebar, browse hero) without it living in CATEGORIES itself —
// it isn't a real category slug in the database. Left on the neutral
// ink/panel pairing (not any category's hue) so "All Resources" still
// reads as distinct from a specific category.
export const ALL_CATEGORY = {
  slug: "all",
  label: "All Resources",
  label_es: "Todos los Recursos",
  color: "var(--ink)",
  tint: "var(--panel)",
};

// Small helper so every component picks the right label/pill the same
// way instead of repeating `lang === "es" ? c.label_es || c.label : ...`
// everywhere. Falls back to the English field if a Spanish one is ever
// missing (e.g. a category added later without a translation yet).
export function categoryLabel(category, lang) {
  if (!category) return "";
  return lang === "es" ? category.label_es || category.label : category.label;
}

export function categoryPill(category, lang) {
  if (!category) return "";
  const pillField = lang === "es" ? category.pill_es || category.pill : category.pill;
  return pillField || categoryLabel(category, lang);
}
