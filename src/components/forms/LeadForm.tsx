"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Field, SelectInput, TextArea, TextInput } from "@/components/forms/Field";
import { ArrowRight, Button } from "@/components/ui/Button";

const interests = [
  { value: "business-growth-strategy", label: "Business & growth strategy" },
  { value: "project-funding-dpr", label: "Project funding / DPR" },
  { value: "factory-setup-operations", label: "Factory setup & operations" },
  { value: "branding-marketing", label: "Branding & marketing" },
  { value: "technology-automation", label: "Technology & automation" },
  { value: "subsidies-compliance", label: "Subsidies & compliance" },
  { value: "not-sure", label: "Not sure yet — help me scope it" },
];

const revenues = [
  { value: "pre-revenue", label: "Pre-revenue / project stage" },
  { value: "under-1-cr", label: "Under ₹1 crore" },
  { value: "1-5-cr", label: "₹1 – 5 crore" },
  { value: "5-25-cr", label: "₹5 – 25 crore" },
  { value: "25-100-cr", label: "₹25 – 100 crore" },
  { value: "above-100-cr", label: "Above ₹100 crore" },
];

const timelines = [
  { value: "immediate", label: "Immediately — it's urgent" },
  { value: "1-3-months", label: "In 1 – 3 months" },
  { value: "3-6-months", label: "In 3 – 6 months" },
  { value: "exploring", label: "Just exploring" },
];

const industries = [
  "Dairy",
  "Food processing",
  "Sweets & bakery",
  "Agriculture / FPO",
  "Healthcare",
  "Hospitality",
  "Retail / D2C",
  "Engineering & general manufacturing",
  "Other",
];

export function LeadForm({
  resourceSlug,
  submitLabel = "Request a discovery call",
  compact = false,
}: {
  /** Set when the form gates a resource download. */
  resourceSlug?: string;
  submitLabel?: string;
  compact?: boolean;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);
  const attribution = useRef({ source: "", medium: "", campaign: "", landingPath: "" });

  // Capture attribution once, on mount, before any client-side navigation
  // rewrites the URL or the referrer is lost.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let source = params.get("utm_source") ?? "";
    if (!source && document.referrer) {
      try {
        const host = new URL(document.referrer).hostname;
        source = host === window.location.hostname ? "internal" : host;
      } catch {
        source = "referral";
      }
    }
    attribution.current = {
      source: source || "direct",
      medium: params.get("utm_medium") ?? (source && source !== "direct" ? "referral" : "none"),
      campaign: params.get("utm_campaign") ?? "none",
      landingPath: window.location.pathname,
    };
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState("loading");
    setErrors({});

    const payload = {
      ...Object.fromEntries(form.entries()),
      consent: form.get("consent") === "on",
      ...attribution.current,
      resourceSlug: resourceSlug ?? "",
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as {
        ok: boolean;
        reference?: string;
        errors?: Record<string, string>;
        error?: string;
      };

      if (!response.ok || !body.ok) {
        if (body.errors) setErrors(body.errors);
        setState("error");
        return;
      }

      setReference(body.reference ?? null);
      setState("done");
      window.dispatchEvent(new CustomEvent("as:lead-submitted", { detail: { resourceSlug } }));
    } catch {
      setState("error");
      setErrors({ form: "Network error. Please retry, or email engage@anuradhasolutions.in." });
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-panel border border-brand-200 bg-brand-50 p-7">
        <p className="font-serif text-2xl text-ink-900">
          {resourceSlug ? "Your download is on its way." : "Thank you — we have your brief."}
        </p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-700">
          {resourceSlug
            ? "Check your inbox for the file. We've also added you to the Growth Brief; unsubscribe any time."
            : "A partner reviews every enquiry personally. You'll hear from us within one business day with either a calendar link or a straight answer that we're not the right firm for this."}
        </p>
        {reference ? (
          <p className="mt-5 font-mono text-xs uppercase tracking-wider text-brand-700">
            Reference {reference}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className={compact ? "space-y-5" : "grid gap-5 sm:grid-cols-2"}>
        <Field label="Your name" htmlFor="lead-name" required error={errors.name}>
          <TextInput id="lead-name" name="name" autoComplete="name" placeholder="Rajiv Deshmukh" error={Boolean(errors.name)} />
        </Field>

        <Field label="Company or project" htmlFor="lead-company" required error={errors.company}>
          <TextInput id="lead-company" name="company" autoComplete="organization" placeholder="Sahyadri Dairy Pvt Ltd" error={Boolean(errors.company)} />
        </Field>

        <Field label="Work email" htmlFor="lead-email" required error={errors.email}>
          <TextInput id="lead-email" name="email" type="email" autoComplete="email" placeholder="rajiv@company.in" error={Boolean(errors.email)} />
        </Field>

        <Field label="Mobile" htmlFor="lead-phone" required error={errors.phone} hint="We call from a Pune landline, never a bot.">
          <TextInput id="lead-phone" name="phone" type="tel" autoComplete="tel" placeholder="98765 43210" error={Boolean(errors.phone)} />
        </Field>

        <Field label="City" htmlFor="lead-city" required error={errors.city}>
          <TextInput id="lead-city" name="city" autoComplete="address-level2" placeholder="Kolhapur" error={Boolean(errors.city)} />
        </Field>

        <Field label="Industry" htmlFor="lead-industry" required error={errors.industry}>
          <SelectInput id="lead-industry" name="industry" defaultValue="" error={Boolean(errors.industry)}>
            <option value="" disabled>
              Select your sector
            </option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label="What do you need help with?" htmlFor="lead-interest" required error={errors.interest}>
          <SelectInput id="lead-interest" name="interest" defaultValue="" error={Boolean(errors.interest)}>
            <option value="" disabled>
              Select a practice
            </option>
            {interests.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label="Current annual revenue" htmlFor="lead-revenue" required error={errors.revenue}>
          <SelectInput id="lead-revenue" name="revenue" defaultValue="" error={Boolean(errors.revenue)}>
            <option value="" disabled>
              Select a band
            </option>
            {revenues.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label="When do you want to start?" htmlFor="lead-timeline" required error={errors.timeline} className={compact ? "" : "sm:col-span-2"}>
          <SelectInput id="lead-timeline" name="timeline" defaultValue="" error={Boolean(errors.timeline)}>
            <option value="" disabled>
              Select a timeline
            </option>
            {timelines.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field
          label="Tell us about the project"
          htmlFor="lead-message"
          error={errors.message}
          hint="Capacity, location, machinery, funding gap — whatever you already know."
          className={compact ? "" : "sm:col-span-2"}
        >
          <TextArea
            id="lead-message"
            name="message"
            rows={4}
            placeholder="We run a 20,000 LPD chilling centre in Kolhapur and want to add a paneer and ghee line…"
            error={Boolean(errors.message)}
          />
        </Field>
      </div>

      {/* Honeypot — hidden from humans and screen readers, irresistible to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="lead-company-website">Company website</label>
        <input id="lead-company-website" name="companyWebsite" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="lead-consent"
          name="consent"
          type="checkbox"
          className="mt-1 size-4 rounded border-mist-300 accent-brand-600"
        />
        <label htmlFor="lead-consent" className="text-[0.82rem] leading-relaxed text-mist-600">
          I agree to Anuradha Solutions storing these details to respond to my enquiry, as described
          in the{" "}
          <Link href="/legal/privacy" className="text-brand-700 underline underline-offset-2">
            privacy policy
          </Link>
          . No data is sold or shared with lenders without my written consent.
        </label>
      </div>
      {errors.consent ? (
        <p role="alert" className="text-xs font-medium text-critical">
          {errors.consent}
        </p>
      ) : null}

      {errors.form ? (
        <p role="alert" className="rounded-card border border-critical/30 bg-critical/5 px-4 py-3 text-sm text-critical">
          {errors.form}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={state === "loading"} className="group w-full sm:w-auto">
        {state === "loading" ? "Sending…" : submitLabel}
        <ArrowRight />
      </Button>

      <p className="text-xs text-mist-500">
        Average response time last quarter: 5 hours 40 minutes, in business hours.
      </p>
    </form>
  );
}
