import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/i18n/I18nProvider";
import { LOCALES, type LocaleCode } from "@/i18n/locales";
import { TIMEZONES, formatInTimezone } from "@/i18n/timezones";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [{ title: "Settings — Idon Suite" }],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { t, locale, setLocale, timezone, setTimezone } = useI18n();
  const [fontSize, setFontSize] = useState(50);
  const [compactMode, setCompactMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  const fontLabel =
    fontSize < 33 ? t("common.small", "Small") : fontSize < 66 ? t("common.medium", "Medium") : t("common.large", "Large");

  const grouped = TIMEZONES.reduce<Record<string, typeof TIMEZONES>>((acc, tz) => {
    (acc[tz.group] ||= []).push(tz);
    return acc;
  }, {});

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-8 min-w-0">
      <div>
        <h1 className="font-heading text-xl font-bold text-foreground">{t("settings.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("settings.subtitle")}</p>
      </div>

      {/* Language & Region */}
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          {t("settings.region")}
        </h2>

        <div className="rounded-lg border border-border bg-card p-4 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <Label className="text-sm text-foreground">{t("settings.language")}</Label>
                <p className="text-xs text-muted-foreground mt-0.5">{t("settings.language.help")}</p>
              </div>
              <Select value={locale} onValueChange={(v) => setLocale(v as LocaleCode)}>
                <SelectTrigger className="w-44 shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LOCALES.map((l) => (
                    <SelectItem key={l.code} value={l.code}>
                      <span className="mr-2">{l.flag}</span>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <Label className="text-sm text-foreground">{t("settings.timezone")}</Label>
                <p className="text-xs text-muted-foreground mt-0.5">{t("settings.timezone.help")}</p>
              </div>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="w-56 shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {Object.entries(grouped).map(([group, items]) => (
                    <SelectGroup key={group}>
                      <SelectLabel>{group}</SelectLabel>
                      {items.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{t("settings.currentTime")}</span>
              <span className="font-mono text-amber">{formatInTimezone(now, timezone, locale)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">{t("settings.appearance")}</h2>

        <div className="rounded-lg border border-border bg-card p-4 space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-foreground">{t("settings.fontSize")}</Label>
              <span className="text-xs font-medium text-amber">{fontLabel}</span>
            </div>
            <Slider
              value={[fontSize]}
              onValueChange={([v]) => setFontSize(v)}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{t("common.small", "Small")}</span>
              <span>{t("common.medium", "Medium")}</span>
              <span>{t("common.large", "Large")}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">{t("settings.compactMode")}</Label>
              <p className="text-xs text-muted-foreground mt-0.5">{t("settings.compactMode.help")}</p>
            </div>
            <Switch checked={compactMode} onCheckedChange={setCompactMode} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">{t("settings.theme")}</Label>
              <p className="text-xs text-muted-foreground mt-0.5">{t("settings.theme.help")}</p>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{t("settings.themeBadge")}</span>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">{t("settings.notifications")}</h2>

        <div className="rounded-lg border border-border bg-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">{t("settings.email")}</Label>
              <p className="text-xs text-muted-foreground mt-0.5">{t("settings.email.help")}</p>
            </div>
            <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">{t("settings.push")}</Label>
              <p className="text-xs text-muted-foreground mt-0.5">{t("settings.push.help")}</p>
            </div>
            <Switch checked={pushNotifs} onCheckedChange={setPushNotifs} />
          </div>
        </div>
      </section>

      {/* Account */}
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">{t("settings.account")}</h2>

        <div className="rounded-lg border border-border bg-card p-4 space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">{t("settings.displayName")}</Label>
            <p className="text-sm text-foreground mt-0.5">Business Owner</p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">{t("settings.emailLabel")}</Label>
            <p className="text-sm text-foreground mt-0.5">owner@mybusiness.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
