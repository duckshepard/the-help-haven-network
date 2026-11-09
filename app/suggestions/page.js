"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/components/LanguageProvider";

const EMPTY_FORM = { name: "", email: "", message: "" };

// A lightweight way for anyone using the site to tell us what would make
// it better — a missing feature, a confusing page, a resource that's hard
// to find. Deliberately simple: no categories, no required contact info,
// just "what would help." Submissions land in Supabase (RLS-gated the
// same way "submissions" is: anyone can insert, only admins can read).
//
// Labels and messages read the EN/ES language context (task 7,
// 2026-11-09); the submission itself is stored exactly as typed,
// whichever language that was in.
export default function SuggestionsPage() {
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

    const { error } = await supabase.from("suggestions").insert({
      name: form.name || null,
      email: form.email || null,
      message: form.message,
    });

    setSubmitting(false);
    if (error) {
      setStatus({ type: "err", message: t("suggestions.errPrefix", { error: error.message }) });
    } else {
      setStatus({ type: "ok", message: t("suggestions.ok") });
      setForm(EMPTY_FORM);
    }
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div className="hero-panel" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, marginBottom: 6 }}>{t("suggestions.title")}</h2>
        <p style={{ color: "var(--ink-soft)", margin: 0, fontSize: 13.5 }}>{t("suggestions.subtitle")}</p>
      </div>

      <div className="panel-block">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="sg-message">{t("suggestions.messageLabel")}</label>
            <textarea
              id="sg-message"
              required
              placeholder={t("suggestions.messagePlaceholder")}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              style={{ minHeight: 120 }}
            />
          </div>

          <div className="field two">
            <div>
              <label htmlFor="sg-name">{t("suggestions.nameLabel")}</label>
              <input id="sg-name" value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div>
              <label htmlFor="sg-email">{t("suggestions.emailLabel")}</label>
              <input
                id="sg-email"
                type="email"
                placeholder={t("suggestions.emailPlaceholder")}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? t("suggestions.submitting") : t("suggestions.submit")}
          </button>

          {status && <div className={`form-msg ${status.type === "ok" ? "ok" : "err"}`}>{status.message}</div>}
        </form>
      </div>
    </div>
  );
}
