import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  ShieldCheck,
  GraduationCap,
  Upload,
  FolderOpen,
  Search,
  Plus,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/knowledge")({
  head: () => ({
    meta: [{ title: "Altos — Knowledge Repository" }],
  }),
  component: KnowledgePage,
});

interface KnowledgeItem {
  id: string;
  title: string;
  category: "process" | "policy" | "training";
  updatedAt: string;
  size: string;
}

const sampleItems: KnowledgeItem[] = [
  { id: "1", title: "Returns & Refunds Process", category: "process", updatedAt: "2 days ago", size: "24 KB" },
  { id: "2", title: "Shipping SLA Policy", category: "policy", updatedAt: "1 week ago", size: "18 KB" },
  { id: "3", title: "New Starter Onboarding Guide", category: "training", updatedAt: "3 days ago", size: "112 KB" },
  { id: "4", title: "Inventory Reorder Workflow", category: "process", updatedAt: "5 days ago", size: "31 KB" },
  { id: "5", title: "GDPR Data Handling Policy", category: "policy", updatedAt: "2 weeks ago", size: "45 KB" },
  { id: "6", title: "Customer Escalation Playbook", category: "training", updatedAt: "1 day ago", size: "67 KB" },
];

const categoryMeta = {
  process: { label: "Processes", icon: FileText, color: "text-blue-400" },
  policy: { label: "Policies", icon: ShieldCheck, color: "text-amber" },
  training: { label: "Training", icon: GraduationCap, color: "text-green-400" },
} as const;

function KnowledgePage() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = sampleItems
    .filter((i) => filter === "all" || i.category === filter)
    .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
            Knowledge Repository
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Documents your AI workforce uses to understand your business.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-amber px-4 py-2 text-xs font-semibold text-background hover:bg-amber/90 transition-colors self-start">
          <Upload className="h-4 w-4" />
          Upload Document
        </button>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-3 gap-3">
        {(Object.entries(categoryMeta) as [keyof typeof categoryMeta, typeof categoryMeta[keyof typeof categoryMeta]][]).map(
          ([key, meta]) => {
            const count = sampleItems.filter((i) => i.category === key).length;
            return (
              <button
                key={key}
                onClick={() => setFilter(filter === key ? "all" : key)}
                className={`rounded-lg border p-3 text-left transition-colors ${
                  filter === key
                    ? "border-amber bg-amber/10"
                    : "border-border bg-card hover:border-edge"
                }`}
              >
                <meta.icon className={`h-5 w-5 ${meta.color}`} />
                <p className="mt-2 text-lg font-bold text-foreground">{count}</p>
                <p className="text-xs text-muted-foreground">{meta.label}</p>
              </button>
            );
          }
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search documents…"
          className="w-full rounded-md border border-border bg-secondary py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber"
        />
      </div>

      {/* Document list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No documents found.
          </p>
        )}
        {filtered.map((item) => {
          const meta = categoryMeta[item.category];
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:border-edge transition-colors"
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary`}>
                <meta.icon className={`h-4 w-4 ${meta.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {meta.label} · Updated {item.updatedAt} · {item.size}
                </p>
              </div>
              <FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
