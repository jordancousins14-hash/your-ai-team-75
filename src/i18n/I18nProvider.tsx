import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALES, dictionaries, type LocaleCode } from "./locales";

type AiCache = Record<string, Record<string, string>>; // locale -> key -> translation

type I18nContextValue = {
  locale: LocaleCode;
  setLocale: (l: LocaleCode) => void;
  timezone: string;
  setTimezone: (tz: string) => void;
  t: (key: string, fallback?: string) => string;
  /**
   * Translate an arbitrary string via Lovable AI Gateway when no static
   * dictionary entry exists. Returns the original text immediately and
   * updates asynchronously when AI translation is available. Currently
   * a stub — wires up cleanly once Lovable Cloud is enabled.
   */
  tDynamic: (text: string) => string;
};

const STORAGE_LOCALE = "anlic.locale";
const STORAGE_TZ = "anlic.timezone";

const I18nContext = createContext<I18nContextValue | null>(null);

function detectInitialLocale(): LocaleCode {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(STORAGE_LOCALE) as LocaleCode | null;
  if (stored && LOCALES.some((l) => l.code === stored)) return stored;
  const nav = window.navigator?.language ?? "";
  const match = LOCALES.find((l) => nav.toLowerCase().startsWith(l.code.toLowerCase()))
    ?? LOCALES.find((l) => nav.toLowerCase().startsWith(l.code.split("-")[0]));
  return (match?.code as LocaleCode) ?? DEFAULT_LOCALE;
}

function detectInitialTimezone(): string {
  if (typeof window === "undefined") return "UTC";
  const stored = window.localStorage.getItem(STORAGE_TZ);
  if (stored) return stored;
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE);
  const [timezone, setTimezoneState] = useState<string>("UTC");
  const [aiCache, setAiCache] = useState<AiCache>({});

  // Hydrate from browser after mount (avoids SSR mismatch)
  useEffect(() => {
    setLocaleState(detectInitialLocale());
    setTimezoneState(detectInitialTimezone());
  }, []);

  const setLocale = useCallback((l: LocaleCode) => {
    setLocaleState(l);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_LOCALE, l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }, []);

  const setTimezone = useCallback((tz: string) => {
    setTimezoneState(tz);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_TZ, tz);
  }, []);

  const t = useCallback(
    (key: string, fallback?: string) => {
      const dict = dictionaries[locale] ?? {};
      if (dict[key]) return dict[key];
      const base = dictionaries[DEFAULT_LOCALE]?.[key];
      return base ?? fallback ?? key;
    },
    [locale],
  );

  const tDynamic = useCallback(
    (text: string) => {
      if (locale === DEFAULT_LOCALE || locale === "en-US") return text;
      const cached = aiCache[locale]?.[text];
      if (cached) return cached;
      // AI translation hook — to be wired to Lovable AI Gateway when Cloud is enabled.
      // For now, return original text; cache structure is ready for async fill.
      return text;
    },
    [locale, aiCache],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, timezone, setTimezone, t, tDynamic }),
    [locale, setLocale, timezone, setTimezone, t, tDynamic],
  );

  // Reference to suppress unused-setter lint until AI fallback is wired
  void setAiCache;

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
