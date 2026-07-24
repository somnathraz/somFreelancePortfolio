"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

const PRODUCT_TYPES = ["New product", "Existing system"] as const;

const SUPPORT_NEEDS = [
  "SaaS MVP Development",
  "AI SaaS Development",
  "Next.js Performance",
  "Production Readiness",
  "Custom Software",
  "Agency / white-label partnership",
  "Not sure yet",
] as const;

const ENGAGEMENTS = [
  "Focused engineer",
  "Compact product team",
  "Extended engineering team",
  "Not sure",
] as const;

const BUDGETS = [
  "Under ₹1L / under $1.5k",
  "₹1L–3L / $1.5k–4k",
  "₹3L–8L / $4k–10k",
  "₹8L+ / $10k+",
  "Prefer to discuss",
] as const;

const fieldClass =
  "h-11 border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-600 focus-visible:border-white/25 focus-visible:ring-white/10";

const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500";

const selectClass =
  "h-11 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 text-sm text-white focus-visible:border-white/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/10";

export function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [building, setBuilding] = useState("");
  const [productType, setProductType] = useState<string>(PRODUCT_TYPES[0]);
  const [supportNeeded, setSupportNeeded] = useState<string>(SUPPORT_NEEDS[6]);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState<string>(BUDGETS[4]);
  const [engagement, setEngagement] = useState<string>(ENGAGEMENTS[3]);
  const [timezone, setTimezone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          building,
          stage: productType,
          budget,
          launchDate: timeline || "Not specified",
          source: "contact",
          supportNeeded,
          engagement,
          timezone: timezone || "Not specified",
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      trackEvent("generate_lead", {
        event_category: "engagement",
        event_label: "contact_form",
        currency: "INR",
        value: 1,
      });
      trackEvent("form_submit", {
        event_category: "engagement",
        event_label: "contact_page",
      });

      setStatus("success");
      setName("");
      setContact("");
      setBuilding("");
      setProductType(PRODUCT_TYPES[0]);
      setSupportNeeded(SUPPORT_NEEDS[6]);
      setTimeline("");
      setBudget(BUDGETS[4]);
      setEngagement(ENGAGEMENTS[3]);
      setTimezone("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send. Try WhatsApp instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15">
          <Check className="h-6 w-6 text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">Details received</h3>
        <p className="mt-2 text-zinc-400">
          An engineer will review your requirements and reply within one business day (IST).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <Input
            id="contact-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email or WhatsApp
          </label>
          <Input
            id="contact-email"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={fieldClass}
            placeholder="you@company.com or +91…"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-building" className={labelClass}>
          What are you building?
        </label>
        <Textarea
          id="contact-building"
          required
          rows={4}
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          className="min-h-[110px] border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-600 focus-visible:border-white/25 focus-visible:ring-white/10"
          placeholder="Product idea, current system, users, and the outcome you need…"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-product-type" className={labelClass}>
            New product or existing system?
          </label>
          <select
            id="contact-product-type"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className={selectClass}
          >
            {PRODUCT_TYPES.map((option) => (
              <option key={option} value={option} className="bg-zinc-950">
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contact-support" className={labelClass}>
            What support do you need?
          </label>
          <select
            id="contact-support"
            value={supportNeeded}
            onChange={(e) => setSupportNeeded(e.target.value)}
            className={selectClass}
          >
            {SUPPORT_NEEDS.map((option) => (
              <option key={option} value={option} className="bg-zinc-950">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-timeline" className={labelClass}>
            Desired timeline
          </label>
          <Input
            id="contact-timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className={fieldClass}
            placeholder="e.g. 4–8 weeks, this quarter"
          />
        </div>
        <div>
          <label htmlFor="contact-budget" className={labelClass}>
            Approximate budget range
          </label>
          <select
            id="contact-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={selectClass}
          >
            {BUDGETS.map((option) => (
              <option key={option} value={option} className="bg-zinc-950">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-engagement" className={labelClass}>
            Preferred engagement
          </label>
          <select
            id="contact-engagement"
            value={engagement}
            onChange={(e) => setEngagement(e.target.value)}
            className={selectClass}
          >
            {ENGAGEMENTS.map((option) => (
              <option key={option} value={option} className="bg-zinc-950">
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contact-timezone" className={labelClass}>
            Country / time zone
          </label>
          <Input
            id="contact-timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className={fieldClass}
            placeholder="e.g. US Pacific, UK, IST"
          />
        </div>
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "loading"}
        size="lg"
        className="h-12 w-full bg-white text-base text-black hover:bg-zinc-200 sm:w-auto sm:min-w-[260px]"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send to an engineer
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
