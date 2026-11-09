import "./globals.css";
import CrisisBar from "@/components/CrisisBar";
import Header from "@/components/Header";
import AdBanner from "@/components/AdBanner";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";

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
        {/* EN/ES toggle (task 7, 2026-11-09) — wraps everything inside <body>
            so the crisis bar, sponsor banner, header, page content, and
            footer can all read the current language. Still a Server
            Component itself (RootLayout); LanguageProvider is the client
            boundary. lang="en" above stays fixed either way — this is a
            client-side toggle, not server-negotiated localization, so the
            <html> lang attribute isn't flipped per visitor. */}
        <LanguageProvider>
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
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
