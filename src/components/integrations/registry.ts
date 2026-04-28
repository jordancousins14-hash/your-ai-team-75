export type IntegrationMeta = {
  name: string;
  logoSlug: string;
  brandColor: string;
};

export const INTEGRATION_REGISTRY: Record<string, IntegrationMeta> = {
  shopify:          { name: "Shopify",           logoSlug: "shopify",         brandColor: "96BF48" },
  amazon:           { name: "Amazon",             logoSlug: "amazon",          brandColor: "FF9900" },
  etsy:             { name: "Etsy",               logoSlug: "etsy",            brandColor: "F1641E" },
  tiktok:           { name: "TikTok",             logoSlug: "tiktok",          brandColor: "EE1D52" },
  instagram:        { name: "Instagram",          logoSlug: "instagram",       brandColor: "E4405F" },
  stripe:           { name: "Stripe",             logoSlug: "stripe",          brandColor: "635BFF" },
  gorgias:          { name: "Gorgias",            logoSlug: "gorgias",         brandColor: "1B1F23" },
  zendesk:          { name: "Zendesk",            logoSlug: "zendesk",         brandColor: "03363D" },
  intercom:         { name: "Intercom",           logoSlug: "intercom",        brandColor: "1F8DED" },
  slack:            { name: "Slack",              logoSlug: "slack",           brandColor: "4A154B" },
  microsoftteams:   { name: "Microsoft Teams",    logoSlug: "microsoftteams",  brandColor: "6264A7" },
  gmail:            { name: "Gmail",              logoSlug: "gmail",           brandColor: "EA4335" },
  googleanalytics:  { name: "Google Analytics",   logoSlug: "googleanalytics", brandColor: "E37400" },
  mixpanel:         { name: "Mixpanel",           logoSlug: "mixpanel",        brandColor: "7856FF" },
  meta:             { name: "Meta Ads",           logoSlug: "meta",            brandColor: "0668E1" },
  googleads:        { name: "Google Ads",         logoSlug: "googleads",       brandColor: "4285F4" },
  klaviyo:          { name: "Klaviyo",            logoSlug: "klaviyo",         brandColor: "1A1A1A" },
  hubspot:          { name: "HubSpot",            logoSlug: "hubspot",         brandColor: "FF7A59" },
  front:            { name: "Front",              logoSlug: "front",           brandColor: "F25533" },
  freshdesk:        { name: "Freshdesk",          logoSlug: "freshdesk",       brandColor: "00B388" },
  helpscout:        { name: "HelpScout",          logoSlug: "helpscout",       brandColor: "1292EE" },
};

/** Look up by display name (case-insensitive). Falls back to null. */
export function findByName(displayName: string): IntegrationMeta | null {
  const lower = displayName.toLowerCase().replace(/\s+/g, "");
  for (const key of Object.keys(INTEGRATION_REGISTRY)) {
    const entry = INTEGRATION_REGISTRY[key];
    if (
      key === lower ||
      entry.name.toLowerCase().replace(/\s+/g, "") === lower
    ) {
      return entry;
    }
  }
  return null;
}
