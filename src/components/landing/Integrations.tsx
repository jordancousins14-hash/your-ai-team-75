import { motion } from "framer-motion";

const integrations = [
  "Shopify", "Gorgias", "Zendesk", "Instagram", "TikTok",
  "Amazon", "Stripe", "Google Analytics", "Meta Ads", "Klaviyo",
  "Slack", "HubSpot",
];

export function Integrations() {
  return (
    <section className="py-16 md:py-20 bg-surface border-t border-edge" id="integrations">
      <div className="px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-10">
          <span className="text-[10px] font-mono text-steel whitespace-nowrap uppercase tracking-widest">
            INTEGRATION_MARKETPLACE
          </span>
          <div className="hidden md:block h-px w-full bg-edge" />
        </div>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-heading font-medium tracking-tight text-foreground mb-3">
            Plug in the tools you already use
          </h2>
          <p className="text-sm text-steel max-w-lg mx-auto">
            Your AI team connects directly to your existing stack. No middleware, no manual exports—just raw data flowing into intelligent analysis.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {integrations.map((name, i) => (
            <motion.div
              key={name}
              className="flex flex-col items-center justify-center py-5 px-3 border border-edge bg-panel/50 hover:border-amber/50 hover:bg-surface transition-all rounded-sm cursor-pointer group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div className="size-10 bg-foreground/5 border border-foreground/10 rounded-sm mb-3 group-hover:border-amber/30 transition-colors" />
              <span className="font-mono text-[10px] text-steel group-hover:text-foreground transition-colors tracking-wider">
                {name.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
