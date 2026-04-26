import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus, Loader2, ExternalLink, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/app/tools")({
  head: () => ({
    meta: [{ title: "Idon Suite — Tools & Integrations" }],
  }),
  component: ToolsPage,
});

type Category = "ecommerce" | "support" | "communication" | "analytics" | "marketing";

interface Integration {
  id: string;
  name: string;
  description: string;
  /** Simple Icons slug used to fetch the official brand logo SVG */
  logoSlug: string;
  /** Brand colour in hex without the # — used to tint the logo */
  brandColor: string;
  category: Category;
  /** OAuth provider identifier — wired to the backend OAuth dispatcher */
  oauthProvider: string;
  /** Permissions (scopes) the user is granting */
  scopes: string[];
}

const integrations: Integration[] = [
  { id: "shopify",    name: "Shopify",          description: "Sync orders, products and inventory data.",         logoSlug: "shopify",          brandColor: "96BF48", category: "ecommerce",     oauthProvider: "shopify",       scopes: ["read_orders", "read_products", "read_inventory"] },
  { id: "amazon",     name: "Amazon Seller",    description: "Pull sales, reviews and FBA metrics.",              logoSlug: "amazon",           brandColor: "FF9900", category: "ecommerce",     oauthProvider: "amazon-sp",     scopes: ["sellingpartnerapi::orders", "sellingpartnerapi::reports"] },
  { id: "etsy",       name: "Etsy",             description: "Import listings, orders and shop stats.",           logoSlug: "etsy",             brandColor: "F1641E", category: "ecommerce",     oauthProvider: "etsy",          scopes: ["listings_r", "transactions_r", "shops_r"] },
  { id: "tiktok",     name: "TikTok Shop",      description: "Social commerce orders and content metrics.",       logoSlug: "tiktok",           brandColor: "EE1D52", category: "ecommerce",     oauthProvider: "tiktok-shop",   scopes: ["order.read", "product.read"] },
  { id: "gorgias",    name: "Gorgias",          description: "Customer support tickets and CSAT data.",           logoSlug: "gorgias",          brandColor: "1B1F23", category: "support",       oauthProvider: "gorgias",       scopes: ["tickets:read", "customers:read"] },
  { id: "zendesk",    name: "Zendesk",          description: "Helpdesk tickets, CSAT scores and agent metrics.",  logoSlug: "zendesk",          brandColor: "03363D", category: "support",       oauthProvider: "zendesk",       scopes: ["read", "tickets:read"] },
  { id: "intercom",   name: "Intercom",         description: "Conversations, contacts and product tours.",        logoSlug: "intercom",         brandColor: "1F8DED", category: "support",       oauthProvider: "intercom",      scopes: ["read_conversations", "read_users"] },
  { id: "slack",      name: "Slack",            description: "Receive alerts and chat with your AI team.",        logoSlug: "slack",            brandColor: "4A154B", category: "communication", oauthProvider: "slack",         scopes: ["chat:write", "channels:read"] },
  { id: "teams",      name: "Microsoft Teams",  description: "Team messaging and notification delivery.",         logoSlug: "microsoftteams",   brandColor: "6264A7", category: "communication", oauthProvider: "ms-teams",      scopes: ["ChannelMessage.Send", "Team.ReadBasic.All"] },
  { id: "gmail",      name: "Gmail",            description: "Read inbox, draft replies and send on your behalf.", logoSlug: "gmail",           brandColor: "EA4335", category: "communication", oauthProvider: "google",        scopes: ["gmail.readonly", "gmail.send"] },
  { id: "ga4",        name: "Google Analytics", description: "Website traffic, conversions and audience data.",   logoSlug: "googleanalytics",  brandColor: "E37400", category: "analytics",     oauthProvider: "google",        scopes: ["analytics.readonly"] },
  { id: "mixpanel",   name: "Mixpanel",         description: "Product analytics and behavioural cohorts.",        logoSlug: "mixpanel",         brandColor: "7856FF", category: "analytics",     oauthProvider: "mixpanel",      scopes: ["read:events", "read:cohorts"] },
  { id: "meta-ads",   name: "Meta Ads",         description: "Ad performance, ROAS and audience insights.",       logoSlug: "meta",             brandColor: "0668E1", category: "marketing",     oauthProvider: "meta",          scopes: ["ads_read", "business_management"] },
  { id: "google-ads", name: "Google Ads",       description: "Campaign performance and keyword data.",            logoSlug: "googleads",        brandColor: "4285F4", category: "marketing",     oauthProvider: "google",        scopes: ["adwords"] },
  { id: "klaviyo",    name: "Klaviyo",          description: "Email and SMS automation, lists and flows.",        logoSlug: "klaviyo",          brandColor: "1A1A1A", category: "marketing",     oauthProvider: "klaviyo",       scopes: ["lists:read", "campaigns:read"] },
  { id: "hubspot",    name: "HubSpot",          description: "CRM contacts, deals and marketing campaigns.",      logoSlug: "hubspot",          brandColor: "FF7A59", category: "marketing",     oauthProvider: "hubspot",       scopes: ["crm.objects.contacts.read", "crm.objects.deals.read"] },
];

const categories = [
  { key: "all", label: "All" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "support", label: "Support" },
  { key: "communication", label: "Comms" },
  { key: "analytics", label: "Analytics" },
  { key: "marketing", label: "Marketing" },
] as const;

const STORAGE_KEY = "idon.integrations.connected";

/**
 * Brand logo from Simple Icons CDN. Renders the official SVG glyph
 * tinted to the provider's brand colour. No bundling required.
 */
function BrandLogo({ slug, color, name }: { slug: string; color: string; name: string }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt={`${name} logo`}
      width={28}
      height={28}
      loading="lazy"
      className="h-7 w-7 object-contain"
      onError={(e) => {
        // Fallback to monogram if Simple Icons doesn't have this slug
        const target = e.currentTarget as HTMLImageElement;
        target.style.display = "none";
        const sib = target.nextElementSibling as HTMLElement | null;
        if (sib) sib.style.display = "flex";
      }}
    />
  );
}

type ConnectionState = "idle" | "authorising" | "exchanging" | "connected" | "error";

function ToolsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<Record<string, ConnectionState>>({});
  const [oauthFor, setOauthFor] = useState<Integration | null>(null);

  // Persist connected integrations locally so the UI survives refreshes.
  // Swap this for a server-side adapter when Lovable Cloud is enabled.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setConnected(new Set(JSON.parse(raw)));
    } catch { /* ignore */ }
  }, []);

  const persist = (next: Set<string>) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  };

  const beginOAuth = (tool: Integration) => {
    setOauthFor(tool);
  };

  const completeOAuth = async (tool: Integration) => {
    setBusy((b) => ({ ...b, [tool.id]: "authorising" }));
    setOauthFor(null);
    // Simulated OAuth handshake — the real flow opens
    //   /api/oauth/{provider}/start  →  provider consent  →  /api/oauth/{provider}/callback
    // and the callback persists tokens server-side. We mimic the latency here so the
    // UX is identical once the backend route is wired.
    await new Promise((r) => setTimeout(r, 900));
    setBusy((b) => ({ ...b, [tool.id]: "exchanging" }));
    await new Promise((r) => setTimeout(r, 700));
    const next = new Set(connected);
    next.add(tool.id);
    setConnected(next);
    persist(next);
    setBusy((b) => ({ ...b, [tool.id]: "connected" }));
    setTimeout(() => setBusy((b) => {
      const copy = { ...b };
      delete copy[tool.id];
      return copy;
    }), 1200);
  };

  const disconnect = (tool: Integration) => {
    const next = new Set(connected);
    next.delete(tool.id);
    setConnected(next);
    persist(next);
  };

  const filtered = filter === "all"
    ? integrations
    : integrations.filter((i) => i.category === filter);

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
          Tools & Integrations
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Connect your platforms with one click. We use OAuth so your credentials never touch our servers.
        </p>
      </div>

      {/* Trust strip */}
      <div className="flex items-center gap-2 rounded-md border border-border bg-card/60 px-3 py-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-amber shrink-0" />
        <span>Authorisation happens on the provider's site. We only store the access token.</span>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === cat.key
                ? "bg-amber text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => {
          const isConnected = connected.has(tool.id);
          const state = busy[tool.id];
          const isBusy = state === "authorising" || state === "exchanging";

          return (
            <div
              key={tool.id}
              className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-background/50 border border-border p-2">
                  <BrandLogo slug={tool.logoSlug} color={tool.brandColor} name={tool.name} />
                  {/* Fallback monogram (hidden unless logo fails to load) */}
                  <span
                    className="absolute inset-0 hidden items-center justify-center rounded-md text-xs font-bold text-amber"
                    aria-hidden
                  >
                    {tool.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground truncate">{tool.name}</h3>
                    {isConnected && (
                      <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-medium text-amber">
                        <Check className="h-2.5 w-2.5" /> Live
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                    {tool.description}
                  </p>
                </div>
              </div>

              {isConnected ? (
                <div className="mt-auto flex gap-2">
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-md border border-amber/40 bg-amber/10 px-3 py-1.5 text-xs font-medium text-amber"
                  >
                    <Check className="h-3.5 w-3.5" /> Connected
                  </button>
                  <button
                    onClick={() => disconnect(tool)}
                    className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => beginOAuth(tool)}
                  disabled={isBusy}
                  className="mt-auto flex items-center justify-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-foreground hover:bg-amber hover:text-primary-foreground transition-colors disabled:opacity-70"
                >
                  {state === "authorising" && (<><Loader2 className="h-3.5 w-3.5 animate-spin" /> Opening {tool.name}…</>)}
                  {state === "exchanging" && (<><Loader2 className="h-3.5 w-3.5 animate-spin" /> Verifying…</>)}
                  {!state && (<><Plus className="h-3.5 w-3.5" /> Connect with OAuth</>)}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* OAuth consent modal */}
      {oauthFor && (
        <OAuthDialog
          tool={oauthFor}
          onCancel={() => setOauthFor(null)}
          onConfirm={() => completeOAuth(oauthFor)}
        />
      )}
    </div>
  );
}

function OAuthDialog({
  tool,
  onCancel,
  onConfirm,
}: {
  tool: Integration;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-border bg-card shadow-2xl">
        <div className="flex items-start justify-between border-b border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-background/60 border border-border p-1.5">
              <BrandLogo slug={tool.logoSlug} color={tool.brandColor} name={tool.name} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Connect {tool.name}</h2>
              <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider">
                OAuth · {tool.oauthProvider}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-secondary"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <p className="text-sm text-foreground">
            Idon Suite is requesting access to your <strong>{tool.name}</strong> account.
          </p>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Permissions requested
            </p>
            <ul className="space-y-1.5">
              {tool.scopes.map((s) => (
                <li key={s} className="flex items-start gap-2 text-xs text-foreground">
                  <Check className="h-3.5 w-3.5 text-amber shrink-0 mt-0.5" />
                  <code className="font-mono text-[11px] bg-secondary px-1.5 py-0.5 rounded">{s}</code>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-start gap-2 rounded-md bg-background/60 border border-border p-2.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-amber shrink-0 mt-0.5" />
            <span>You'll be redirected to {tool.name} to sign in. We never see your password.</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border p-4">
          <button
            onClick={onCancel}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex items-center gap-1.5 rounded-md bg-amber px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            Authorise <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
