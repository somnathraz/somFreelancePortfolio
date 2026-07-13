"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

const STAGES = [
  "Idea / validating",
  "Ready to build",
  "Already have something live",
  "Need to rebuild / fix an MVP",
] as const;

const BUDGETS = [
  "Under ₹75,000",
  "₹75,000 – ₹1.5L",
  "₹1.5L – ₹3L",
  "₹3L+",
  "Not sure yet",
] as const;

const fieldClass =
  "h-11 border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-600 focus-visible:border-white/25 focus-visible:ring-white/10";

const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500";

export function MvpEnquiryForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [building, setBuilding] = useState("");
  const [stage, setStage] = useState<string>(STAGES[1]);
  const [budget, setBudget] = useState<string>(BUDGETS[1]);
  const [launchDate, setLaunchDate] = useState("");
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
          stage,
          budget,
          launchDate,
          source: "saas-mvp-development",
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      trackEvent("generate_lead", {
        event_category: "engagement",
        event_label: "mvp_enquiry_form",
        currency: "INR",
        value: 1,
      });
      trackEvent("form_submit", {
        event_category: "engagement",
        event_label: "saas_mvp_enquiry",
      });

      setStatus("success");
      setName("");
      setContact("");
      setBuilding("");
      setStage(STAGES[1]);
      setBudget(BUDGETS[1]);
      setLaunchDate("");
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
          I&apos;ll review your project and reply within one business day (IST).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="mvp-name" className={labelClass}>
            Name
          </label>
          <Input
            id="mvp-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={fieldClass}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="mvp-contact" className={labelClass}>
            Email or WhatsApp
          </label>
          <Input
            id="mvp-contact"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="you@company.com or +91…"
            className={fieldClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="mvp-building" className={labelClass}>
          What are you building?
        </label>
        <Textarea
          id="mvp-building"
          required
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          placeholder="Briefly describe the product, users, and the outcome you need."
          className={`${fieldClass} min-h-24`}
          rows={4}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="mvp-stage" className={labelClass}>
            Current stage
          </label>
          <select
            id="mvp-stage"
            required
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className={`${fieldClass} w-full rounded-md px-3 text-sm outline-none`}
          >
            {STAGES.map((s) => (
              <option key={s} value={s} className="bg-zinc-950 text-white">
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="mvp-budget" className={labelClass}>
            Approximate budget
          </label>
          <select
            id="mvp-budget"
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={`${fieldClass} w-full rounded-md px-3 text-sm outline-none`}
          >
            {BUDGETS.map((b) => (
              <option key={b} value={b} className="bg-zinc-950 text-white">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="mvp-launch" className={labelClass}>
          Expected launch date
        </label>
        <Input
          id="mvp-launch"
          value={launchDate}
          onChange={(e) => setLaunchDate(e.target.value)}
          placeholder="e.g. August 2026 / ASAP / flexible"
          className={fieldClass}
        />
      </div>

      {status === "error" && error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="h-12 w-full bg-white text-base text-black hover:bg-zinc-200 sm:w-auto sm:min-w-[220px]"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send project details
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
