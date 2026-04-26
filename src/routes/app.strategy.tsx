import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Eye, EyeOff, Target, ChevronRight, ArrowLeft, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Route = createFileRoute("/app/strategy")({
  head: () => ({
    meta: [{ title: "Strategy Room — Idon Suite" }],
  }),
  component: StrategyPage,
});

type Project = {
  id: string;
  name: string;
  status: "Active" | "Planning" | "On Hold";
  visibility: "Private" | "Public";
  strategy: string;
  description: string;
  cosNotes: string;
  kpis: string[];
  lastActivity: string;
  updates: { date: string; text: string }[];
};

const sampleProjects: Project[] = [
  {
    id: "1",
    name: "EU Market Expansion",
    status: "Active",
    visibility: "Private",
    strategy: "Geographic Growth",
    description: "Pilot expansion into 3 EU markets (DE, FR, NL) with top 5 SKUs. Testing fulfilment via 3PL partners before full rollout.",
    cosNotes: "Morgan's take: The opportunity is strong but margins are tight. A phased approach with 5 SKUs reduces risk. If pilot hits 60% of domestic conversion rate, we green-light full expansion.",
    kpis: ["Pilot conversion rate > 2.5%", "Return rate < 8%", "Break-even within 90 days"],
    lastActivity: "2 hrs ago",
    updates: [
      { date: "15 Apr", text: "3PL contracts reviewed. Netherlands partner selected." },
      { date: "12 Apr", text: "Initial SKU selection completed. Top 5 by margin." },
      { date: "8 Apr", text: "Project created. Marked as Private — not yet shared with wider team." },
    ],
  },
  {
    id: "2",
    name: "Sustainable Packaging Rollout",
    status: "Planning",
    visibility: "Public",
    strategy: "Brand & Perception",
    description: "Transition all packaging to recyclable materials. Customer sentiment data shows 15% brand uplift potential.",
    cosNotes: "Morgan's take: Strong alignment with customer values. Jordan's sentiment data backs this. However, Alex flagged a 12% cost increase — we need to test price sensitivity before committing.",
    kpis: ["Customer satisfaction +10%", "Packaging cost < 15% increase", "Launch by Q3"],
    lastActivity: "Yesterday",
    updates: [
      { date: "14 Apr", text: "Supplier quotes received. 3 viable options." },
      { date: "10 Apr", text: "Made Public — all personas now aligned to sustainability goals." },
    ],
  },
  {
    id: "3",
    name: "Amazon SEO Overhaul",
    status: "Active",
    visibility: "Public",
    strategy: "Revenue Optimisation",
    description: "Comprehensive keyword and listing optimisation across all Amazon SKUs. Targeting 20% organic traffic increase.",
    cosNotes: "Morgan's take: Quick win opportunity. Low cost, high impact. The data team can handle this with existing tools. Recommend prioritising top 10 SKUs by revenue.",
    kpis: ["Organic impressions +20%", "Click-through rate +5%", "Complete within 30 days"],
    lastActivity: "3 hrs ago",
    updates: [
      { date: "15 Apr", text: "First batch of 5 listings optimised. Early data positive." },
      { date: "11 Apr", text: "Keyword gap analysis completed." },
    ],
  },
  {
    id: "4",
    name: "Competitor Pricing Intelligence",
    status: "On Hold",
    visibility: "Private",
    strategy: "Revenue Optimisation",
    description: "Build automated competitor price monitoring. Paused pending integration with pricing tools.",
    cosNotes: "Morgan's take: This is valuable but depends on tool integrations we don't have yet. Parking until the Tools marketplace is connected. Will revisit in Q3.",
    kpis: ["Price match response time < 24hrs", "Margin protection > 95%"],
    lastActivity: "3 days ago",
    updates: [
      { date: "12 Apr", text: "On Hold — waiting for tool integrations." },
    ],
  },
];

function StrategyPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState(sampleProjects);

  const toggleVisibility = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, visibility: p.visibility === "Private" ? "Public" : "Private" }
          : p
      )
    );
    if (selectedProject?.id === id) {
      setSelectedProject((prev) =>
        prev ? { ...prev, visibility: prev.visibility === "Private" ? "Public" : "Private" } : null
      );
    }
  };

  const statusColor = (s: string) => {
    if (s === "Active") return "bg-emerald-500/20 text-emerald-400 border-0";
    if (s === "Planning") return "bg-amber/20 text-amber border-0";
    return "bg-muted text-muted-foreground border-0";
  };

  if (selectedProject) {
    return (
      <div className="p-4 sm:p-6 space-y-6 min-w-0 max-w-3xl mx-auto">
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </button>

        <div className="flex flex-wrap items-start gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-xl font-bold text-foreground break-words">{selectedProject.name}</h1>
            <p className="text-xs text-muted-foreground mt-1">{selectedProject.strategy}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge className={statusColor(selectedProject.status)}>{selectedProject.status}</Badge>
            <button
              onClick={() => toggleVisibility(selectedProject.id)}
              className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              {selectedProject.visibility === "Private" ? (
                <><EyeOff className="h-3.5 w-3.5" /> Private</>
              ) : (
                <><Eye className="h-3.5 w-3.5 text-amber" /> Public</>
              )}
            </button>
          </div>
        </div>

        {selectedProject.visibility === "Private" && (
          <div className="rounded-md bg-amber/10 border border-amber/20 px-3 py-2 text-xs text-amber">
            🔒 Private — only you and Morgan (CoS) can see this. Other personas are unaware of this project.
          </div>
        )}

        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-foreground/90 break-words">{selectedProject.description}</p>
        </div>

        {/* CoS Notes */}
        <div className="rounded-lg border border-amber/20 bg-amber/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="h-4 w-4 text-amber" />
            <p className="text-xs font-semibold text-amber uppercase tracking-wider">Morgan's Strategic Assessment</p>
          </div>
          <p className="text-sm text-foreground/90 break-words">{selectedProject.cosNotes}</p>
        </div>

        {/* KPIs */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Performance Indicators</p>
          <div className="space-y-1.5">
            {selectedProject.kpis.map((kpi) => (
              <div key={kpi} className="flex items-center gap-2 text-sm text-foreground">
                <Target className="h-3.5 w-3.5 text-amber shrink-0" />
                <span className="break-words">{kpi}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Updates</p>
          <div className="space-y-3 border-l-2 border-border pl-4">
            {selectedProject.updates.map((u, i) => (
              <div key={i}>
                <p className="text-xs text-muted-foreground">{u.date}</p>
                <p className="text-sm text-foreground/90 break-words">{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 min-w-0">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground">Strategy Room</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Morgan's domain — your private co-founder space.
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-md bg-amber px-3 py-1.5 text-xs font-medium text-background hover:bg-amber/90 transition-colors shrink-0">
          <Plus className="h-3.5 w-3.5" /> New Project
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProject(p)}
            className="rounded-xl border border-border bg-card p-4 text-left hover:border-amber/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-4 w-4 text-amber shrink-0" />
              <span className="text-sm font-semibold text-foreground truncate flex-1">{p.name}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2 mb-3 break-words">{p.description}</p>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={statusColor(p.status) + " text-xs"}>{p.status}</Badge>
              <Badge className="text-xs border-0 bg-muted text-muted-foreground">
                {p.visibility === "Private" ? (
                  <span className="flex items-center gap-1"><EyeOff className="h-3 w-3" /> Private</span>
                ) : (
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> Public</span>
                )}
              </Badge>
              <span className="ml-auto text-xs text-muted-foreground">{p.lastActivity}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
