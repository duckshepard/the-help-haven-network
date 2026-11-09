"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };

// Volunteer signups land in Supabase (same RLS pattern as "suggestions" and
// "resource_feedback": anyone can insert, only admins can read) and show up
// in the admin dashboard for follow-up. The Donate section below is a
// placeholder — Josh hasn't supplied a payment link yet, so there's
// nothing to wire up there until he does; an email contact point is given
// in the meantime so a motivated donor isn't left with a dead end.
export default function VolunteerPage() {
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

    const { error } = await supabase.from("volunteers").insert({
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      message: form.message || null,
    });

    setSubmitting(false);
    if (error) {
      setStatus({ type: "err", message: `Something went wrong (${error.message}). Please try again.` });
    } else {
      setStatus({ type: "ok", message: "Thank you — we'll be in touch about ways to help." });
      setForm(EMPTY_FORM);
    }
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div className="hero-panel" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, marginBottom: 6 }}>Volunteer &amp; Donate</h2>
        <p style={{ color: "var(--ink-soft)", margin: 0, fontSize: 13.5 }}>
          The Help Haven Network runs on volunteer time and community support. If you've got an hour
          or a skill to offer, or want to support the work directly, here's how.
        </p>
      </div>

      <div className="panel-block" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 17, marginBottom: 10 }}>Volunteer with us</h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 13, marginTop: 0, marginBottom: 16 }}>
          We're a new, small operation, so volunteer help goes a long way — verifying listings,
          researching new resources, spreading the word, or just telling us what's missing. Tell us a
          bit about yourself and we'll follow up.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="vol-name">Name</label>
            <input id="vol-name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>

          <div className="field two">
            <div>
              <label htmlFor="vol-email">Email</label>
              <input
                id="vol-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="vol-phone">Phone (optional)</label>
              <input id="vol-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="vol-message">How would you like to help? (optional)</label>
            <textarea
              id="vol-message"
              placeholder="Skills, availability, what you're interested in..."
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              style={{ minHeight: 90 }}
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Sign up to volunteer"}
          </button>

          {status && <div className={`form-msg ${status.type === "ok" ? "ok" : "err"}`}>{status.message}</div>}
        </form>
      </div>

      <div className="panel-block">
        <h3 style={{ fontSize: 17, marginBottom: 10 }}>Donate</h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 13, margin: 0 }}>
          We're setting up a way to accept donations directly — check back soon. In the meantime, if
          you'd like to support the directory financially,{" "}
          <a href="mailto:nisusconcepts@gmail.com?subject=Supporting%20The%20Help%20Haven%20Network">
            reach out by email
          </a>{" "}
          and we'll follow up.
        </p>
      </div>
    </div>
  );
}
