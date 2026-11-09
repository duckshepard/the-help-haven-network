"use client";

import { useState } from "react";

// Native share sheet first (works on nearly every phone browser), falling
// back to copying the link to the clipboard on desktop browsers that don't
// implement the Web Share API. Chosen over real SMS (Twilio) specifically
// because it's free and needs no account setup — see project notes.
export default function ShareButton({ title, text, url }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareUrl = url || window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch (err) {
        // AbortError just means the user closed the share sheet — ignore it.
        if (err && err.name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  return (
    <button
      type="button"
      className="btn"
      style={{ background: "transparent", border: "1px solid var(--line)" }}
      onClick={handleShare}
    >
      {copied ? "Link copied!" : "Share this resource"}
    </button>
  );
}
