"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { translations } from "@/lib/i18n";

// Site-wide EN/ES toggle (task 7, 2026-11-09). Client-side only —
// localStorage-backed, no cookies, no SSR language negotiation — so a
// few Server Components (the homepage's tile grid, About/Privacy/Terms)
// were converted to Client Components to be able to read it. Defaults to
// English on first paint everywhere (including for a returning Spanish
// reader, until this effect reads localStorage just after mount) rather
// than guessing from Accept-Language, so server and client markup always
// agree on the very first render and React never complains about a
// hydration mismatch.
const LanguageContext = createContext(null);
const STORAGE_KEY = "hhn_lang";

function getPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function interpolate(value, vars) {
  if (typeof value !== "string" || !vars) return value;
  return value.replace(/\{\{(\w+)\}\}/g, (_, key) => (key in vars ? String(vars[key]) : `{{${key}}}`));
}

function makeTranslator(lang) {
  return function t(path, vars) {
    const dict = translations[lang] || translations.en;
    const value = getPath(dict, path);
    const resolved = value === undefined ? getPath(translations.en, path) : value;
    return interpolate(resolved, vars);
  };
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en") setLangState(saved);
    } catch {
      // localStorage can throw in some privacy modes — language just stays
      // English for that visit, never worth breaking the page over.
    }
  }, []);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Same as above — persistence is a nice-to-have, not a requirement.
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((current) => {
      const next = current === "en" ? "es" : "en";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  const value = {
    lang,
    setLang,
    toggleLang,
    t: makeTranslator(lang),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// Safe to call even outside the provider (falls back to English-only) so a
// component under active development never hard-crashes the page if it's
// momentarily rendered without the wrapper.
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return { lang: "en", setLang: () => {}, toggleLang: () => {}, t: makeTranslator("en") };
  }
  return ctx;
}
