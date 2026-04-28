import { motion } from "framer-motion";
import { IntegrationLogo } from "@/components/integrations/IntegrationLogo";

const integrations: { slug: string; name: string }[] = [
  { slug: "shopify",         name: "Shopify" },
  { slug: "amazon",          name: "Amazon" },
  { slug: "etsy",            name: "Etsy" },
  { slug: "tiktok",          name: "TikTok" },
  { slug: "instagram",       name: "Instagram" },
  { slug: "stripe",          name: "Stripe" },
  { slug: "gorgias",         name: "Gorgias" },
  { slug: "zendesk",         name: "Zendesk" },
  { slug: "slack",           name: "Slack" },
  { slug: "googleanalytics", name: "Google Analytics" },
  { slug: "meta",            name: "Meta Ads" },
  { slug: "klaviyo",         name: "Klaviyo" },
  { slug: "hubspot",         name: "HubSpot" },
  { slug: "intercom",        name: "Intercom" },
  { slug: "gmail",           name: "Gmail" },
  { slug: "googleads",       name: "Google Ads" },
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
            Your AI team connects directly to your existing stack. No middleware, no manual exports — just raw data flowing into intelligent analysis.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {integrations.map((item, i) => (
            <motion.div
              key={item.slug}
              className="flex flex-col items-center justify-center py-5 px-3 border border-edge bg-panel/50 hover:border-amber/50 hover:bg-surface transition-all rounded-sm cursor-pointer group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-foreground/5 border border-foreground/10 mb-3 group-hover:border-amber/30 transition-colors p-2">
                <IntegrationLogo slug={item.slug} name={item.name} size={24} />
              </div>
              <span className="font-mono text-[10px] text-steel group-hover:text-foreground transition-colors tracking-wider text-center leading-tight">
                {item.name.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
