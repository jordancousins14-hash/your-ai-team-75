export function Footer() {
  return (
    <footer className="border-t border-edge py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="size-4 bg-amber" />
            <span className="font-heading font-bold tracking-tight text-lg text-foreground">ALTOS</span>
          </div>
          <p className="text-xs font-mono text-steel max-w-[40ch]">
            Your AI workforce for modern commerce.<br />
            © 2026 Altos Systems. All rights reserved.
          </p>
        </div>
        <div className="flex gap-8 md:gap-12 font-mono text-[10px] text-steel">
          <div className="flex flex-col gap-2">
            <span className="text-foreground font-bold">PRODUCT</span>
            <a href="#workforce" className="hover:text-amber transition-colors">WORKFORCE</a>
            <a href="#integrations" className="hover:text-amber transition-colors">INTEGRATIONS</a>
            <a href="#pricing" className="hover:text-amber transition-colors">PRICING</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-foreground font-bold">LEGAL</span>
            <a href="#" className="hover:text-amber transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-amber transition-colors">TERMS</a>
            <a href="#" className="hover:text-amber transition-colors">SLA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
