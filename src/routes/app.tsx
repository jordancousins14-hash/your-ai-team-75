import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Wrench,
  BookOpen,
  Menu,
  X,
  Zap,
  Briefcase,
  CreditCard,
  Settings,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [{ title: "Altos — Command Centre" }],
  }),
  component: AppLayout,
});

const navItems = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/strategy", label: "Strategy", icon: Briefcase },
  { to: "/app/hr", label: "HR Room", icon: Users },
  { to: "/app/forums", label: "Forums", icon: MessageSquare },
  { to: "/app/tools", label: "Tools", icon: Wrench },
  { to: "/app/knowledge", label: "Knowledge", icon: BookOpen },
] as const;

const bottomNavItems = [
  { to: "/app/subscription", label: "Subscription", icon: CreditCard },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

function AppLayout() {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isMobile) setExpanded(false);
  }, [location.pathname, isMobile]);

  const sidebarWidth = isMobile
    ? (expanded ? "w-60" : "w-0")
    : (expanded ? "w-60" : "w-14");

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {isMobile && expanded && (
        <div
          className="fixed inset-0 z-30 bg-black/60"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          flex flex-col border-r border-border bg-sidebar transition-all duration-200 shrink-0
          ${isMobile ? (expanded ? "w-60" : "w-0 overflow-hidden border-r-0") : (expanded ? "w-60" : "w-14")}
          ${isMobile ? "fixed inset-y-0 left-0 z-40" : "relative"}
          max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40
          ${!expanded ? "max-md:w-0 max-md:overflow-hidden max-md:border-r-0" : ""}
        `}
      >
        {/* Logo row */}
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <Zap className="h-5 w-5 shrink-0 text-amber" />
          {expanded && (
            <span className="font-heading text-sm font-semibold tracking-wide text-foreground">
              ALTOS
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-amber"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
                title={!expanded ? item.label : undefined}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {expanded && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom nav */}
        <div className="space-y-1 border-t border-border p-2">
          {bottomNavItems.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-amber"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
                title={!expanded ? item.label : undefined}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {expanded && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Expand/collapse toggle (desktop) */}
        {!isMobile && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex h-10 items-center justify-center border-t border-border text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-auto min-w-0 overflow-x-hidden">
        {/* Mobile top bar */}
        {isMobile && (
          <header className="sticky top-0 z-20 flex h-12 items-center gap-3 border-b border-border bg-background px-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground hover:text-foreground"
            >
              {expanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Zap className="h-4 w-4 text-amber" />
            <span className="font-heading text-xs font-semibold tracking-wide text-foreground">
              ALTOS
            </span>
          </header>
        )}

        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}