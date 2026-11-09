"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/components/LanguageProvider";

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };

// Volunteer signups land in Supabase (same RLS pattern as "suggestions" and
// "resource_feedback": anyone can insert, only admins can read) and show up
// in the admin dashboard for follow-up. The Donate section below is a
// placeholder — Josh hasn't supplied a payment link yet, so there's
// nothing to wire up there until he does; an email contact point is given
// in the meantime so a motivated donor isn't left with a dead end.
//
// Labels, copy, and messages read the EN/ES language context (task 7,
// 2026-11-09); the donate section's mailto link is unchanged either way.
export default function VolunteerPage() {
  const { t } = useLanguage();
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
      setStatus({ type: "err", message: t("volunteer.errPrefix", { error: error.message }) });
    } else {
      setStatus({ type: "ok", message: t("volunteer.ok") });
      setForm(EMPTY_FORM);
    }
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div className="hero-panel" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, marginBottom: 6 }}>{t("volunteer.heroTitle")}</h2>
        <p style={{ color: "var(--ink-soft)", margin: 0, fontSize: 13.5 }}>{t("volunteer.heroSubtitle")}</p>
      </div>

      <div className="panel-block" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 17, marginBottom: 10 }}>{t("volunteer.sectionTitle")}</h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 13, marginTop: 0, marginBottom: 16 }}>
          {t("volunteer.sectionBody")}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="vol-name">{t("volunteer.nameLabel")}</label>
            <input id="vol-name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>

          <div className="field two">
            <div>
              <label htmlFor="vol-email">{t("volunteer.emailLabel")}</label>
              <input
                id="vol-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="vol-phone">{t("volunteer.phoneLabel")}</label>
              <input id="vol-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="vol-message">{t("volunteer.messageLabel")}</label>
            <textarea
              id="vol-message"
              placeholder={t("volunteer.messagePlaceholder")}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              style={{ minHeight: 90 }}
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? t("volunteer.submitting") : t("volunteer.submit")}
          </button>

          {status && <div className={`form-msg ${status.type === "ok" ? "ok" : "err"}`}>{status.message}</div>}
        </form>
      </div>

      <div className="panel-block">
        <h3 style={{ fontSize: 17, marginBottom: 10 }}>{t("volunteer.donateTitle")}</h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 13, margin: 0 }}>
          {(() => {
            // Raw template (no vars passed, so the {{link}} placeholder is
            // left untouched) split around the one spot that needs to stay
            // a real <a> element rather than plain interpolated text.
            const [before, after] = t("volunteer.donateBody").split("{{link}}");
            return (
              <>
                {before}
                <a href="mailto:nisusconcepts@gmail.com?subject=Supporting%20The%20Help%20Haven%20Network">
                  {t("volunteer.donateLink")}
                </a>
                {after}
              </>
            );
          })()}
        </p>
      </div>
    </div>
  );
}
