"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import VisitStats from "@/components/VisitStats";

const LINKS = [
  { href: "/", label: "Browse" },
  { href: "/add", label: "Add a Resource" },
  { href: "/about", label: "About" },
  { href: "/share", label: "Share" },
  { href: "/suggestions", label: "Suggestions" },
];

// Centered, sitting directly on the page's cube-pattern backdrop (no opaque
// panel background — that was hiding the pattern under the header entirely)
// per the approved dark-cobalt mockup. The mission-statement paragraph that
// used to live here was dropped: it duplicated the homepage's hero-panel
// copy word-for-word, and the About page carries the fuller version — this
// header is now just the title, tagline, and site nav, matching the mockup.
export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <div
        className="shell"
        style={{
          paddingTop: 36,
          paddingBottom: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 8px" }}>
            <Link
              href="/"
              style={{
                color: "var(--ink)",
                textDecoration: "none",
                filter: "drop-shadow(0 6px 20px var(--glow))",
              }}
            >
              The Help Haven Network
            </Link>
          </h1>
          <p
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "var(--teal-dark)",
              margin: 0,
            }}
          >
            Community resource directory
          </p>
          <VisitStats />
        </div>
        <nav
          style={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            justifyContent: "center",
            background: "var(--panel-glass)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            padding: 4,
            borderRadius: 10,
            border: "1px solid var(--line)",
          }}
        >
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "9px 16px",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 500,
                  textDecoration: "none",
                  color: active ? "var(--ink)" : "var(--teal-dark)",
                  background: active ? "var(--panel)" : "transparent",
                  boxShadow: active ? "var(--shadow)" : "none",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
