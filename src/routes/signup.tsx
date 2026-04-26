import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, AlertCircle, Loader2, Shield, CheckCircle2 } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { trialService, type DedupeReason } from "@/services/trial";
import {
  extractDomain,
  extractEmailDomain,
  isValidEmail,
  isValidUrl,
} from "@/services/trial/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Start your trial — Idon Suite" },
      {
        name: "description",
        content:
          "Spin up your AI C-suite in minutes. One trial per company — work email and company domain required.",
      },
      { property: "og:title", content: "Start your trial — Idon Suite" },
      {
        property: "og:description",
        content:
          "Spin up your AI C-suite in minutes. One trial per company — work email required.",
      },
    ],
  }),
  component: SignupPage,
});

type FieldErrors = Partial<
  Record<"companyName" | "websiteUrl" | "workEmail" | "fullName" | "terms", string>
>;

function SignupPage() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<{
    reason: DedupeReason | "validation";
    message: string;
  } | null>(null);

  // Live email-domain hint (catches mismatch with company domain client-side)
  const companyDomain = extractDomain(websiteUrl);
  const emailDomain = extractEmailDomain(workEmail);
  const domainMismatch =
    companyDomain && emailDomain && companyDomain !== emailDomain;

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!companyName.trim()) next.companyName = "Company name is required";
    if (!isValidUrl(websiteUrl)) next.websiteUrl = "Enter a valid website URL";
    if (!isValidEmail(workEmail)) next.workEmail = "Enter a valid work email";
    if (!fullName.trim()) next.fullName = "Your name is required";
    if (!acceptedTerms) next.terms = "Please accept the terms to continue";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await trialService.createTrial({
        companyName,
        websiteUrl,
        workEmail,
        fullName,
        acceptedTerms,
        // paymentFingerprint omitted in this demo — wire from Stripe Elements when added.
      });

      if (!result.ok) {
        setServerError({ reason: result.reason, message: result.message });
        setSubmitting(false);
        return;
      }

      // Account created — go to onboarding briefing.
      navigate({ to: "/onboarding" });
    } catch (err) {
      setServerError({
        reason: "validation",
        message:
          err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="h-16 border-b border-edge bg-panel/80 backdrop-blur-md flex items-center justify-between px-6 md:px-8">
        <Link to="/">
          <BrandMark size="md" />
        </Link>
        <Link
          to="/app/dashboard"
          className="text-xs font-mono uppercase text-steel hover:text-amber transition-colors"
        >
          Already a member? Sign in
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-12 grid lg:grid-cols-[1.2fr_1fr] gap-12">
        {/* Form */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-amber mb-3">
            14-day trial · No card required
          </p>
          <h1 className="font-serif-display italic text-4xl md:text-5xl mb-3">
            Hire your AI C-suite.
          </h1>
          <p className="text-steel mb-8 max-w-md">
            Create your account and your Chief of Staff will brief the rest of
            the team on your business in under 5 minutes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field
              label="Company name"
              value={companyName}
              onChange={setCompanyName}
              placeholder="Acme Ceramics Ltd"
              error={errors.companyName}
              autoComplete="organization"
            />
            <Field
              label="Company website"
              value={websiteUrl}
              onChange={setWebsiteUrl}
              placeholder="https://acme-ceramics.com"
              error={errors.websiteUrl}
              autoComplete="url"
              hint="Your primary store or website. We'll use this for auto-discovery."
            />
            <Field
              label="Work email"
              value={workEmail}
              onChange={setWorkEmail}
              placeholder="you@acme-ceramics.com"
              error={errors.workEmail}
              type="email"
              autoComplete="email"
              hint={
                domainMismatch
                  ? `Heads up: your email domain (${emailDomain}) doesn't match your company domain (${companyDomain}). This may slow down verification.`
                  : "Free email providers (gmail, outlook, yahoo, etc.) aren't accepted."
              }
              hintTone={domainMismatch ? "warning" : "muted"}
            />
            <Field
              label="Your name"
              value={fullName}
              onChange={setFullName}
              placeholder="Jordan Patel"
              error={errors.fullName}
              autoComplete="name"
            />

            <label className="flex items-start gap-3 text-sm text-steel cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 accent-amber w-4 h-4"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-amber hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-amber hover:underline">
                  Privacy Policy
                </a>
                . I confirm I'm authorised to start a trial for my company.
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs text-red-400 -mt-3">{errors.terms}</p>
            )}

            {serverError && (
              <div
                role="alert"
                className="border border-red-500/40 bg-red-500/10 rounded-md p-4 flex gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-red-300 mb-1">
                    We can't start a new trial
                  </p>
                  <p className="text-red-200/80">{serverError.message}</p>
                  {serverError.reason !== "validation" && (
                    <Link
                      to="/app/dashboard"
                      className="inline-flex items-center gap-1 mt-2 text-amber hover:underline text-xs font-mono uppercase"
                    >
                      Sign in instead <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-amber text-panel font-mono uppercase text-sm tracking-wider px-6 py-3.5 rounded-sm hover:bg-amber/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating your account…
                </>
              ) : (
                <>
                  Start trial <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-xs text-steel/70 text-center">
              By signing up you'll go straight to your Chief of Staff briefing.
            </p>
          </form>
        </div>

        {/* Side panel */}
        <aside className="space-y-6">
          <div className="border border-edge bg-panel rounded-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-amber" />
              <p className="text-xs font-mono uppercase tracking-widest text-amber">
                One trial per company
              </p>
            </div>
            <p className="text-sm text-steel mb-4">
              We verify each signup against:
            </p>
            <ul className="space-y-2.5 text-sm">
              {[
                "Company website domain",
                "Work email domain",
                "Payment method fingerprint",
                "Normalised company name",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber/70 flex-shrink-0 mt-0.5" />
                  <span className="text-flight">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-steel/70 mt-4 leading-relaxed">
              If your team already has a trial, ask them to invite you instead
              of starting a new one.
            </p>
          </div>

          <div className="border border-edge bg-panel rounded-md p-6">
            <p className="text-xs font-mono uppercase tracking-widest text-steel mb-3">
              What happens next
            </p>
            <ol className="space-y-3 text-sm text-flight">
              <Step n={1} label="Create your account (this page)" />
              <Step n={2} label="Brief your Chief of Staff (~5 min)" />
              <Step n={3} label="Your C-suite gets to work" />
            </ol>
          </div>
        </aside>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  hint,
  hintTone = "muted",
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  hintTone?: "muted" | "warning";
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-steel mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={255}
        className={`w-full bg-surface border rounded-sm px-4 py-3 text-sm text-flight placeholder:text-steel/50 focus:outline-none focus:border-amber transition-colors ${
          error ? "border-red-500/60" : "border-edge"
        }`}
      />
      {error ? (
        <p className="text-xs text-red-400 mt-1.5">{error}</p>
      ) : hint ? (
        <p
          className={`text-xs mt-1.5 ${
            hintTone === "warning" ? "text-amber" : "text-steel/70"
          }`}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function Step({ n, label }: { n: number; label: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-6 h-6 rounded-full border border-amber/50 text-amber text-xs font-mono flex items-center justify-center flex-shrink-0">
        {n}
      </span>
      <span>{label}</span>
    </li>
  );
}
