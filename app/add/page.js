"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CATEGORIES, categoryLabel } from "@/lib/categories";
import { useLanguage } from "@/components/LanguageProvider";

const EMPTY_FORM = {
  submitter_type: "individual",
  name: "",
  category: CATEGORIES[0].slug,
  description: "",
  phone: "",
  area: "",
  address: "",
  hours: "",
  requirements: "",
  website: "",
  note: "",
};

// Labels, placeholders, and messages read the EN/ES language context
// (task 7, 2026-11-09). The category dropdown shows the translated
// label but still submits the same English `slug` either way — category
// is stored and matched by slug everywhere else in the app, so nothing
// downstream needed to change.
export default function AddResourcePage() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(null); // { type: 'ok' | 'err', message }
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    if (form.submitter_type === "organization" && !form.phone.trim() && !form.website.trim()) {
      setStatus({ type: "err", message: t("add.orgContactRequired") });
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("submissions").insert({
      ...form,
      status: "pending",
    });

    setSubmitting(false);
    if (error) {
      setStatus({ type: "err", message: t("add.errPrefix", { error: error.message }) });
    } else {
      setStatus({ type: "ok", message: t("add.ok") });
      setForm(EMPTY_FORM);
    }
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div className="hero-panel" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, marginBottom: 6 }}>{t("add.title")}</h2>
        <p style={{ color: "var(--ink-soft)", margin: 0, fontSize: 13.5 }}>{t("add.subtitle")}</p>
      </div>

      <div className="panel-block">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>{t("add.whoLabel")}</label>
          <div style={{ display: "flex", gap: 16, fontSize: 14 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
              <input
                type="radio"
                name="submitter_type"
                checked={form.submitter_type === "individual"}
                onChange={() => update("submitter_type", "individual")}
              />
              {t("add.whoIndividual")}
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
              <input
                type="radio"
                name="submitter_type"
                checked={form.submitter_type === "organization"}
                onChange={() => update("submitter_type", "organization")}
              />
              {t("add.whoOrg")}
            </label>
          </div>
          {form.submitter_type === "organization" && (
            <p style={{ color: "var(--ink-soft)", fontSize: 12.5, marginTop: 8, marginBottom: 0 }}>
              {t("add.orgContactHint")}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="s-name">{t("add.nameLabel")}</label>
          <input id="s-name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="s-category">{t("add.categoryLabel")}</label>
          <select id="s-category" required value={form.category} onChange={(e) => update("category", e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {categoryLabel(c, lang)}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="s-desc">{t("add.descLabel")}</label>
          <textarea
            id="s-desc"
            required
            placeholder={t("add.descPlaceholder")}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        <div className="field two">
          <div>
            <label htmlFor="s-phone">{t("add.phoneLabel")}</label>
            <input id="s-phone" type="tel" placeholder={t("add.phonePlaceholder")} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div>
            <label htmlFor="s-area">{t("add.areaLabel")}</label>
            <input id="s-area" placeholder={t("add.areaPlaceholder")} value={form.area} onChange={(e) => update("area", e.target.value)} />
          </div>
        </div>

        <div className="field">
          <label htmlFor="s-address">{t("add.addressLabel")}</label>
          <input id="s-address" placeholder={t("add.addressPlaceholder")} value={form.address} onChange={(e) => update("address", e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="s-hours">{t("add.hoursLabel")}</label>
          <input
            id="s-hours"
            placeholder={t("add.hoursPlaceholder")}
            value={form.hours}
            onChange={(e) => update("hours", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="s-requirements">{t("add.requirementsLabel")}</label>
          <textarea
            id="s-requirements"
            placeholder={t("add.requirementsPlaceholder")}
            value={form.requirements}
            onChange={(e) => update("requirements", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="s-website">{t("add.websiteLabel")}</label>
          <input id="s-website" type="url" placeholder="https://" value={form.website} onChange={(e) => update("website", e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="s-note">{t("add.noteLabel")}</label>
          <textarea id="s-note" value={form.note} onChange={(e) => update("note", e.target.value)} />
        </div>

        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? t("add.submitting") : t("add.submit")}
        </button>

        {status && <div className={`form-msg ${status.type === "ok" ? "ok" : "err"}`}>{status.message}</div>}
      </form>
      </div>
    </div>
  );
}
