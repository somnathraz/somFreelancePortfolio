"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import {
  CALCULATOR_QUESTIONS,
  DEFAULT_ANSWERS,
  calculateMvpCost,
  formatUsd,
  formatWeeks,
  type CalculatorAnswers,
  type CalculatorField,
} from "@/lib/mvp-cost-calculator";

export function MvpCostCalculator() {
  const [answers, setAnswers] = useState<CalculatorAnswers>(DEFAULT_ANSWERS);
  const [email, setEmail] = useState("");
  const [leadState, setLeadState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const result = useMemo(() => calculateMvpCost(answers), [answers]);

  function selectOption(field: CalculatorField, value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (leadState === "sent") setLeadState("idle");
  }

  async function sendEstimate(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || leadState === "sending") return;
    setLeadState("sending");
    try {
      const res = await fetch("/api/tools/cost-calculator-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, answers, result }),
      });
      if (!res.ok) throw new Error("Request failed");
      setLeadState("sent");
    } catch {
      setLeadState("error");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div className="order-last space-y-5 lg:order-1">
        {CALCULATOR_QUESTIONS.map((question) => (
          <fieldset
            key={question.field}
            className="rounded-xl border border-white/10 bg-zinc-950/40 p-5"
          >
            <legend className="px-0 text-base font-semibold text-white">{question.title}</legend>
            <p className="mt-1 text-sm text-zinc-500">{question.hint}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {question.options.map((option) => {
                const selected = answers[question.field] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => selectOption(question.field, option.value)}
                    className={`flex flex-col items-start rounded-lg border px-3 py-3 text-left text-sm transition-colors ${
                      selected
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-black/40 text-zinc-300 hover:border-white/30"
                    }`}
                  >
                    <span className="flex w-full items-center justify-between gap-2 font-medium">
                      {option.label}
                      {selected ? <Check className="h-4 w-4 shrink-0" /> : null}
                    </span>
                    <span className={`mt-1 text-xs ${selected ? "text-zinc-700" : "text-zinc-500"}`}>
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="order-first lg:order-2 lg:sticky lg:top-24">
        <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Estimated range
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {formatUsd(result.cost.min)}–{formatUsd(result.cost.max)}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Roughly {formatWeeks(result.weeks.min)}–{formatWeeks(result.weeks.max)} weeks, senior-led,
            single engineer.
          </p>

          <details className="mt-5 text-sm text-zinc-400">
            <summary className="cursor-pointer font-medium text-zinc-300 hover:text-white">
              See what&apos;s driving this estimate
            </summary>
            <ul className="mt-3 space-y-2 border-t border-white/10 pt-3">
              {result.breakdown.map((item) => (
                <li key={item.label} className="flex items-start justify-between gap-3">
                  <span className="text-zinc-400">{item.label}</span>
                  <span className="shrink-0 font-mono text-xs text-zinc-500">
                    {item.cost.min === 0 && item.cost.max === 0
                      ? "included"
                      : `${item.cost.min < 0 ? "–" : "+"}${formatUsd(
                          Math.abs(item.cost.min)
                        )}–${formatUsd(Math.abs(item.cost.max))}`}
                  </span>
                </li>
              ))}
            </ul>
          </details>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/book"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-medium text-black hover:bg-zinc-200"
            >
              Book a scoped estimate call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/saas-mvp-audit"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/10 px-5 text-sm font-medium text-white hover:bg-white/5"
            >
              Already have an MVP? Get it audited
            </Link>
          </div>

          <form onSubmit={sendEstimate} className="mt-6 border-t border-white/10 pt-5">
            <label htmlFor="calc-email" className="text-xs font-medium text-zinc-400">
              Email this estimate to yourself
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="calc-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-10 flex-1 rounded-md border border-white/10 bg-black/40 px-3 text-sm text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={leadState === "sending" || leadState === "sent"}
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-md border border-white/10 px-4 text-sm font-medium text-white hover:bg-white/5 disabled:opacity-60"
              >
                {leadState === "sending" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : leadState === "sent" ? (
                  "Sent"
                ) : (
                  "Send"
                )}
              </button>
            </div>
            {leadState === "error" ? (
              <p className="mt-2 text-xs text-red-400">
                Couldn&apos;t send that — try again or use the booking link above.
              </p>
            ) : null}
            {leadState === "sent" ? (
              <p className="mt-2 text-xs text-zinc-500">
                Sent. I may follow up if it looks like a real project.
              </p>
            ) : null}
          </form>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-zinc-600">
          Directional estimate based on common SaaS MVP cost drivers — scope, roles, billing, AI,
          integrations, design and launch quality. Not a fixed quote. Real numbers depend on your
          specific requirements.
        </p>
      </div>
    </div>
  );
}
