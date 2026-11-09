// Single source of truth for category metadata — used by the homepage,
// the browse page, the submission form, and the seed script. Add a
// category here once and it shows up everywhere (including its icon,
// used on the homepage grid and the browse sidebar).
//
// Color scheme (2026-09-07, glossy cobalt pass): every category shares the
// same glossy cobalt-blue accent (color + tint) instead of a distinct hue
// per category, per Josh's request for a unified, modern, futuristic look
// for category badges, tiles, tabs, and map pins. Categories are still
// visually distinguished by their custom icon (see lib/categoryIcons.js —
// emoji were replaced with hand-built SVGs the same pass) and label, just
// not by color. Both values are WCAG 2.1 AA-checked: cobalt text on
// white/panel is 7.7:1, cobalt text on its own tint is 6.15:1, both clear
// the 4.5:1 text threshold (and the 3:1 border/UI threshold).
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
const CATEGORY_COLOR = "#1e46c4";
const CATEGORY_TINT = "#dde6fb";

export const CATEGORIES = [
  {
    slug: "crisis",
    label: "Crisis & Mental Health",
    label_es: "Crisis y Salud Mental",
    pill: "Crisis Support",
    pill_es: "Apoyo en Crisis",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "recovery",
    label: "Substance Abuse & Recovery",
    label_es: "Abuso de Sustancias y Recuperación",
    pill: "Recovery",
    pill_es: "Recuperación",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "domestic-violence",
    label: "Domestic Violence Support",
    label_es: "Apoyo en Violencia Doméstica",
    pill: "Domestic Violence",
    pill_es: "Violencia Doméstica",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "shelter",
    label: "Shelter & Housing",
    label_es: "Refugio y Vivienda",
    pill: "Shelter",
    pill_es: "Refugio",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "sober-living",
    label: "Sober Living Homes",
    label_es: "Casas de Vida Sobria",
    pill: "Sober Living",
    pill_es: "Vida Sobria",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "lgbtq",
    label: "LGBTQ+ Support",
    label_es: "Apoyo LGBTQ+",
    pill: "LGBTQ+",
    pill_es: "LGBTQ+",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "food",
    label: "Food Assistance",
    label_es: "Asistencia Alimentaria",
    pill: "Food",
    pill_es: "Alimentos",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "clothing",
    label: "Clothing & Essentials",
    label_es: "Ropa y Artículos Esenciales",
    pill: "Clothing",
    pill_es: "Ropa",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "military-first-responder",
    label: "Military & First Responder Support",
    label_es: "Apoyo Militar y para Primeros Respondientes",
    pill: "Military & Veterans",
    pill_es: "Militares y Veteranos",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "support-groups",
    label: "Support Groups & Peer Recovery",
    label_es: "Grupos de Apoyo y Recuperación entre Pares",
    pill: "Support Groups",
    pill_es: "Grupos de Apoyo",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "legal-aid",
    label: "Legal Aid & Protective Orders",
    label_es: "Asistencia Legal y Órdenes de Protección",
    pill: "Legal Aid",
    pill_es: "Asistencia Legal",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "financial-assistance",
    label: "Financial & Utility Assistance",
    label_es: "Asistencia Financiera y de Servicios Públicos",
    pill: "Financial Help",
    pill_es: "Ayuda Financiera",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "human-trafficking",
    label: "Human Trafficking Support",
    label_es: "Apoyo contra la Trata de Personas",
    pill: "Trafficking Support",
    pill_es: "Trata de Personas",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
  {
    slug: "teachers",
    label: "Teachers & Educators",
    label_es: "Maestros y Educadores",
    pill: "Teachers",
    pill_es: "Maestros",
    color: CATEGORY_COLOR,
    tint: CATEGORY_TINT,
  },
];

export const CATEGORY_BY_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));

// Shared "all categories" pseudo-entry, for pages that render an "All
// Resources" tile/link alongside the real categories (homepage grid,
// browse sidebar, browse hero) without it living in CATEGORIES itself —
// it isn't a real category slug in the database. Left on the neutral
// ink/panel pairing (not the cobalt accent) so "All Resources" still
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
