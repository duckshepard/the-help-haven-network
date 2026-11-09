"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/components/LanguageProvider";

// Lightweight crowdsourced verification signal — instead of Josh manually
// re-checking all 249 listings himself, anyone viewing a resource can flag
// whether it's still accurate. Feeds the "resource_feedback" table; an
// admin-dashboard rollup of flagged resources is a separate follow-up.
//
// Labels and messages read the EN/ES language context (task 7,
// 2026-11-09); the stored `note` text itself is kept exactly as typed,
// whichever language that was in.
export default function ResourceFeedback({ resourceId }) {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function sendFeedback(accurate, noteText) {
    setSubmitting(true);
    const { error } = await supabase.from("resource_feedback").insert({
      resource_id: resourceId,
      accurate,
      note: noteText || null,
    });
    setSubmitting(false);
    if (!error) {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <p style={{ fontSize: 13, color: "var(--sage)", margin: 0 }}>{t("resourceFeedback.thanks")}</p>
    );
  }

  if (showNote) {
    return (
      <div style={{ maxWidth: 360 }}>
        <label htmlFor="rf-note" style={{ fontSize: 13, color: "var(--ink-soft)" }}>
          {t("resourceFeedback.notePrompt")}
        </label>
        <textarea
          id="rf-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t("resourceFeedback.notePlaceholder")}
          style={{ minHeight: 60, width: "100%", marginTop: 4 }}
        />
        <button
          type="button"
          className="btn"
          style={{ background: "transparent", border: "1px solid var(--line)", marginTop: 6 }}
          disabled={submitting}
          onClick={() => sendFeedback(false, note)}
        >
          {submitting ? t("resourceFeedback.submitting") : t("resourceFeedback.submit")}
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
      <span style={{ color: "var(--ink-soft)" }}>{t("resourceFeedback.question")}</span>
      <button
        type="button"
        className="btn"
        style={{ background: "transparent", border: "1px solid var(--line)", padding: "4px 12px" }}
        disabled={submitting}
        onClick={() => sendFeedback(true, null)}
      >
        {t("resourceFeedback.yes")}
      </button>
      <button
        type="button"
        className="btn"
        style={{ background: "transparent", border: "1px solid var(--line)", padding: "4px 12px" }}
        disabled={submitting}
        onClick={() => setShowNote(true)}
      >
        {t("resourceFeedback.no")}
      </button>
    </div>
  );
}
