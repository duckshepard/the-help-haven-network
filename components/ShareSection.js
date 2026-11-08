"use client";

import { useState } from "react";

// QR image comes from a free, no-signup, hotlinkable generator (api.qrserver.com)
// instead of an inline SVG — keeps this component small and the QR colors
// (navy on white) match the printed flyer and the standalone share artifact.
const SHARE_URL = "https://thehhn.net";
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&color=16-34-79&bgcolor=255-255-255&data=${encodeURIComponent(
  SHARE_URL
)}`;

export default function ShareSection() {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API blocked (older browser, insecure context) — select the
      // text instead so the person can still copy it manually.
      const el = document.getElementById("share-url-text");
      if (el && window.getSelection) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "The Help Haven Network",
          text: "A free directory of crisis and support resources in the Dallas-Fort Worth area.",
          url: SHARE_URL,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        // User backed out of the native share sheet — not an error, do nothing.
      }
    } else {
      handleCopy();
    }
  }

  return (
    <div>
      <div className="hero-panel" style={{ textAlign: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, marginBottom: 10 }}>Pass It On</h2>
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 480, margin: "0 auto 20px" }}>
          The person who needs this directory most might not be searching for it online — they might
          just need someone to hand them a link. Scan the code, share the link, or print it out.
        </p>

        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            padding: 12,
            display: "inline-block",
            boxShadow: "0 8px 20px -8px rgba(0,0,0,0.4)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- third-party
              generated image, not an optimizable local asset */}
          <img src={QR_SRC} width={200} height={200} alt="QR code linking to thehhn.net" />
        </div>

        <p
          id="share-url-text"
          className="mono"
          style={{ fontSize: 18, fontWeight: 600, margin: "18px 0 6px", color: "var(--ink)" }}
        >
          thehhn.net
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
          <button type="button" className="btn btn-primary" onClick={handleShare}>
            {shared ? "Shared!" : "Share thehhn.net"}
          </button>
          <button
            type="button"
            className="btn"
            onClick={handleCopy}
            style={{ background: "var(--panel)", color: "var(--ink)", border: "1px solid var(--line)" }}
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>

      <div className="panel-block">
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 }}>
          <strong>In crisis? Call or text 988.</strong> No smartphone or data? Call{" "}
          <a className="mono" href="tel:211">
            211
          </a>{" "}
          — it connects you to local health and human services of every kind. Know a resource
          we&apos;re missing? Visit <a href="/add">thehhn.net/add</a>.
        </p>
      </div>
    </div>
  );
}
