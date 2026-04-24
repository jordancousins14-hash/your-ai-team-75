import { createFileRoute } from "@tanstack/react-router";
import { Lock, Upload, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/hr")({
  head: () => ({
    meta: [{ title: "HR Room — Altos" }],
  }),
  component: HRRoomPage,
});

type Persona = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  tier: "base" | "pro" | "enterprise";
  unlocked: boolean;
  avatar: string;
  kpiCount: number;
};

const personas: Persona[] = [
  { id: "coo", name: "Morgan", role: "Chief Operating Officer", specialty: "Day-to-day operations, supply chain, fulfilment, vendor management", tier: "base", unlocked: true, avatar: "COO", kpiCount: 5 },
  { id: "cfo", name: "Avery", role: "Chief Financial Officer", specialty: "P&L, unit economics, pricing, cash flow forecasting", tier: "base", unlocked: true, avatar: "CFO", kpiCount: 0 },
  { id: "cco", name: "Jordan", role: "Chief Customer Officer", specialty: "Customer experience, retention, NPS, brand perception", tier: "base", unlocked: true, avatar: "CCO", kpiCount: 0 },
  { id: "cmo", name: "Sam", role: "Chief Marketing Officer", specialty: "Brand, campaigns, social, audience growth", tier: "pro", unlocked: false, avatar: "CMO", kpiCount: 0 },
  { id: "cdo", name: "Riley", role: "Chief Data Officer", specialty: "KPI dashboards, cohort analysis, revenue forecasting", tier: "pro", unlocked: false, avatar: "CDO", kpiCount: 0 },
  { id: "ceco", name: "Casey", role: "Chief eCommerce Officer", specialty: "Storefront optimisation, conversion, marketplace ops", tier: "pro", unlocked: false, avatar: "CeCO", kpiCount: 0 },
  { id: "cgo", name: "Taylor", role: "Chief Growth Officer", specialty: "Acquisition channels, content engine, growth loops", tier: "enterprise", unlocked: false, avatar: "CGO", kpiCount: 0 },
  { id: "cto", name: "Quinn", role: "Chief Technology Officer", specialty: "Tech stack, integrations, automation architecture", tier: "enterprise", unlocked: false, avatar: "CTO", kpiCount: 0 },
  { id: "csco", name: "Drew", role: "Chief Supply Chain Officer", specialty: "Inventory, procurement, supplier negotiation, logistics cost", tier: "enterprise", unlocked: false, avatar: "CSCO", kpiCount: 0 },
  { id: "ciso", name: "Reese", role: "Chief Information Security Officer", specialty: "Account security, fraud detection, data protection", tier: "enterprise", unlocked: false, avatar: "CISO", kpiCount: 0 },
  { id: "cxo", name: "Sage", role: "Chief Experience Officer", specialty: "End-to-end customer journey, UX, omnichannel cohesion", tier: "enterprise", unlocked: false, avatar: "CXO", kpiCount: 0 },
];

function HRRoomPage() {
  const [selected, setSelected] = useState<Persona | null>(null);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">HR Room</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You're the CEO. This is your C-suite roster — upload a job spec and KPIs to align each executive to your real business priorities.
        </p>
      </div>

      {/* Tier legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        {(["base", "pro", "enterprise"] as const).map((tier) => (
          <span key={tier} className={`rounded-full border px-3 py-1 font-medium uppercase tracking-wider ${
            tier === "base" ? "border-amber/40 text-amber" :
            tier === "pro" ? "border-steel/40 text-steel" :
            "border-muted-foreground/30 text-muted-foreground"
          }`}>
            {tier}
          </span>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {personas.map((p) => (
          <PersonaCard
            key={p.id}
            persona={p}
            onClick={() => p.unlocked && setSelected(p)}
          />
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <PersonaDetail persona={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function PersonaCard({ persona, onClick }: { persona: Persona; onClick: () => void }) {
  const locked = !persona.unlocked;

  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`group relative flex flex-col items-start rounded-lg border p-4 text-left transition-all ${
        locked
          ? "cursor-not-allowed border-border/50 bg-card/30 opacity-50"
          : "border-border bg-card hover:border-amber/40 hover:shadow-[0_0_20px_-5px_oklch(0.80_0.18_75/0.15)]"
      }`}
    >
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/60 backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-1">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {persona.tier} tier
            </span>
          </div>
        </div>
      )}

      {/* Avatar */}
      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${
        persona.unlocked ? "bg-amber/10 text-amber" : "bg-muted text-muted-foreground"
      }`}>
        {persona.avatar}
      </div>

      <div className="mt-3">
        <p className="text-sm font-semibold text-foreground">{persona.name}</p>
        <p className="text-xs font-medium text-amber">{persona.role}</p>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{persona.specialty}</p>

      {persona.unlocked && persona.kpiCount > 0 && (
        <div className="mt-2 flex items-center gap-1 text-xs text-steel">
          <Star className="h-3 w-3" /> {persona.kpiCount} KPIs assigned
        </div>
      )}

      {persona.unlocked && (
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-amber transition-colors">
          Configure <ChevronRight className="h-3 w-3" />
        </div>
      )}
    </button>
  );
}

function PersonaDetail({ persona, onClose }: { persona: Persona; onClose: () => void }) {
  return (
    <div className="rounded-lg border border-amber/20 bg-card p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            {persona.name} — {persona.role}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{persona.specialty}</p>
        </div>
        <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">
          Close
        </button>
      </div>

      {/* Upload zone */}
      <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm font-medium text-foreground">Upload Job Spec &amp; KPIs</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Drop a PDF, DOCX, or paste text. The AI will align to these goals and advocate for these KPIs in team discussions.
        </p>
        <button className="mt-4 rounded-md bg-amber px-4 py-2 text-sm font-medium text-background hover:bg-amber/90 transition-colors">
          Upload Document
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-background p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current KPIs</h3>
          <p className="mt-2 text-sm text-muted-foreground italic">No KPIs assigned yet. Upload a job spec to get started.</p>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent Activity</h3>
          <p className="mt-2 text-sm text-muted-foreground italic">This persona hasn't been activated yet.</p>
        </div>
      </div>
    </div>
  );
}
