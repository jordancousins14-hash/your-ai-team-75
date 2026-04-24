import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [{ title: "Settings — Anlic Suite" }],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [fontSize, setFontSize] = useState(50);
  const [compactMode, setCompactMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  const fontLabel = fontSize < 33 ? "Small" : fontSize < 66 ? "Medium" : "Large";

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-8 min-w-0">
      <div>
        <h1 className="font-heading text-xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Customise your portal experience.</p>
      </div>

      {/* Appearance */}
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Appearance</h2>

        <div className="rounded-lg border border-border bg-card p-4 space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-foreground">Font Size</Label>
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
              <span>Small</span>
              <span>Medium</span>
              <span>Large</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">Compact Mode</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Reduce spacing and padding throughout.</p>
            </div>
            <Switch checked={compactMode} onCheckedChange={setCompactMode} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">Theme</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Dark mode is the default Flight Deck theme.</p>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Dark (default)</span>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Notifications</h2>

        <div className="rounded-lg border border-border bg-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">Email Notifications</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Daily digest and alerts.</p>
            </div>
            <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">Push Notifications</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time alerts to your device.</p>
            </div>
            <Switch checked={pushNotifs} onCheckedChange={setPushNotifs} />
          </div>
        </div>
      </section>

      {/* Account */}
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Account</h2>

        <div className="rounded-lg border border-border bg-card p-4 space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Display Name</Label>
            <p className="text-sm text-foreground mt-0.5">Business Owner</p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Email</Label>
            <p className="text-sm text-foreground mt-0.5">owner@mybusiness.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
