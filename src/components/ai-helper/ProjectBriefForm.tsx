"use client";

import React, { useState } from "react";
import { useHelperStore } from "@/features/visitor-guide/helper-store";
import { helperActions } from "@/features/visitor-guide/action-runner";
import { ArrowLeft, ArrowRight, Loader2, Sparkles, Check, Phone, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = ["Idea", "Design", "Prototype", "Existing application", "Live product"];

const CHALLENGES = [
  "Need complete development",
  "Need technical architecture",
  "Need AI integration",
  "Performance problems",
  "Production readiness",
  "Need ongoing development support",
];

const TIMELINES = [
  "Within one month",
  "One to three months",
  "Three to six months",
  "Not decided",
];

export function ProjectBriefForm() {
  const {
    briefData,
    briefSubStep,
    isSubmittingBrief,
    briefError,
    updateBriefData,
    nextBriefSubStep,
    prevBriefSubStep,
    submitBrief,
    back,
  } = useHelperStore();

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleNext = () => {
    setValidationError(null);

    if (briefSubStep === 1) {
      if (!briefData.building || briefData.building.trim().length < 5) {
        setValidationError("Please describe your project in at least 5 characters.");
        return;
      }
    }

    if (briefSubStep === 5) {
      if (!briefData.name || briefData.name.trim().length < 2) {
        setValidationError("Please enter your name.");
        return;
      }
      if (!briefData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(briefData.email)) {
        setValidationError("Please enter a valid email address.");
        return;
      }
    }

    nextBriefSubStep();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!briefData.name || briefData.name.trim().length < 2) {
      setValidationError("Please enter your name.");
      return;
    }
    if (!briefData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(briefData.email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    const success = await submitBrief();
    if (!success) {
      // Error is set in store and will render below
    }
  };

  // Step 0: Invitation to prepare brief
  if (briefSubStep === 0) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-center">
          <Sparkles className="mx-auto h-6 w-6 text-emerald-400 mb-2" />
          <h4 className="text-sm font-semibold text-white">Let&apos;s build a project brief</h4>
          <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
            I can help you prepare a quick outline of your requirements before you book. Somanath will receive this before the call.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={nextBriefSubStep}
              className="w-full rounded-lg bg-emerald-500 py-2.5 text-xs font-semibold text-black hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5"
            >
              Prepare project brief
              <ArrowRight className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => helperActions.openBooking()}
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-white/10 transition-colors"
            >
              Skip and book direct
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={back}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to recommendations
        </button>
      </div>
    );
  }

  // Step 1: Project Description
  if (briefSubStep === 1) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Question 1 of 5
          </label>
          <h4 className="text-sm font-semibold text-white">What are you trying to build or improve?</h4>
          <textarea
            value={briefData.building}
            onChange={(e) => updateBriefData({ building: e.target.value })}
            placeholder="Describe the SaaS MVP, features, or performance issues you want to address..."
            rows={4}
            className="w-full rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:border-emerald-400/30 focus:outline-none transition-colors"
          />
          {validationError && (
            <p className="text-[11px] text-red-400 font-medium">{validationError}</p>
          )}
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={prevBriefSubStep}
            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
          >
            Next
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Project Stage
  if (briefSubStep === 2) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Question 2 of 5
          </label>
          <h4 className="text-sm font-semibold text-white">What stage is the project in?</h4>
          <div className="grid gap-1.5">
            {STAGES.map((stage) => (
              <button
                key={stage}
                type="button"
                onClick={() => updateBriefData({ stage })}
                className={cn(
                  "w-full rounded-lg border p-2.5 text-left text-xs transition-colors",
                  briefData.stage === stage
                    ? "border-emerald-400/30 bg-emerald-400/5 text-white"
                    : "border-white/5 bg-white/[0.01] text-zinc-400 hover:border-white/10 hover:text-white"
                )}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={prevBriefSubStep}
            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </button>
          <button
            type="button"
            onClick={nextBriefSubStep}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
          >
            Next
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Main Challenge
  if (briefSubStep === 3) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Question 3 of 5
          </label>
          <h4 className="text-sm font-semibold text-white">What is your main challenge?</h4>
          <div className="grid gap-1.5">
            {CHALLENGES.map((challenge) => (
              <button
                key={challenge}
                type="button"
                onClick={() => updateBriefData({ challenge })}
                className={cn(
                  "w-full rounded-lg border p-2.5 text-left text-xs transition-colors",
                  briefData.challenge === challenge
                    ? "border-emerald-400/30 bg-emerald-400/5 text-white"
                    : "border-white/5 bg-white/[0.01] text-zinc-400 hover:border-white/10 hover:text-white"
                )}
              >
                {challenge}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={prevBriefSubStep}
            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </button>
          <button
            type="button"
            onClick={nextBriefSubStep}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
          >
            Next
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  // Step 4: Timeline
  if (briefSubStep === 4) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Question 4 of 5
          </label>
          <h4 className="text-sm font-semibold text-white">What timeline are you considering?</h4>
          <div className="grid gap-1.5">
            {TIMELINES.map((timeline) => (
              <button
                key={timeline}
                type="button"
                onClick={() => updateBriefData({ timeline })}
                className={cn(
                  "w-full rounded-lg border p-2.5 text-left text-xs transition-colors",
                  briefData.timeline === timeline
                    ? "border-emerald-400/30 bg-emerald-400/5 text-white"
                    : "border-white/5 bg-white/[0.01] text-zinc-400 hover:border-white/10 hover:text-white"
                )}
              >
                {timeline}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={prevBriefSubStep}
            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </button>
          <button
            type="button"
            onClick={nextBriefSubStep}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
          >
            Next
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  // Step 5: Contact details
  if (briefSubStep === 5) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
            Question 5 of 5
          </label>
          <h4 className="text-sm font-semibold text-white">How should I contact you?</h4>

          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
            <input
              type="text"
              value={briefData.name}
              onChange={(e) => updateBriefData({ name: e.target.value })}
              placeholder="Your name"
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-600 focus:border-emerald-400/30 focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
            <input
              type="email"
              value={briefData.email}
              onChange={(e) => updateBriefData({ email: e.target.value })}
              placeholder="Your email address"
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-600 focus:border-emerald-400/30 focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
            <input
              type="tel"
              value={briefData.phone}
              onChange={(e) => updateBriefData({ phone: e.target.value })}
              placeholder="Phone / WhatsApp number (optional)"
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-600 focus:border-emerald-400/30 focus:outline-none transition-colors"
            />
          </div>

          {validationError && (
            <p className="text-[11px] text-red-400 font-medium">{validationError}</p>
          )}

          {briefError && (
            <p className="text-[11px] text-red-400 font-medium">{briefError}</p>
          )}
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={prevBriefSubStep}
            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            disabled={isSubmittingBrief}
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmittingBrief}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-emerald-400 disabled:bg-zinc-700 disabled:text-zinc-400 transition-colors"
          >
            {isSubmittingBrief ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Brief
                <ArrowRight className="h-3 w-3" />
              </>
            )}
          </button>
        </div>
      </form>
    );
  }

  // Step 6: Success
  if (briefSubStep === 6) {
    return (
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-center space-y-4">
        <div className="mx-auto h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Check className="h-4 w-4 text-emerald-400" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Project brief submitted!</h4>
          <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
            I&apos;ve sent your brief directly to Somanath. Now, book a free strategy call to discuss it.
          </p>
        </div>
        <button
          type="button"
          onClick={() => helperActions.openBooking()}
          className="w-full rounded-lg bg-white py-2.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
        >
          Book strategy call
        </button>
      </div>
    );
  }

  return null;
}
