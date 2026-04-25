import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  CheckCircle2,
  Globe,
  Target,
  Users,
  Megaphone,
} from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { trialService, type BusinessProfile, type TrialAccount } from "@/services/trial";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Brief your Chief of Staff — Anlic Suite" },
      {
        name: "description",
        content:
          "A 5-minute briefing so your AI C-suite knows your business, channels, and goals from day one.",
      },
      { property: "og:title", content: "Brief your Chief of Staff — Anlic Suite" },
      {
        property: "og:description",
        content:
          "A 5-minute briefing so your AI C-suite knows your business, channels, and goals from day one.",
      },
    ],
  }),
  component: OnboardingPage,
});

const CHANNELS = [
  "Shopify",
  "WooCommerce",
  "Etsy",
  "Amazon",
  "eBay",
  "TikTok Shop",
  "Instagram",
  "Wholesale",
  "Own website",
  "Pop-ups / Markets",
] as const;

const REVENUE_RANGES = [
  "Pre-revenue",
  "Under $10k / month",
  "$10k – $50k / month",
  "$50k – $250k / month",
  "$250k – $1M / month",
  "$1M+ / month",
] as const;

const CONSTRAINTS = [
  "Traffic / discovery",
  "Conversion rate",
  "Average order value",
  "Fulfilment / logistics",
  "Customer support load",
  "Inventory / supply chain",
  "Cash flow",
  "Team capacity",
] as const;

const GOALS = [
  "Grow revenue",
  "Expand to new channels",
  "Launch new products",
  "Improve margins",
  "Reduce manual work",
  "Raise investment",
] as const;

type Step = 0 | 1 | 2 | 3 | 4;
const STEP_LABELS = ["Website", "Channels", "Goals", "Audience", "Review"] as const;

function OnboardingPage() {
  const navigate = useNavigate();
  const [account, setAccount] = useState<TrialAccount | null>(null);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [step, setStep] = useState<Step>(0);

  // Step 0 — auto-discovery
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<
    | { companyName?: string; platform?: string; category?: string; productCount?: number }
    | null
  >(null);
  const [confirmedName, setConfirmedName] = useState("");
  const [confirmedCategory, setConfirmedCategory] = useState("");

  // Step 1 — channels
  const [channels, setChannels] = useState<string[]>([]);
  const [revenueRange, setRevenueRange] = useState<string>("");

  // Step 2 — goals
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [biggestConstraint, setBiggestConstraint] = useState("");

  // Step 3 — audience
  const [audience, setAudience] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const acc = await trialService.getCurrentAccount();
      if (cancelled) return;
      if (!acc) {
        navigate({ to: "/signup" });
        return;
      }
      setAccount(acc);
      // Pre-fill website + name from signup
      setWebsiteUrl(`https://${acc.companyDomain}`);
      setConfirmedName(acc.companyName);
      setLoadingAccount(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  async function handleScan() {
    if (!websiteUrl.trim()) return;
    setScanning(true);
    try {
      const result = await trialService.scanWebsite(websiteUrl);
      setScanResult(result);
      if (result.companyName && !confirmedName) setConfirmedName(result.companyName);
      if (result.category) setConfirmedCategory(result.category);
    } finally {
      setScanning(false);
    }
  }

  function toggleChannel(channel: string) {
    setChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  }

  function canAdvance(): boolean {
    switch (step) {
      case 0:
        return !!confirmedName.trim();
      case 1:
        return channels.length > 0 && !!revenueRange;
      case 2:
        return !!primaryGoal && !!biggestConstraint;
      case 3:
        return audience.trim().length > 0;
      case 4:
        return true;
    }
  }

  async function handleFinish() {
    if (!account) return;
    setSubmitting(true);
    const profile: BusinessProfile = {
      accountId: account.id,
      detectedCompanyName: scanResult?.companyName,
      detectedPlatform: scanResult?.platform,
      detectedCategory: scanResult?.category,
      detectedProductCount: scanResult?.productCount,
      channels,
      monthlyRevenueRange: revenueRange,
      primaryGoal,
      biggestConstraint,
      audience,
      competitors,
      notes,
    };
    await trialService.saveBusinessProfile(profile);
    navigate({ to: "/app/dashboard" });
  }

  if (loadingAccount) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-amber" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="h-16 border-b border-edge bg-panel/80 backdrop-blur-md flex items-center justify-between px-6 md:px-8">
        <Link to="/">
          <BrandMark size="md" />
        </Link>
        <p className="text-xs font-mono uppercase tracking-widest text-steel">
          Briefing in progress
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-6 md:px-8 py-10">
        {/* Chief of Staff bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-full border border-amber/50 bg-amber/10 flex items-center justify-center">
            <span className="font-serif-display italic text-amber text-lg">CoS</span>
          </div>
          <div>
            <p className="text-sm font-medium text-flight">Your Chief of Staff</p>
            <p className="text-xs text-steel">
              I'll brief the rest of the C-suite on what you tell me.
            </p>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1.5">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex items-center gap-1.5">
                <div
                  className={`h-1 rounded-full transition-all ${
                    i <= step ? "bg-amber w-8" : "bg-edge w-6"
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-steel">
            Step {step + 1} of {STEP_LABELS.length} · {STEP_LABELS[step]}
          </p>
        </div>

        {/* Steps */}
        {step === 0 && (
          <StepCard
            icon={<Globe className="w-5 h-5" />}
            title="Let's start with your website"
            subtitle="I'll scan it and pre-fill what I can. You can correct anything that's wrong."
          >
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-steel">
                Primary URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="flex-1 bg-surface border border-edge rounded-sm px-4 py-3 text-sm text-flight focus:outline-none focus:border-amber"
                  placeholder="https://your-store.com"
                />
                <button
                  onClick={handleScan}
                  disabled={scanning || !websiteUrl.trim()}
                  className="px-5 py-3 bg-surface border border-amber text-amber text-xs font-mono uppercase rounded-sm hover:bg-amber hover:text-panel disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center gap-2"
                >
                  {scanning ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  Scan
                </button>
              </div>
            </div>

            {scanResult && (
              <div className="border border-amber/30 bg-amber/5 rounded-sm p-4">
                <p className="text-xs font-mono uppercase tracking-widest text-amber mb-3">
                  ● Auto-detected
                </p>
                <dl className="space-y-1.5 text-sm">
                  <Row label="Company" value={scanResult.companyName} />
                  <Row label="Platform" value={scanResult.platform} />
                  <Row label="Category" value={scanResult.category} />
                  <Row
                    label="Catalogue"
                    value={
                      scanResult.productCount
                        ? `~${scanResult.productCount} products`
                        : undefined
                    }
                  />
                </dl>
              </div>
            )}

            <div className="space-y-4 pt-2">
              <FieldText
                label="Confirm company name"
                value={confirmedName}
                onChange={setConfirmedName}
                placeholder="As it should appear to your team"
              />
              <FieldText
                label="Category (what you sell)"
                value={confirmedCategory}
                onChange={setConfirmedCategory}
                placeholder="e.g. Handmade ceramics, fitness apparel, B2B SaaS"
              />
            </div>
          </StepCard>
        )}

        {step === 1 && (
          <StepCard
            icon={<Megaphone className="w-5 h-5" />}
            title="Where do you sell?"
            subtitle="Pick every channel you actively sell on. This shapes how your CMO and CCO advise you."
          >
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-steel mb-3">
                Sales channels
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CHANNELS.map((c) => {
                  const active = channels.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleChannel(c)}
                      className={`px-3 py-2.5 text-sm rounded-sm border transition-all ${
                        active
                          ? "border-amber bg-amber/10 text-amber"
                          : "border-edge text-steel hover:border-steel"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-steel mb-3">
                Approximate monthly revenue
              </label>
              <div className="grid grid-cols-2 gap-2">
                {REVENUE_RANGES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRevenueRange(r)}
                    className={`px-3 py-2.5 text-sm text-left rounded-sm border transition-all ${
                      revenueRange === r
                        ? "border-amber bg-amber/10 text-amber"
                        : "border-edge text-steel hover:border-steel"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </StepCard>
        )}

        {step === 2 && (
          <StepCard
            icon={<Target className="w-5 h-5" />}
            title="What are you trying to achieve?"
            subtitle="I'll make sure every persona starts the day focused on this."
          >
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-steel mb-3">
                Primary goal (next 90 days)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {GOALS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setPrimaryGoal(g)}
                    className={`px-3 py-2.5 text-sm text-left rounded-sm border transition-all ${
                      primaryGoal === g
                        ? "border-amber bg-amber/10 text-amber"
                        : "border-edge text-steel hover:border-steel"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-steel mb-3">
                Biggest constraint right now
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CONSTRAINTS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setBiggestConstraint(c)}
                    className={`px-3 py-2.5 text-sm text-left rounded-sm border transition-all ${
                      biggestConstraint === c
                        ? "border-amber bg-amber/10 text-amber"
                        : "border-edge text-steel hover:border-steel"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </StepCard>
        )}

        {step === 3 && (
          <StepCard
            icon={<Users className="w-5 h-5" />}
            title="Tell me about your customers"
            subtitle="The more specific the better. Your CMO and CXO will use this to shape every recommendation."
          >
            <FieldTextarea
              label="Who is your ideal customer?"
              value={audience}
              onChange={setAudience}
              placeholder="e.g. UK women 30–55 who buy sustainable homeware, AOV £45–£80…"
            />
            <FieldTextarea
              label="Top 1–3 competitors (optional)"
              value={competitors}
              onChange={setCompetitors}
              placeholder="e.g. East London Pottery, Acme Studios"
            />
            <FieldTextarea
              label="Anything else I should brief the team on? (optional)"
              value={notes}
              onChange={setNotes}
              placeholder="Constraints, recent launches, things to avoid…"
            />
          </StepCard>
        )}

        {step === 4 && (
          <StepCard
            icon={<CheckCircle2 className="w-5 h-5" />}
            title="Ready to brief the team?"
            subtitle="Here's what I'll share with your C-suite. You can edit any of this later in Settings."
          >
            <div className="space-y-3 text-sm">
              <Summary label="Company" value={confirmedName} />
              <Summary
                label="Website"
                value={websiteUrl}
              />
              <Summary label="Category" value={confirmedCategory || "—"} />
              <Summary
                label="Channels"
                value={channels.length ? channels.join(", ") : "—"}
              />
              <Summary label="Monthly revenue" value={revenueRange || "—"} />
              <Summary label="Primary goal" value={primaryGoal || "—"} />
              <Summary label="Biggest constraint" value={biggestConstraint || "—"} />
              <Summary label="Ideal customer" value={audience || "—"} />
              {competitors && <Summary label="Competitors" value={competitors} />}
              {notes && <Summary label="Notes" value={notes} />}
            </div>
          </StepCard>
        )}

        {/* Nav */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
            disabled={step === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm text-steel hover:text-flight disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep((s) => Math.min(4, s + 1) as Step)}
              disabled={!canAdvance()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber text-panel text-sm font-mono uppercase tracking-wider rounded-sm hover:bg-amber/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber text-panel text-sm font-mono uppercase tracking-wider rounded-sm hover:bg-amber/90 disabled:opacity-50 transition-all"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Briefing the team…
                </>
              ) : (
                <>
                  Brief the team <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function StepCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-edge bg-panel rounded-md p-6 md:p-8 space-y-6">
      <header>
        <div className="inline-flex items-center gap-2 text-amber mb-3">
          {icon}
          <span className="text-xs font-mono uppercase tracking-widest">
            Briefing
          </span>
        </div>
        <h2 className="font-serif-display italic text-3xl mb-2">{title}</h2>
        <p className="text-sm text-steel">{subtitle}</p>
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function FieldText({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-steel mb-2">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={255}
        className="w-full bg-surface border border-edge rounded-sm px-4 py-3 text-sm text-flight placeholder:text-steel/50 focus:outline-none focus:border-amber"
      />
    </div>
  );
}

function FieldTextarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-steel mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={1000}
        rows={3}
        className="w-full bg-surface border border-edge rounded-sm px-4 py-3 text-sm text-flight placeholder:text-steel/50 focus:outline-none focus:border-amber resize-none"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-steel">{label}</dt>
      <dd className="text-flight text-right">{value ?? "—"}</dd>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-edge/60">
      <span className="text-steel text-xs font-mono uppercase tracking-wider">
        {label}
      </span>
      <span className="text-flight text-right max-w-[60%]">{value}</span>
    </div>
  );
}
