import { motion } from "framer-motion";

export function MorningBriefing() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Briefing Card */}
        <motion.div
          className="flex-1 w-full max-w-lg"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative bg-surface border border-edge rounded-sm p-8 md:p-10 shadow-2xl">
            <div className="absolute -inset-1 bg-amber/5 blur-2xl rounded-3xl -z-10" />
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-mono text-steel uppercase tracking-widest">
                Morning Briefing • 06:00 AM
              </span>
              <div className="size-2 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-6">
              <BriefingItem
                number="01"
                title="Inventory Rebalanced"
                description="Moved surplus stock from Warehouse A to meet projected weekend demand at Warehouse C."
              />
              <BriefingItem
                number="02"
                title="Customer Mood: Positive"
                description="Brand sentiment up 14.2% after last night's email campaign. 3 reviews responded to."
              />
              <BriefingItem
                number="03"
                title="Revenue Opportunity Found"
                description="Identified $1,284 in margin gains through dynamic discount gating on 8 product lines."
              />
            </div>
            <div className="mt-8 pt-6 border-t border-edge">
              <div className="flex justify-between text-sm">
                <span className="text-steel font-mono text-[10px]">TIME_SAVED_OVERNIGHT</span>
                <span className="font-heading font-bold text-amber">12.4 hours</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-medium tracking-tight mb-6 leading-tight text-foreground">
            Your team works while{" "}
            <span className="text-gradient-amber">you sleep.</span>
          </h2>
          <p className="text-base md:text-lg text-steel leading-relaxed mb-8">
            Stop starting your day with a fire drill. Your AI workforce handles operations overnight, so you wake up to a briefing—not a crisis. Review, approve, or pivot with a single prompt.
          </p>
          <div className="space-y-4">
            <ValuePoint label="Delegation on autopilot" description="Assign tasks in plain language. Your team figures out the rest." />
            <ValuePoint label="Real savings, tracked" description="See exactly how much time and money your AI team saves you each week." />
            <ValuePoint label="Know when to hire humans" description="We'll tell you when your business has grown beyond what AI can handle alone." />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BriefingItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-4 md:gap-5">
      <div className="text-xl font-heading text-amber font-medium shrink-0">{number}</div>
      <div>
        <h4 className="font-heading font-medium mb-1 text-foreground">{title}</h4>
        <p className="text-sm text-steel">{description}</p>
      </div>
    </div>
  );
}

function ValuePoint({ label, description }: { label: string; description: string }) {
  return (
    <div className="flex gap-3">
      <div className="size-1.5 bg-amber mt-2 shrink-0 rounded-full" />
      <div>
        <div className="text-sm font-heading font-bold text-foreground">{label}</div>
        <div className="text-xs text-steel">{description}</div>
      </div>
    </div>
  );
}
