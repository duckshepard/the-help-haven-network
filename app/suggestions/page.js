"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const EMPTY_FORM = { name: "", email: "", message: "" };

// A lightweight way for anyone using the site to tell us what would make
// it better — a missing feature, a confusing page, a resource that's hard
// to find. Deliberately simple: no categories, no required contact info,
// just "what would help." Submissions land in Supabase (RLS-gated the
// same way "submissions" is: anyone can insert, only admins can read).
export default function SuggestionsPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(null); // { type: 'ok' | 'err', message }
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const { error } = await supabase.from("suggestions").insert({
      name: form.name || null,
      email: form.email || null,
      message: form.message,
    });

    setSubmitting(false);
    if (error) {
      setStatus({ type: "err", message: `Something went wrong (${error.message}). Please try again.` });
    } else {
      setStatus({ type: "ok", message: "Thank you — we read every suggestion, and it genuinely shapes what we build next." });
      setForm(EMPTY_FORM);
    }
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div className="hero-panel" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, marginBottom: 6 }}>Suggestions</h2>
        <p style={{ color: "var(--ink-soft)", margin: 0, fontSize: 13.5 }}>
          This site only gets better with input from the people actually using it. Missing a
          resource, found something confusing, or have an idea that would make this easier to use?
          Tell us below — contact info is optional, but if you leave an email we may follow up.
        </p>
      </div>

      <div className="panel-block">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="sg-message">Your suggestion</label>
            <textarea
              id="sg-message"
              required
              placeholder="What would make this site more helpful?"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              style={{ minHeight: 120 }}
            />
          </div>

          <div className="field two">
            <div>
              <label htmlFor="sg-name">Name (optional)</label>
              <input id="sg-name" value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div>
              <label htmlFor="sg-email">Email (optional)</label>
              <input
                id="sg-email"
                type="email"
                placeholder="Only if you'd like a reply"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Send suggestion"}
          </button>

          {status && <div className={`form-msg ${status.type === "ok" ? "ok" : "err"}`}>{status.message}</div>}
        </form>
      </div>
    </div>
  );
}
