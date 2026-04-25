/**
 * Plug-and-play trial service contract.
 *
 * Swap the implementation (e.g. localStorage -> Supabase / your own API)
 * by providing a different class that satisfies `TrialService`.
 * No UI code should need to change.
 */

export type DedupeReason =
  | "company_domain_taken"
  | "work_email_domain_taken"
  | "payment_fingerprint_taken"
  | "company_name_collision"
  | "free_email_not_allowed";

export interface SignupInput {
  /** Legal/trading name as the user typed it. */
  companyName: string;
  /** Primary website URL (we'll extract the domain). */
  websiteUrl: string;
  /** Work email — must match company domain in production. */
  workEmail: string;
  fullName: string;
  /** Payment method fingerprint from card tokenisation (e.g. Stripe pm fingerprint). */
  paymentFingerprint?: string;
  acceptedTerms: boolean;
}

export interface TrialAccount {
  id: string;
  companyName: string;
  companyDomain: string;
  emailDomain: string;
  workEmail: string;
  fullName: string;
  paymentFingerprint?: string;
  createdAt: string;
  status: "active" | "expired" | "converted" | "blocked";
}

export type DedupeCheckResult =
  | { ok: true }
  | { ok: false; reason: DedupeReason; message: string };

export interface BusinessProfile {
  accountId: string;
  // Auto-discovery
  detectedCompanyName?: string;
  detectedPlatform?: string;
  detectedCategory?: string;
  detectedProductCount?: number;
  // User-confirmed
  channels: string[];
  monthlyRevenueRange?: string;
  primaryGoal?: string;
  biggestConstraint?: string;
  audience?: string;
  competitors?: string;
  notes?: string;
  completedAt?: string;
}

export interface TrialService {
  /** Pre-flight check before submit; returns first failure. */
  checkDedupe(input: SignupInput): Promise<DedupeCheckResult>;

  /** Create the trial account. Re-runs dedupe atomically. */
  createTrial(input: SignupInput): Promise<
    | { ok: true; account: TrialAccount }
    | { ok: false; reason: DedupeReason; message: string }
  >;

  /** Lightweight URL scan to pre-fill briefing. */
  scanWebsite(url: string): Promise<{
    companyName?: string;
    platform?: string;
    category?: string;
    productCount?: number;
  }>;

  saveBusinessProfile(profile: BusinessProfile): Promise<void>;
  getBusinessProfile(accountId: string): Promise<BusinessProfile | null>;

  getCurrentAccount(): Promise<TrialAccount | null>;
}
