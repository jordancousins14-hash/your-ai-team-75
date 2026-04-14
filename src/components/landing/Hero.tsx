import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="pt-16 md:pt-24 pb-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-block px-3 py-1 border border-edge text-[10px] font-mono text-amber mb-6 tracking-widest rounded-sm">
            YOUR AI WORKFORCE IS READY
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tighter leading-[0.95] mb-6 text-foreground">
            Hire a team that{" "}
            <span className="text-gradient-amber">never clocks out.</span>
          </h1>
          <p className="text-base md:text-lg text-steel max-w-[50ch] mb-8 leading-relaxed">
            Deploy AI employees who analyze your supply chain, monitor customer sentiment, and manage operations—while you sleep. Wake up to work already done.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 md:px-8 py-3 md:py-4 bg-foreground text-panel font-heading font-bold text-sm tracking-tight hover:bg-amber transition-colors rounded-sm">
              ASSEMBLE YOUR TEAM
            </button>
            <button className="px-6 md:px-8 py-3 md:py-4 border border-edge text-foreground font-heading font-bold text-sm tracking-tight hover:bg-foreground/10 transition-colors rounded-sm">
              SEE HOW IT WORKS
            </button>
          </div>
        </motion.div>

        {/* Live Task Stream */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <div className="brushed-surface border border-edge p-5 md:p-6 rounded-sm">
            <div className="flex justify-between items-center mb-5">
              <span className="font-mono text-[10px] text-steel uppercase tracking-wider">Active Task Stream</span>
              <div className="size-2 rounded-full bg-amber animate-pulse" />
            </div>
            <div className="space-y-3">
              <TaskItem
                agent="SUPPLY_CHAIN"
                status="COMPLETED"
                statusColor="text-amber"
                description="Rerouted 14 shipments due to port delay. Saved $2,480 in logistics costs."
                borderColor="border-amber"
              />
              <TaskItem
                agent="SENTIMENT_LEAD"
                status="PROCESSING"
                statusColor="text-foreground"
                description="Analyzing brand mentions across 8 platforms. 3 high-intent leads flagged."
                borderColor="border-foreground/20"
              />
              <TaskItem
                agent="REVENUE_OPS"
                status="QUEUED"
                statusColor="text-steel"
                description="Dynamic pricing adjustments queued for 22 SKUs based on competitor analysis."
                borderColor="border-foreground/10"
              />
            </div>
            <div className="mt-5 pt-5 border-t border-edge flex justify-between items-end">
              <div>
                <div className="text-[10px] font-mono text-steel">HOURS_SAVED_TODAY</div>
                <div className="text-2xl font-heading font-medium tabular-nums text-foreground">47.2</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-steel">TASK_SUCCESS</div>
                <div className="text-xl font-heading font-medium tabular-nums text-amber">96.8%</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TaskItem({
  agent,
  status,
  statusColor,
  description,
  borderColor,
}: {
  agent: string;
  status: string;
  statusColor: string;
  description: string;
  borderColor: string;
}) {
  return (
    <div className={`p-3 bg-panel/60 border-l-2 ${borderColor} rounded-r-sm`}>
      <div className="flex justify-between text-[11px] font-mono mb-1">
        <span className="text-steel">{agent}</span>
        <span className={statusColor}>{status}</span>
      </div>
      <p className="text-xs text-foreground/80">{description}</p>
    </div>
  );
}
