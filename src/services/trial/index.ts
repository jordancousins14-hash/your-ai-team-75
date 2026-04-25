/**
 * Single import point for the trial service.
 *
 * To swap backends (e.g. Supabase, custom REST API), change the
 * implementation assigned to `trialService` here. No UI changes required.
 *
 *   import { SupabaseTrialService } from "./supabaseAdapter";
 *   export const trialService: TrialService = new SupabaseTrialService();
 */

import { LocalStorageTrialService } from "./localStorageAdapter";
import type { TrialService } from "./types";

export const trialService: TrialService = new LocalStorageTrialService();

export type {
  TrialService,
  TrialAccount,
  SignupInput,
  BusinessProfile,
  DedupeCheckResult,
  DedupeReason,
} from "./types";
