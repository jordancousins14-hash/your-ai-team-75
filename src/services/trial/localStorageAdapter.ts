/**
 * Default TrialService implementation backed by localStorage.
 *
 * NOTE: This is a development/demo adapter. Dedupe checks here are
 * client-side only and trivially bypassed by clearing storage.
 * For production, replace with a server-backed adapter (e.g. Supabase)
 * — the UI calls `trialService` and never touches storage directly.
 */

import type {
  BusinessProfile,
  DedupeCheckResult,
  DedupeReason,
  SignupInput,
  TrialAccount,
  TrialService,
} from "./types";
import {
  extractDomain,
  extractEmailDomain,
  isFreeEmailDomain,
  normalizeCompanyName,
} from "./utils";

const ACCOUNTS_KEY = "anlic.trial.accounts";
const PROFILES_KEY = "anlic.trial.profiles";
const CURRENT_KEY = "anlic.trial.currentAccountId";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function fail(reason: DedupeReason, message: string): DedupeCheckResult {
  return { ok: false, reason, message };
}

export class LocalStorageTrialService implements TrialService {
  async checkDedupe(input: SignupInput): Promise<DedupeCheckResult> {
    const accounts = readJson<TrialAccount[]>(ACCOUNTS_KEY, []);
    const companyDomain = extractDomain(input.websiteUrl);
    const emailDomain = extractEmailDomain(input.workEmail);
    const normalizedName = normalizeCompanyName(input.companyName);

    if (isFreeEmailDomain(emailDomain)) {
      return fail(
        "free_email_not_allowed",
        "Please use your work email — free providers like Gmail or Outlook aren't accepted for trial signups."
      );
    }

    for (const acc of accounts) {
      if (acc.status === "blocked") continue;

      if (companyDomain && acc.companyDomain === companyDomain) {
        return fail(
          "company_domain_taken",
          `A trial already exists for ${companyDomain}. Please sign in or contact your team's admin.`
        );
      }
      if (emailDomain && acc.emailDomain === emailDomain) {
        return fail(
          "work_email_domain_taken",
          `Someone from ${emailDomain} has already started a trial. Ask them to invite you.`
        );
      }
      if (
        input.paymentFingerprint &&
        acc.paymentFingerprint === input.paymentFingerprint
      ) {
        return fail(
          "payment_fingerprint_taken",
          "This payment method has already been used for a trial."
        );
      }
      if (
        normalizedName &&
        normalizeCompanyName(acc.companyName) === normalizedName
      ) {
        return fail(
          "company_name_collision",
          `A trial under "${acc.companyName}" already exists. If this is your company, please sign in.`
        );
      }
    }
    return { ok: true };
  }

  async createTrial(input: SignupInput) {
    const dedupe = await this.checkDedupe(input);
    if (!dedupe.ok) return dedupe;

    const account: TrialAccount = {
      id: `acc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      companyName: input.companyName.trim(),
      companyDomain: extractDomain(input.websiteUrl),
      emailDomain: extractEmailDomain(input.workEmail),
      workEmail: input.workEmail.trim().toLowerCase(),
      fullName: input.fullName.trim(),
      paymentFingerprint: input.paymentFingerprint,
      createdAt: new Date().toISOString(),
      status: "active",
    };

    const accounts = readJson<TrialAccount[]>(ACCOUNTS_KEY, []);
    accounts.push(account);
    writeJson(ACCOUNTS_KEY, accounts);
    writeJson(CURRENT_KEY, account.id);

    return { ok: true as const, account };
  }

  async scanWebsite(url: string) {
    // Mock auto-discovery. Replace with a real scan (e.g. Firecrawl) server-side.
    const domain = extractDomain(url);
    if (!domain) return {};

    const root = domain.split(".")[0];
    const platform = domain.includes("myshopify.com")
      ? "Shopify"
      : domain.includes("etsy.com")
        ? "Etsy"
        : domain.includes("squarespace.com")
          ? "Squarespace"
          : "Custom / Unknown";

    return {
      companyName: root.charAt(0).toUpperCase() + root.slice(1),
      platform,
      category: "General Merchandise",
      productCount: Math.floor(20 + Math.random() * 120),
    };
  }

  async saveBusinessProfile(profile: BusinessProfile) {
    const all = readJson<Record<string, BusinessProfile>>(PROFILES_KEY, {});
    all[profile.accountId] = {
      ...profile,
      completedAt: profile.completedAt ?? new Date().toISOString(),
    };
    writeJson(PROFILES_KEY, all);
  }

  async getBusinessProfile(accountId: string) {
    const all = readJson<Record<string, BusinessProfile>>(PROFILES_KEY, {});
    return all[accountId] ?? null;
  }

  async getCurrentAccount() {
    const id = readJson<string | null>(CURRENT_KEY, null);
    if (!id) return null;
    const accounts = readJson<TrialAccount[]>(ACCOUNTS_KEY, []);
    return accounts.find((a) => a.id === id) ?? null;
  }
}
