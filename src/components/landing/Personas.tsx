import { motion } from "framer-motion";

const personas = [
  {
    id: "01",
    name: "Chief Operating Officer",
    abbr: "COO",
    description:
      "Runs day-to-day operations, supply chain, and fulfilment. Predicts delays before they happen and reroutes shipments automatically to protect your margins.",
    skills: ["Ops Oversight", "Supply Chain", "Vendor Management"],
  },
  {
    id: "02",
    name: "Chief Marketing Officer",
    abbr: "CMO",
    description:
      "Owns brand, campaigns, and audience growth. Watches every mention across social and review sites, flags risks early, and drafts response strategies.",
    skills: ["Brand Strategy", "Campaigns", "Sentiment Analysis"],
  },
  {
    id: "03",
    name: "Chief Financial Officer",
    abbr: "CFO",
    description:
      "Tracks P&L, unit economics, and pricing elasticity. Makes micro-adjustments to your storefront and budget to maximise daily revenue and margin.",
    skills: ["Dynamic Pricing", "Forecasting", "Cash Flow"],
  },
  {
    id: "04",
    name: "Chief Customer Officer",
    abbr: "CCO",
    description:
      "Owns customer experience end-to-end. Identifies upsell opportunities, monitors CSAT, and aligns the team around retention—all while you're offline.",
    skills: ["Retention", "Upsell Detection", "CSAT Tracking"],
  },
  {
    id: "05",
    name: "Chief Data Officer",
    abbr: "CDO",
    description:
      "Connects your tools and transforms raw data into actionable insights. No BI expertise required—just ask questions in plain English.",
    skills: ["KPI Dashboards", "Reporting", "Data Synthesis"],
  },
  {
    id: "06",
    name: "Chief Growth Officer",
    abbr: "CGO",
    description:
      "Schedules, publishes, and optimises content based on audience behaviour. Hunts new acquisition channels and compounding growth loops.",
    skills: ["Content Engine", "Acquisition", "Audience Growth"],
  },
];

export function Personas() {
  return (
    <section className="py-20 md:py-24 border-t border-edge bg-surface" id="workforce">
      <div className="px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
          <div>
            <div className="text-amber font-mono text-[10px] tracking-widest mb-2">THE_C_SUITE</div>
            <h2 className="text-3xl md:text-4xl font-heading font-medium tracking-tight text-foreground">
              Your Executive Team
            </h2>
          </div>
          <p className="text-steel max-w-[40ch] text-sm text-left md:text-right">
            You're the CEO. We staff the rest of the C-suite—purpose-built AI executives that operate inside your existing workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
          {personas.map((persona, i) => (
            <motion.div
              key={persona.id}
              className="brushed-surface border border-edge p-6 md:p-8 group hover:border-amber transition-colors duration-300 rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="size-10 bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-5 font-mono text-amber text-xs rounded-sm">
                {persona.abbr}
              </div>
              <h3 className="text-lg font-heading font-bold mb-3 text-foreground">{persona.name}</h3>
              <p className="text-sm text-steel leading-relaxed mb-6">{persona.description}</p>
              <div className="flex flex-wrap gap-2">
                {persona.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-[10px] font-mono border border-edge text-steel rounded-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
