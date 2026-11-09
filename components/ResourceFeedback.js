"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Lightweight crowdsourced verification signal — instead of Josh manually
// re-checking all 249 listings himself, anyone viewing a resource can flag
// whether it's still accurate. Feeds the "resource_feedback" table; an
// admin-dashboard rollup of flagged resources is a separate follow-up.
export default function ResourceFeedback({ resourceId }) {
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
      <p style={{ fontSize: 13, color: "var(--sage)", margin: 0 }}>
        Thanks for letting us know — this helps keep the directory accurate.
      </p>
    );
  }

  if (showNote) {
    return (
      <div style={{ maxWidth: 360 }}>
        <label htmlFor="rf-note" style={{ fontSize: 13, color: "var(--ink-soft)" }}>
          What's changed? (optional)
        </label>
        <textarea
          id="rf-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. phone number disconnected, moved locations..."
          style={{ minHeight: 60, width: "100%", marginTop: 4 }}
        />
        <button
          type="button"
          className="btn"
          style={{ background: "transparent", border: "1px solid var(--line)", marginTop: 6 }}
          disabled={submitting}
          onClick={() => sendFeedback(false, note)}
        >
          {submitting ? "Sending…" : "Submit"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
      <span style={{ color: "var(--ink-soft)" }}>Still accurate?</span>
      <button
        type="button"
        className="btn"
        style={{ background: "transparent", border: "1px solid var(--line)", padding: "4px 12px" }}
        disabled={submitting}
        onClick={() => sendFeedback(true, null)}
      >
        Yes
      </button>
      <button
        type="button"
        className="btn"
        style={{ background: "transparent", border: "1px solid var(--line)", padding: "4px 12px" }}
        disabled={submitting}
        onClick={() => setShowNote(true)}
      >
        No
      </button>
    </div>
  );
}
