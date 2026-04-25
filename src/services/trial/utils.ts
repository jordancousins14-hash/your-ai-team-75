/** Domain + name normalisation utilities used by every adapter. */

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "yahoo.com",
  "yahoo.co.uk",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "mail.com",
  "yandex.com",
  "zoho.com",
  "msn.com",
]);

export function extractDomain(input: string): string {
  if (!input) return "";
  let s = input.trim().toLowerCase();
  // Strip protocol
  s = s.replace(/^https?:\/\//, "");
  // Strip path/query
  s = s.split("/")[0].split("?")[0];
  // Strip leading www.
  s = s.replace(/^www\./, "");
  return s;
}

export function extractEmailDomain(email: string): string {
  if (!email) return "";
  const at = email.lastIndexOf("@");
  if (at < 0) return "";
  return email.slice(at + 1).trim().toLowerCase();
}

export function isFreeEmailDomain(domain: string): boolean {
  return FREE_EMAIL_DOMAINS.has(domain);
}

export function normalizeCompanyName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(
      /\b(ltd|limited|inc|incorporated|llc|llp|plc|gmbh|s\.?a\.?|s\.?r\.?l\.?|co|company|corp|corporation|holdings|group)\b/g,
      ""
    )
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return !!u.hostname && u.hostname.includes(".");
  } catch {
    return false;
  }
}
