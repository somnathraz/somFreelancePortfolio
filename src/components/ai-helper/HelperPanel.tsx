"use client";

import React, { useEffect, useState } from "react";
import { useHelperStore } from "@/features/visitor-guide/helper-store";
import { HelperOptions } from "./HelperOptions";
import { HelperMessage } from "./HelperMessage";
import { RecommendationCard } from "./RecommendationCard";
import { ProjectBriefForm } from "./ProjectBriefForm";
import { X, Sparkles } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";

export function HelperPanel() {
  const { isOpen, close, currentStep, dismissed, dismiss, isReturningVisitor, previousJourneyId, chooseJourney, reset } =
    useHelperStore();

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 767px)");
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  if (dismissed || !isOpen) return null;

  const handleReturningContinue = () => {
    if (previousJourneyId) {
      chooseJourney(previousJourneyId);
    }
  };

  const renderContent = () => {
    if (isReturningVisitor && currentStep === "journey-select" && previousJourneyId) {
      return (
        <div className="space-y-4 p-1">
          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-center">
            <Sparkles className="mx-auto h-6 w-6 text-emerald-400 mb-2" />
            <h4 className="text-sm font-semibold text-white">Welcome back!</h4>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              You were previously exploring services for this site. Would you like to continue where you left off?
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleReturningContinue}
                className="w-full rounded-lg bg-emerald-500 py-2 text-xs font-semibold text-black hover:bg-emerald-400 transition-colors"
              >
                Continue previous guide
              </button>
              <button
                type="button"
                onClick={reset}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/10 transition-colors"
              >
                Start fresh
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === "project-brief") {
      return <ProjectBriefForm />;
    }

    return (
      <div className="space-y-4">
        {currentStep === "journey-select" ? (
          <HelperOptions />
        ) : (
          <>
            <HelperMessage />
            <RecommendationCard />
          </>
        )}
      </div>
    );
  };

  // Mobile layout: Drawer
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && close()}>
        <DrawerContent className="bg-zinc-950 border-white/10 text-foreground p-4">
          <DrawerHeader className="px-0 pb-4">
            <DrawerTitle className="text-lg font-semibold text-white text-left flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              {currentStep === "journey-select"
                ? "How can I help you?"
                : currentStep === "project-brief"
                ? "Project Brief"
                : "Recommendations"}
            </DrawerTitle>
            <DrawerDescription className="text-zinc-500 text-left text-xs">
              {currentStep === "journey-select"
                ? "I&apos;ll guide you to the right services, projects, and blogs."
                : currentStep === "project-brief"
                ? "Help Somanath understand your project goals."
                : "Suggested actions and links for your goal."}
            </DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[50vh] overflow-y-auto pb-6">
            {renderContent()}
          </div>

          <DrawerFooter className="px-0 pt-4 border-t border-white/5 flex flex-row items-center justify-between">
            <button
              type="button"
              onClick={dismiss}
              className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Don&apos;t show again this session
            </button>
            <span className="text-[10px] text-zinc-600 font-mono">Navigator v1.0</span>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop layout: Floating panel above launcher
  return (
    <div className="pointer-events-auto w-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-white/5 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-white flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            {currentStep === "journey-select"
              ? "How can I help you?"
              : currentStep === "project-brief"
              ? "Project Brief Form"
              : "Guided Navigation"}
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-500">
            {currentStep === "journey-select"
              ? "Select an option to jump to the right section."
              : currentStep === "project-brief"
              ? "Answer a few brief questions before booking."
              : "Here&apos;s what I found for your goals."}
          </p>
        </div>
        <button
          type="button"
          onClick={close}
          className="rounded-md p-1 text-zinc-500 hover:bg-white/5 hover:text-white transition-colors"
          aria-label="Close helper"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Body */}
      <div className="max-h-[24rem] overflow-y-auto p-4">
        {renderContent()}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/5 bg-zinc-900/10 px-4 py-2.5">
        <button
          type="button"
          onClick={dismiss}
          className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Don&apos;t show again this session
        </button>
        <span className="text-[10px] text-zinc-700 font-mono">Navigator v1.0</span>
      </div>
    </div>
  );
}
