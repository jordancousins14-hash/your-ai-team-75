import { createFileRoute, Link } from "@tanstack/react-router";
import { Headphones, Mail, MessageCircle, Phone, MessagesSquare, BookOpen, TriangleAlert as AlertTriangle, Check, Sparkles, Lock, Zap, ShieldCheck, RefreshCw, Truck, Wand as Wand2 } from "lucide-react";
import { IntegrationLogo } from "@/components/integrations/IntegrationLogo";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Route = createFileRoute("/app/support")({
  head: () => ({
    meta: [{ title: "Customer Support — Idon Suite" }],
  }),
  component: SupportPage,
});

// Toggle to preview the locked (not-yet-purchased) state.
const ADDON_PURCHASED = true;

const channels = [
  { id: "email", label: "Email", icon: Mail, enabled: true, hint: "Triaged + drafted replies for owner approval" },
  { id: "chat", label: "Live Chat", icon: MessageCircle, enabled: true, hint: "Real-time conversations on your storefront" },
  { id: "social", label: "Social DMs", icon: MessagesSquare, enabled: false, hint: "Instagram, Facebook, TikTok inboxes" },
  { id: "voice", label: "Voice", icon: Phone, enabled: false, hint: "AI-handled phone support (beta)" },
];

const integrations = [
  { name: "Gorgias",   slug: "gorgias",   connected: true },
  { name: "Zendesk",   slug: "zendesk",   connected: false },
  { name: "Intercom",  slug: "intercom",  connected: false },
  { name: "Front",     slug: "front",     connected: false },
  { name: "Freshdesk", slug: "freshdesk", connected: false },
  { name: "HelpScout", slug: "helpscout", connected: false },
];

const tones = ["Warm & friendly", "Professional", "Playful", "Concise", "Custom"];

// Mock knowledge readiness — wire to real Knowledge module later.
const knowledgeReadiness = {
  policies: true,
  products: true,
  brandVoice: false,
  faqs: true,
};

function SupportPage() {
  const [enabledChannels, setEnabledChannels] = useState(
    Object.fromEntries(channels.map((c) => [c.id, c.enabled])),
  );
  const [tone, setTone] = useState("Warm & friendly");
  const [autoReply, setAutoReply] = useState(false);
  const [escalateThreshold, setEscalateThreshold] = useState(3);
  // Support II (Agentic) — separate paid unlock on top of the base Support add-on.
  const [supportIIUnlocked, setSupportIIUnlocked] = useState(false);
  const [agenticActions, setAgenticActions] = useState({
    refunds: true,
    addressChange: true,
    cancelOrder: false,
    reshipOrder: false,
  });
  const [refundCap, setRefundCap] = useState(50);

  const knowledgeComplete = Object.values(knowledgeReadiness).every(Boolean);

  if (!ADDON_PURCHASED) {
    return <LockedState />;
  }

  return (
    <div className="p-4 sm:p-6 space-y-8 min-w-0">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber/15 ring-1 ring-amber/30">
          <Headphones className="h-6 w-6 text-amber" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-heading text-xl font-bold text-foreground">Customer Support</h1>
            <Badge className="bg-amber/20 text-amber border-0 text-xs">Add-on · Active</Badge>
            {supportIIUnlocked ? (
              <Badge className="bg-emerald-400/15 text-emerald-400 border-0 text-xs">Support II · Agentic</Badge>
            ) : (
              <Badge className="bg-muted text-muted-foreground border-0 text-xs">Support I · Read & Reply</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {supportIIUnlocked
              ? "An agentic AI teammate that reads tickets, replies, and takes action in your store on your behalf."
              : "An AI agent that reads tickets and drafts replies grounded in your FAQs and policies."}
          </p>
        </div>
      </div>

      {/* Knowledge dependency banner */}
      {!knowledgeComplete && (
        <div className="rounded-xl border border-amber/40 bg-amber/5 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">Knowledge base incomplete</p>
            <p className="text-xs text-muted-foreground mt-1">
              Support quality depends on what your AI knows. Add the missing items below or link an external knowledge base.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {Object.entries(knowledgeReadiness).map(([key, ready]) => (
                <div key={key} className="flex items-center gap-2">
                  {ready ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="h-3.5 w-3.5 text-amber" />
                  )}
                  <span className={ready ? "text-foreground/80" : "text-amber"}>
                    {key === "brandVoice" ? "Brand voice & tone" : key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to="/app/knowledge"
              className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-amber hover:text-amber/80"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Open Knowledge
            </Link>
          </div>
        </div>
      )}

      {/* Channels */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Support Channels</h2>
          <p className="text-xs text-muted-foreground mt-1">Choose where this persona is allowed to operate.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {channels.map((c) => {
            const on = enabledChannels[c.id];
            return (
              <button
                key={c.id}
                onClick={() => setEnabledChannels((p) => ({ ...p, [c.id]: !p[c.id] }))}
                className={`text-left rounded-xl border p-4 transition-colors ${
                  on ? "border-amber/40 bg-amber/5" : "border-border bg-card hover:border-border/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <c.icon className={`h-5 w-5 ${on ? "text-amber" : "text-muted-foreground"}`} />
                  <span className="font-medium text-sm text-foreground">{c.label}</span>
                  <span
                    className={`ml-auto text-[10px] uppercase tracking-wider font-semibold ${
                      on ? "text-amber" : "text-muted-foreground/70"
                    }`}
                  >
                    {on ? "On" : "Off"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{c.hint}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Integrations */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Helpdesk Integrations</h2>
          <p className="text-xs text-muted-foreground mt-1">Connect the system that holds your tickets.</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((i) => (
            <div
              key={i.name}
              className="rounded-lg border border-border bg-card p-3 flex items-center gap-3"
            >
              <div className={`h-7 w-7 flex items-center justify-center rounded-sm p-1 ${i.connected ? "bg-emerald-400/10" : "bg-muted/50"}`}>
                <IntegrationLogo slug={i.slug} name={i.name} size={18} />
              </div>
              <span className="text-sm text-foreground">{i.name}</span>
              <button
                className={`ml-auto text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${
                  i.connected
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {i.connected ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Tier — Support I vs Support II */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Capability Tier</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Decide how much your support agent is allowed to do on its own.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {/* Support I */}
          <div className="rounded-xl border border-amber/40 bg-amber/5 p-4 flex flex-col">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber" />
              <span className="font-semibold text-sm text-foreground">Support I — Read & Reply</span>
              <Badge className="ml-auto bg-amber/20 text-amber border-0 text-[10px]">Included</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Reads incoming tickets and drafts on-brand replies using your FAQs and policies. Cannot make changes
              to your store — every action stays with you.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-foreground/80">
              <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-amber" /> Drafts replies for approval</li>
              <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-amber" /> Grounded in your knowledge base</li>
              <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-amber" /> Escalates anything it's unsure about</li>
            </ul>
          </div>

          {/* Support II */}
          <div
            className={`rounded-xl border p-4 flex flex-col transition-colors ${
              supportIIUnlocked ? "border-emerald-400/40 bg-emerald-400/5" : "border-border bg-card"
            }`}
          >
            <div className="flex items-center gap-2">
              <Zap className={`h-4 w-4 ${supportIIUnlocked ? "text-emerald-400" : "text-muted-foreground"}`} />
              <span className="font-semibold text-sm text-foreground">Support II — Agentic</span>
              {supportIIUnlocked ? (
                <Badge className="ml-auto bg-emerald-400/15 text-emerald-400 border-0 text-[10px]">Unlocked</Badge>
              ) : (
                <Badge className="ml-auto bg-muted text-muted-foreground border-0 text-[10px]">+ $10/mo</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Everything in Support I, plus the ability to take action in Shopify on the customer's behalf — refunds,
              address changes, cancellations and reshipments — within the limits you set.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-foreground/80">
              <li className="flex items-center gap-2"><RefreshCw className="h-3.5 w-3.5 text-emerald-400" /> Issue refunds (capped)</li>
              <li className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-emerald-400" /> Update shipping addresses</li>
              <li className="flex items-center gap-2"><Wand2 className="h-3.5 w-3.5 text-emerald-400" /> Cancel & reship orders</li>
            </ul>

            <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-border/60">
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground">
                  {supportIIUnlocked ? "Agentic actions enabled" : "Unlock agentic actions"}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {supportIIUnlocked
                    ? "Toggle off to revert to draft-only Support I behaviour."
                    : "A further paid unlock on top of Customer Support."}
                </p>
              </div>
              <button
                onClick={() => setSupportIIUnlocked((v) => !v)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  supportIIUnlocked ? "bg-emerald-400" : "bg-muted"
                }`}
                aria-label="Toggle Support II"
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform ${
                    supportIIUnlocked ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Agentic action permissions — only meaningful when Support II is on */}
        <div
          className={`rounded-xl border p-4 transition-opacity ${
            supportIIUnlocked ? "border-border bg-card" : "border-border bg-card/40 opacity-60"
          }`}
        >
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-emerald-400" />
            <p className="text-sm font-medium text-foreground">Agentic permissions</p>
            {!supportIIUnlocked && (
              <Badge className="ml-auto bg-muted text-muted-foreground border-0 text-[10px]">
                <Lock className="h-3 w-3 mr-1" /> Support II required
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Choose exactly which write actions your agent may perform in Shopify without asking you first.
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              { key: "refunds" as const, label: "Issue refunds", icon: RefreshCw },
              { key: "addressChange" as const, label: "Change shipping address", icon: Truck },
              { key: "cancelOrder" as const, label: "Cancel orders", icon: AlertTriangle },
              { key: "reshipOrder" as const, label: "Reship orders", icon: Wand2 },
            ].map((a) => {
              const on = agenticActions[a.key] && supportIIUnlocked;
              return (
                <button
                  key={a.key}
                  disabled={!supportIIUnlocked}
                  onClick={() =>
                    setAgenticActions((p) => ({ ...p, [a.key]: !p[a.key] }))
                  }
                  className={`text-left rounded-lg border p-3 flex items-center gap-3 transition-colors ${
                    on
                      ? "border-emerald-400/40 bg-emerald-400/5"
                      : "border-border bg-background hover:border-border/80 disabled:hover:border-border"
                  } disabled:cursor-not-allowed`}
                >
                  <a.icon className={`h-4 w-4 ${on ? "text-emerald-400" : "text-muted-foreground"}`} />
                  <span className="text-sm text-foreground">{a.label}</span>
                  <span
                    className={`ml-auto text-[10px] uppercase tracking-wider font-semibold ${
                      on ? "text-emerald-400" : "text-muted-foreground/70"
                    }`}
                  >
                    {on ? "Allowed" : "Off"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Refund limit (no approval needed)
            </label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={500}
                step={10}
                value={refundCap}
                onChange={(e) => setRefundCap(Number(e.target.value))}
                disabled={!supportIIUnlocked}
                className="flex-1 accent-emerald-400 disabled:opacity-50"
              />
              <span className="text-sm font-mono text-foreground w-20 text-right">${refundCap}</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              Refunds above this amount are always sent to you for approval, regardless of tier.
            </p>
          </div>

          {!supportIIUnlocked && (
            <Link
              to="/app/subscription"
              className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium text-emerald-400 hover:text-emerald-400/80"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Upgrade to Support II — +$10/mo
            </Link>
          )}
        </div>
      </section>

      {/* Behaviour */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Behaviour</h2>
          <p className="text-xs text-muted-foreground mt-1">How this persona writes, decides, and escalates.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 space-y-5">
          {/* Tone */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Tone of voice
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    tone === t
                      ? "border-amber/50 bg-amber/10 text-amber"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              Pulled from your <Link to="/app/knowledge" className="text-amber hover:underline">brand voice guide</Link> when available.
            </p>
          </div>

          {/* Auto reply — gated to Support II */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-medium text-foreground">Auto-send replies & actions</p>
                {!supportIIUnlocked && (
                  <Badge className="bg-muted text-muted-foreground border-0 text-[10px]">
                    <Lock className="h-3 w-3 mr-1" /> Support II
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {supportIIUnlocked
                  ? "Replies and any allowed Shopify actions are sent without waiting for your approval."
                  : "Support I always drafts and waits for approval. Unlock Support II to let the agent send and act on its own."}
              </p>
            </div>
            <button
              disabled={!supportIIUnlocked}
              onClick={() => setAutoReply(!autoReply)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                autoReply && supportIIUnlocked ? "bg-emerald-400" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform ${
                  autoReply && supportIIUnlocked ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Escalation */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Escalate to human after
            </label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={6}
                value={escalateThreshold}
                onChange={(e) => setEscalateThreshold(Number(e.target.value))}
                className="flex-1 accent-amber"
              />
              <span className="text-sm font-mono text-foreground w-20 text-right">
                {escalateThreshold} {escalateThreshold === 1 ? "reply" : "replies"}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              Unresolved tickets are handed to you with full context and suggested next steps.
            </p>
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center justify-end gap-2">
        <button className="text-sm text-muted-foreground hover:text-foreground px-3 py-2">Reset</button>
        <button className="text-sm font-medium bg-amber text-background hover:bg-amber/90 px-4 py-2 rounded-md">
          Save configuration
        </button>
      </div>
    </div>
  );
}

function LockedState() {
  return (
    <div className="p-4 sm:p-6 min-w-0">
      <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
          <Lock className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="font-heading text-xl font-bold text-foreground mt-4">Customer Support — Add-on</h1>
        <p className="text-sm text-muted-foreground mt-2">
          A standalone AI persona dedicated to handling your tickets across email, chat and social — grounded in your knowledge base.
          Available as an add-on on every tier.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {[
            { icon: Mail, label: "Multi-channel" },
            { icon: Sparkles, label: "On-brand tone" },
            { icon: BookOpen, label: "Knowledge-grounded" },
          ].map((f) => (
            <div key={f.label} className="rounded-lg border border-border p-3 flex items-center gap-2">
              <f.icon className="h-4 w-4 text-amber" />
              <span className="text-xs text-foreground">{f.label}</span>
            </div>
          ))}
        </div>
        <Link
          to="/app/subscription"
          className="inline-flex items-center justify-center gap-2 mt-6 bg-amber text-background hover:bg-amber/90 text-sm font-medium px-5 py-2.5 rounded-md"
        >
          <Sparkles className="h-4 w-4" />
          Add to my plan — $39/mo
        </Link>
      </div>
    </div>
  );
}
