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
const CATEGORY_COLOR = "#1e46c4";
const CATEGORY_TINT = "#dde6fb";

export const CATEGORIES = [
  { slug: "crisis", label: "Crisis & Mental Health", pill: "Crisis Support", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "recovery", label: "Substance Abuse & Recovery", pill: "Recovery", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "domestic-violence", label: "Domestic Violence Support", pill: "Domestic Violence", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "shelter", label: "Shelter & Housing", pill: "Shelter", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "sober-living", label: "Sober Living Homes", pill: "Sober Living", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "lgbtq", label: "LGBTQ+ Support", pill: "LGBTQ+", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "food", label: "Food Assistance", pill: "Food", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "clothing", label: "Clothing & Essentials", pill: "Clothing", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "military-first-responder", label: "Military & First Responder Support", pill: "Military & Veterans", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "support-groups", label: "Support Groups & Peer Recovery", pill: "Support Groups", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "legal-aid", label: "Legal Aid & Protective Orders", pill: "Legal Aid", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "financial-assistance", label: "Financial & Utility Assistance", pill: "Financial Help", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "human-trafficking", label: "Human Trafficking Support", pill: "Trafficking Support", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
  { slug: "teachers", label: "Teachers & Educators", pill: "Teachers", color: CATEGORY_COLOR, tint: CATEGORY_TINT },
];

export const CATEGORY_BY_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));

// Shared "all categories" pseudo-entry, for pages that render an "All
// Resources" tile/link alongside the real categories (homepage grid,
// browse sidebar, browse hero) without it living in CATEGORIES itself —
// it isn't a real category slug in the database. Left on the neutral
// ink/panel pairing (not the cobalt accent) so "All Resources" still
// reads as distinct from a specific category.
export const ALL_CATEGORY = { slug: "all", label: "All Resources", color: "var(--ink)", tint: "var(--panel)" };
