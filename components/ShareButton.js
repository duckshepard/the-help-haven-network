"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function ShareButton({ title, text, url }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareUrl = url || window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch (err) {
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
      {copied ? t("shareButton.copied") : t("shareButton.share")}
    </button>
  );
}
