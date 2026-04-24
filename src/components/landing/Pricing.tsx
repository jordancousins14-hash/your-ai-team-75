import { motion } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for solo sellers just getting started with AI delegation.",
    features: [
      "3 AI executives (COO, CFO, CCO)",
      "10k AI actions / month",
      "5 forum spaces",
      "Standard integrations",
      "Daily briefings",
    ],
    cta: "START FREE TRIAL",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$129",
    description: "For growing businesses ready to delegate across the C-suite.",
    features: [
      "6 AI executives",
      "25k AI actions / month",
      "Unlimited forums",
      "All integrations",
      "Strategy Room",
      "Priority support",
    ],
    cta: "START FREE TRIAL",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$299",
    description: "Full AI C-suite tailored to your unique operations.",
    features: [
      "10+ AI executives",
      "100k AI actions / month",
      "Custom personas",
      "API access",
      "Dedicated success manager",
    ],
    cta: "CONTACT SALES",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-amber font-mono text-[10px] tracking-widest mb-2">PRICING</div>
          <h2 className="text-3xl md:text-4xl font-heading font-medium tracking-tight text-foreground mb-4">
            Scale your team, not your overhead
          </h2>
          <p className="text-steel text-sm max-w-md mx-auto">
            Start small and grow. Unlock more AI employees and capabilities as your business expands.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-1">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`brushed-surface border p-8 md:p-10 flex flex-col rounded-sm ${
                tier.highlighted
                  ? "border-amber glow-amber"
                  : "border-edge"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {tier.highlighted && (
                <div className="text-[10px] font-mono font-bold text-amber tracking-widest mb-4">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-heading font-bold text-foreground mb-1">{tier.name}</h3>
              <div className="text-3xl font-heading font-medium text-foreground mb-3">
                {tier.price}
                {tier.price !== "Custom" && (
                  <span className="text-sm text-steel">/mo</span>
                )}
              </div>
              <p className="text-sm text-steel mb-8">{tier.description}</p>
              <ul className="space-y-3 mb-10 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                    <div className="size-1 bg-amber rounded-full shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 text-sm font-heading font-bold tracking-wider transition-colors rounded-sm ${
                  tier.highlighted
                    ? "bg-foreground text-panel hover:bg-amber"
                    : "border border-edge text-foreground hover:bg-foreground hover:text-panel"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
