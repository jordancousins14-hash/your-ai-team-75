import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <nav className="h-16 border-b border-edge bg-panel/80 backdrop-blur-md flex items-center justify-between px-6 md:px-8 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="size-6 bg-amber" />
        <span className="font-heading font-bold tracking-tight text-lg md:text-xl text-foreground">
          ALTOS
        </span>
      </div>
      <div className="hidden lg:flex items-center gap-6 text-sm font-mono text-steel">
        <Link to="/" className="hover:text-amber transition-colors">WORKFORCE</Link>
        <a href="#integrations" className="hover:text-amber transition-colors">INTEGRATIONS</a>
        <a href="#pricing" className="hover:text-amber transition-colors">PRICING</a>
      </div>
      <Link to="/app/dashboard" className="px-4 py-2 border border-amber text-amber text-xs font-mono hover:bg-amber hover:text-panel transition-all rounded-sm">
        GET STARTED
      </Link>
    </nav>
  );
}
