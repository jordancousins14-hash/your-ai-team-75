import { createFileRoute } from "@tanstack/react-router";
import {
  ShoppingBag,
  MessageCircle,
  Hash,
  BarChart3,
  Mail,
  Store,
  Package,
  Megaphone,
  Check,
  Plus,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/tools")({
  head: () => ({
    meta: [{ title: "Idon Suite — Tools & Integrations" }],
  }),
  component: ToolsPage,
});

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: "ecommerce" | "support" | "communication" | "analytics" | "marketing";
  connected: boolean;
}

const integrations: Integration[] = [
  { id: "shopify", name: "Shopify", description: "Sync orders, products and inventory data", icon: ShoppingBag, category: "ecommerce", connected: false },
  { id: "amazon", name: "Amazon Seller", description: "Pull sales, reviews and FBA metrics", icon: Package, category: "ecommerce", connected: false },
  { id: "etsy", name: "Etsy", description: "Import listings, orders and shop stats", icon: Store, category: "ecommerce", connected: false },
  { id: "gorgias", name: "Gorgias", description: "Customer support tickets and satisfaction data", icon: MessageCircle, category: "support", connected: false },
  { id: "zendesk", name: "Zendesk", description: "Helpdesk tickets, CSAT scores and agent metrics", icon: MessageCircle, category: "support", connected: false },
  { id: "slack", name: "Slack", description: "Receive alerts and interact with your AI team", icon: Hash, category: "communication", connected: false },
  { id: "teams", name: "Microsoft Teams", description: "Team messaging and notification delivery", icon: Hash, category: "communication", connected: false },
  { id: "email", name: "Email (IMAP/SMTP)", description: "Forward emails for analysis and responses", icon: Mail, category: "communication", connected: false },
  { id: "ga4", name: "Google Analytics", description: "Website traffic, conversions and audience data", icon: BarChart3, category: "analytics", connected: false },
  { id: "meta-ads", name: "Meta Ads", description: "Ad performance, ROAS and audience insights", icon: Megaphone, category: "marketing", connected: false },
  { id: "google-ads", name: "Google Ads", description: "Campaign performance and keyword data", icon: Megaphone, category: "marketing", connected: false },
  { id: "tiktok", name: "TikTok Shop", description: "Social commerce orders and content metrics", icon: Store, category: "ecommerce", connected: false },
];

const categories = [
  { key: "all", label: "All" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "support", label: "Support" },
  { key: "communication", label: "Comms" },
  { key: "analytics", label: "Analytics" },
  { key: "marketing", label: "Marketing" },
] as const;

function ToolsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [connected, setConnected] = useState<Set<string>>(new Set());

  const filtered = filter === "all"
    ? integrations
    : integrations.filter((i) => i.category === filter);

  const toggleConnect = (id: string) => {
    setConnected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
          Tools & Integrations
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Connect your platforms so your AI workforce can analyse real data.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === cat.key
                ? "bg-amber text-background"
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
          return (
            <div
              key={tool.id}
              className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary">
                  <tool.icon className="h-5 w-5 text-amber" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                    {tool.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleConnect(tool.id)}
                className={`mt-auto flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  isConnected
                    ? "bg-green-900/40 text-green-400 border border-green-800"
                    : "bg-secondary text-foreground hover:bg-amber hover:text-background"
                }`}
              >
                {isConnected ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Connected
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" /> Connect
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
