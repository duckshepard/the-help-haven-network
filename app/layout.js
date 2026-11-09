import Link from "next/link";
import "./globals.css";
import CrisisBar from "@/components/CrisisBar";
import Header from "@/components/Header";
import AdBanner from "@/components/AdBanner";

export const metadata = {
  title: "The Help Haven Network",
  description:
    "A directory of mental health, recovery, shelter, and support resources — starting in North Texas, built to grow nationwide — open for organizations to list themselves.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* IBM Plex Mono is still used for the .mono class (phone numbers, ZIP
            inputs). Source Serif 4 and IBM Plex Sans were dropped from here —
            the site's body and heading font is now OpenDyslexic, loaded via
            @font-face in globals.css. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- this is the root layout (App Router's
            equivalent of _document), so this stylesheet is already applied site-wide, not per-page. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        {/* Skip link — invisible until a keyboard user tabs to it (first
            focusable thing on the page), then jumps straight past the crisis
            bar, sponsor banner, and header nav into the actual page content. */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {/* Crisis bar (2026-11-09) — above everything else, including the
            sponsor banner, so 988/211 are one glance away on every page
            without anyone having to find or browse the Crisis category
            first. See components/CrisisBar.js. */}
        <CrisisBar />
        <AdBanner />
        <Header />
        <main id="main-content" className="shell">
          {children}
        </main>
        <footer className="shell" style={{ paddingTop: 24, paddingBottom: 24, color: "var(--ink-soft)", fontSize: 12 }}>
          Informational directory only — not a substitute for professional medical, legal, or crisis
          care. If you or someone else is in immediate danger, call 911. Listings are community-sourced
          and reviewed, but always confirm hours and eligibility directly with the organization.
          {" · "}
          <Link href="/accessibility" style={{ color: "var(--ink-soft)" }}>
            Accessibility
          </Link>
          {" · "}
          <Link href="/privacy" style={{ color: "var(--ink-soft)" }}>
            Privacy
          </Link>
          {" · "}
          <Link href="/terms" style={{ color: "var(--ink-soft)" }}>
            Terms
          </Link>
          {" · "}
          <Link href="/admin" style={{ color: "var(--ink-soft)" }}>
            Admin
          </Link>
        </footer>
      </body>
    </html>
  );
}
