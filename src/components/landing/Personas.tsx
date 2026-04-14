import { motion } from "framer-motion";

const personas = [
  {
    id: "01",
    name: "Supply Chain Architect",
    description:
      "Monitors global logistics around the clock. Predicts delays before they happen and reroutes shipments automatically to protect your margins.",
    skills: ["Route Optimization", "Vendor Management", "Demand Forecasting"],
  },
  {
    id: "02",
    name: "Sentiment Analyst",
    description:
      "Watches every mention of your brand across social media and review sites. Flags risks early and drafts response strategies for your approval.",
    skills: ["Brand Monitoring", "Crisis Detection", "Trend Mapping"],
  },
  {
    id: "03",
    name: "Revenue Strategist",
    description:
      "Analyzes pricing elasticity, competitor moves, and conversion data. Makes micro-adjustments to your storefront to maximize daily revenue.",
    skills: ["Dynamic Pricing", "Competitor Intel", "Conversion Analysis"],
  },
  {
    id: "04",
    name: "Customer Success Lead",
    description:
      "Handles support tickets, identifies upsell opportunities, and maintains customer satisfaction scores—all while you're offline.",
    skills: ["Ticket Triage", "Upsell Detection", "CSAT Tracking"],
  },
  {
    id: "05",
    name: "Data Intelligence Officer",
    description:
      "Connects your tools and transforms raw data into actionable business insights. No BI expertise required—just ask questions in plain English.",
    skills: ["KPI Dashboards", "Report Generation", "Data Synthesis"],
  },
  {
    id: "06",
    name: "Social Media Commander",
    description:
      "Schedules, publishes, and optimizes your social content based on audience behavior patterns and engagement analytics.",
    skills: ["Content Scheduling", "Engagement Analysis", "Audience Growth"],
  },
];

export function Personas() {
  return (
    <section className="py-20 md:py-24 border-t border-edge bg-surface" id="workforce">
      <div className="px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
          <div>
            <div className="text-amber font-mono text-[10px] tracking-widest mb-2">THE_WORKFORCE</div>
            <h2 className="text-3xl md:text-4xl font-heading font-medium tracking-tight text-foreground">
              Your Specialized Team
            </h2>
          </div>
          <p className="text-steel max-w-[40ch] text-sm text-left md:text-right">
            Purpose-built AI employees designed to operate within your existing business workflows. No AI expertise needed.
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
              <div className="size-10 bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-5 font-mono text-amber text-sm rounded-sm">
                #{persona.id}
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
