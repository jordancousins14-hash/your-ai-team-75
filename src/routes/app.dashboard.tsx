import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Circle,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — Altos" }],
  }),
  component: DashboardPage,
});

const alerts = [
  {
    id: 1,
    type: "trend",
    title: "#SustainablePackaging trending",
    desc: "Social media mentions up 340% this week in your niche.",
    time: "12 min ago",
  },
  {
    id: 2,
    type: "sentiment",
    title: "Customer sentiment dip detected",
    desc: "Negative reviews on Amazon increased 18% — logistics flagged.",
    time: "1 hr ago",
  },
  {
    id: 3,
    type: "insight",
    title: "Competitor price drop",
    desc: "Top competitor reduced pricing by 12% on 3 SKUs.",
    time: "3 hr ago",
  },
];

const todos = [
  { id: 1, text: "Review supply chain risk report from Logistics Manager", done: false },
  { id: 2, text: "Approve social media response strategy", done: false },
  { id: 3, text: "Check morning briefing from Chief of Staff", done: true },
  { id: 4, text: "Upload Q2 sales data for BI analysis", done: false },
];

function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Good morning, Boss
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your team has been working overnight. Here's what matters now.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Clock className="h-4 w-4" />}
          label="Time saved this week"
          value="14.2 hrs"
          change="+3.1 hrs vs last week"
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Tasks completed"
          value="47"
          change="by 4 personas overnight"
        />
        <StatCard
          icon={<AlertTriangle className="h-4 w-4" />}
          label="Active alerts"
          value="3"
          change="2 require your input"
        />
        <StatCard
          icon={<CheckCircle2 className="h-4 w-4" />}
          label="Est. cost savings"
          value="$2,340"
          change="vs hiring equivalent staff"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Alerts feed */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Alerts &amp; Signals
          </h2>
          <div className="space-y-2">
            {alerts.map((a) => (
              <div
                key={a.id}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-amber/30"
              >
                <div className="mt-0.5 rounded-full bg-amber/10 p-1.5 text-amber">
                  <AlertTriangle className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.desc}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* To-do list */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Your To-Do
          </h2>
          <div className="space-y-1">
            {todos.map((t) => (
              <div
                key={t.id}
                className={`flex items-start gap-3 rounded-lg border border-border bg-card p-3 ${t.done ? "opacity-50" : ""}`}
              >
                {t.done ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                )}
                <span className={`text-sm ${t.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {t.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-2 font-heading text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{change}</p>
    </div>
  );
}
