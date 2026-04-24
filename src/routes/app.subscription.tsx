import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock, Crown, Zap, Rocket, Headphones, Plus, Activity, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Route = createFileRoute("/app/subscription")({
  head: () => ({
    meta: [{ title: "Subscription — Anlic Suite" }],
  }),
  component: SubscriptionPage,
});

const tiers = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    icon: Zap,
    current: true,
    volume: 10_000,
    personas: [
      { name: "Morgan — Chief of Staff", unlocked: true },
      { name: "Alex — Supply Chain", unlocked: true },
      { name: "Jordan — Sentiment Analyst", unlocked: true },
    ],
    features: ["3 AI team members", "5 forum spaces", "Basic integrations", "Morning briefings"],
  },
  {
    name: "Pro",
    price: "$129",
    period: "/month",
    icon: Crown,
    current: false,
    volume: 25_000,
    personas: [
      { name: "Morgan — Chief of Staff", unlocked: true },
      { name: "Alex — Supply Chain", unlocked: true },
      { name: "Jordan — Sentiment Analyst", unlocked: true },
      { name: "Riley — BI & Data Science", unlocked: true },
      { name: "Sam — Social Media Manager", unlocked: true },
      { name: "Casey — Customer Success", unlocked: true },
    ],
    features: ["6 AI team members", "Unlimited forums", "All integrations", "Strategy Room", "Priority analysis"],
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/month",
    icon: Rocket,
    current: false,
    volume: 100_000,
    personas: [
      { name: "All Pro personas", unlocked: true },
      { name: "Taylor — Finance Director", unlocked: true },
      { name: "Quinn — Operations Manager", unlocked: true },
      { name: "Drew — Marketing Strategist", unlocked: true },
      { name: "Custom personas", unlocked: true },
    ],
    features: ["10+ AI team members", "Custom personas", "API access", "Dedicated support", "White-label options"],
  },
];

const BUNDLE_SIZE = 10_000;
const BUNDLE_PRICE = 5;

const formatVolume = (n: number) =>
  n >= 1000 ? `${(n / 1000).toLocaleString("en-GB")}k` : n.toLocaleString("en-GB");

const invoices = [
  { id: "INV-001", date: "1 Apr 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-002", date: "1 Mar 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-003", date: "1 Feb 2026", amount: "$49.00", status: "Paid" },
];

function SubscriptionPage() {
  const [selectedTier] = useState("Starter");
  const [bundles, setBundles] = useState(0);
  const usedActions = 7_842; // mock current month usage
  const currentTier = tiers.find((t) => t.name === selectedTier) ?? tiers[0];
  const totalAllowance = currentTier.volume + bundles * BUNDLE_SIZE;
  const usagePct = Math.min(100, Math.round((usedActions / totalAllowance) * 100));
  const remaining = Math.max(0, totalAllowance - usedActions);

  return (
    <div className="p-4 sm:p-6 space-y-8 min-w-0">
      <div>
        <h1 className="font-heading text-xl font-bold text-foreground">Subscription</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your plan and billing.</p>
      </div>

      {/* Tier cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => {
          const isCurrent = tier.name === selectedTier;
          return (
            <div
              key={tier.name}
              className={`rounded-xl border p-5 flex flex-col ${
                isCurrent
                  ? "border-amber/40 bg-amber/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <tier.icon className={`h-5 w-5 ${isCurrent ? "text-amber" : "text-muted-foreground"}`} />
                <h3 className="font-heading text-base font-bold text-foreground">{tier.name}</h3>
                {isCurrent && <Badge className="ml-auto bg-amber/20 text-amber border-0 text-xs">Current</Badge>}
              </div>

              <div className="mb-3">
                <span className="text-2xl font-bold text-foreground">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>

              {/* Volume allowance */}
              <div className="mb-4 flex items-center gap-2 rounded-md border border-border/60 bg-background/40 px-2.5 py-1.5">
                <Activity className="h-3.5 w-3.5 text-amber" />
                <span className="text-xs text-foreground">
                  <span className="font-semibold">{formatVolume(tier.volume)}</span>
                  <span className="text-muted-foreground"> AI actions / mo included</span>
                </span>
              </div>

              {/* Personas */}
              <div className="mb-4 space-y-1.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Team Members</p>
                {tier.personas.map((p) => (
                  <div key={p.name} className="flex items-center gap-2 text-sm">
                    {p.unlocked ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-muted-foreground/40" />
                    )}
                    <span className={p.unlocked ? "text-foreground" : "text-muted-foreground/40"}>{p.name}</span>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-5 space-y-1.5 flex-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Features</p>
                {tier.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="h-3.5 w-3.5 text-amber/60" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full rounded-md py-2 text-sm font-medium transition-colors ${
                  isCurrent
                    ? "bg-muted text-muted-foreground cursor-default"
                    : "bg-amber text-background hover:bg-amber/90"
                }`}
                disabled={isCurrent}
              >
                {isCurrent ? "Current Plan" : "Upgrade"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Volume usage & bundles */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Volume & Bundles</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Your plan includes a monthly allowance of AI actions across all personas. Top up with bundles when you need more headroom.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-amber" />
              <div>
                <p className="text-sm font-semibold text-foreground">This month's usage</p>
                <p className="text-xs text-muted-foreground">
                  {usedActions.toLocaleString("en-GB")} of {totalAllowance.toLocaleString("en-GB")} AI actions used
                </p>
              </div>
            </div>
            <Badge className="bg-amber/15 text-amber border-0 text-xs">{usagePct}%</Badge>
          </div>

          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full transition-all ${usagePct >= 90 ? "bg-rose-500" : usagePct >= 70 ? "bg-amber" : "bg-emerald-400"}`}
              style={{ width: `${usagePct}%` }}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-md border border-border/60 bg-background/40 px-3 py-2">
              <p className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">Plan included</p>
              <p className="text-foreground font-semibold mt-1">{currentTier.volume.toLocaleString("en-GB")}</p>
            </div>
            <div className="rounded-md border border-border/60 bg-background/40 px-3 py-2">
              <p className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">Bundles ({bundles})</p>
              <p className="text-foreground font-semibold mt-1">+{(bundles * BUNDLE_SIZE).toLocaleString("en-GB")}</p>
            </div>
            <div className="rounded-md border border-border/60 bg-background/40 px-3 py-2">
              <p className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">Remaining</p>
              <p className="text-foreground font-semibold mt-1">{remaining.toLocaleString("en-GB")}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-amber mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Volume Bundle</p>
              <p className="text-xs text-muted-foreground mt-1">
                +{formatVolume(BUNDLE_SIZE)} AI actions for ${BUNDLE_PRICE}/mo. Stack as many as you need.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setBundles((b) => Math.max(0, b - 1))}
              className="h-8 w-8 rounded-md border border-border bg-background text-foreground hover:bg-muted disabled:opacity-40"
              disabled={bundles === 0}
              aria-label="Remove bundle"
            >
              −
            </button>
            <span className="min-w-[2.5rem] text-center text-sm font-semibold text-foreground">{bundles}</span>
            <button
              onClick={() => setBundles((b) => b + 1)}
              className="h-8 w-8 rounded-md bg-amber text-background hover:bg-amber/90"
              aria-label="Add bundle"
            >
              +
            </button>
            <span className="ml-3 text-sm font-semibold text-foreground whitespace-nowrap">
              +${bundles * BUNDLE_PRICE}/mo
            </span>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Add-ons</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Standalone personas available on every tier.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {/* Support I */}
          <div className="rounded-xl border border-amber/40 bg-amber/5 p-5 flex flex-col">
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5 text-amber" />
              <h3 className="font-heading text-base font-bold text-foreground">Customer Support I</h3>
              <Badge className="ml-auto bg-amber/20 text-amber border-0 text-xs">Active</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              AI agent that reads tickets and drafts on-brand replies grounded in your FAQs and policies. You stay in control of every send.
            </p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-foreground">$39</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <Link
              to="/app/support"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-muted text-muted-foreground py-2 text-sm font-medium"
            >
              Manage
            </Link>
          </div>

          {/* Support II */}
          <div className="rounded-xl border border-border bg-card p-5 flex flex-col">
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-emerald-400" />
              <h3 className="font-heading text-base font-bold text-foreground">Customer Support II — Agentic</h3>
              <Badge className="ml-auto bg-muted text-muted-foreground border-0 text-xs">Locked</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Everything in Support I, plus the ability to act in Shopify on the customer's behalf — refunds,
              address changes, cancellations and reshipments — within limits you set.
            </p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-foreground">+$10</span>
              <span className="text-sm text-muted-foreground">/month</span>
              <p className="text-[11px] text-muted-foreground mt-1">Requires Customer Support I.</p>
            </div>
            <button className="mt-4 inline-flex items-center justify-center rounded-md bg-emerald-400 text-background py-2 text-sm font-medium hover:bg-emerald-400/90">
              Unlock Support II
            </button>
          </div>
        </div>
      </section>

      {/* Billing */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Billing History</h2>
        <div className="rounded-lg border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Invoice</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-foreground">{inv.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inv.date}</td>
                  <td className="px-4 py-3 text-foreground">{inv.amount}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="text-xs">{inv.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Payment Method</p>
          <p className="text-sm text-foreground">•••• •••• •••• 4242</p>
          <p className="text-xs text-muted-foreground mt-1">Expires 12/27</p>
        </div>
      </section>
    </div>
  );
}
