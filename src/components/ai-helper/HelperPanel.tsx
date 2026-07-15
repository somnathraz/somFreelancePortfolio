"use client";

import React, { useEffect, useState } from "react";
import { useHelperStore } from "@/features/visitor-guide/helper-store";
import { HelperOptions } from "./HelperOptions";
import { HelperMessage } from "./HelperMessage";
import { RecommendationCard } from "./RecommendationCard";
import { ProjectBriefForm } from "./ProjectBriefForm";
import { AiChat } from "./AiChat";
import { X, Sparkles, MessageSquare, Map, Maximize2, Minimize2 } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
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

  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tab: "guide" = structured journey system, "ask" = free-text AI chat
  const [activeTab, setActiveTab] = useState<"guide" | "ask">("guide");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 767px)");
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Collapse if helper closes
  useEffect(() => {
    if (!isOpen) {
      setIsExpanded(false);
    }
  }, [isOpen]);

  if (dismissed || !isOpen) return null;

  const handleReturningContinue = () => {
    if (previousJourneyId) {
      chooseJourney(previousJourneyId);
    }
  };

  const renderContent = () => {
    // AI Chat tab takes full control
    if (activeTab === "ask") {
      return <AiChat />;
    }

    // Guide tab: journey selection & recommendations
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
          <DrawerHeader className="px-0 pb-3">
            <DrawerTitle className="text-lg font-semibold text-white text-left flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              {activeTab === "ask" ? "Ask Archon" : currentStep === "journey-select"
                ? "How can I help?"
                : currentStep === "project-brief"
                ? "Project Brief"
                : "Archon's Picks"}
            </DrawerTitle>
            <DrawerDescription className="text-zinc-500 text-left text-xs">
              {activeTab === "ask"
                ? "AI assistant by Somanath · Scoped to portfolio data."
                : currentStep === "journey-select"
                ? "I'm Archon — I'll guide you to the right service."
                : currentStep === "project-brief"
                ? "Quick questions before booking a call."
                : "Curated picks matched to your goals."}
            </DrawerDescription>
          </DrawerHeader>

          {/* Tab switcher */}
          {currentStep !== "project-brief" && (
            <div className="mb-3 flex rounded-xl border border-white/10 bg-white/5 p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab("guide")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-all ${
                  activeTab === "guide"
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Map className="h-3 w-3" />
                Guide
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("ask")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-all ${
                  activeTab === "ask"
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <MessageSquare className="h-3 w-3" />
                Ask Archon
              </button>
            </div>
          )}

          <div className={activeTab === "ask" ? "flex flex-col h-[45vh]" : "max-h-[50vh] overflow-y-auto pb-6"}>
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
            <span className="text-[10px] text-zinc-600 font-mono">Archon · built by Som</span>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop layout: Floating panel above launcher or full window overlay
  const panelEl = (
    <div
      className={cn(
        "pointer-events-auto border border-white/10 bg-zinc-950/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300",
        isExpanded
          ? "fixed inset-4 md:inset-10 z-[500] flex flex-col rounded-2xl bg-zinc-950/98 shadow-[0_24px_80px_rgba(0,0,0,0.9)] backdrop-blur-lg"
          : "w-[22rem] overflow-hidden rounded-2xl"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-white/5 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-white flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            {activeTab === "ask" ? "Ask Archon" : currentStep === "journey-select"
              ? "How can I help?"
              : currentStep === "project-brief"
              ? "Project Brief"
              : "Archon's Picks"}
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-500">
            {activeTab === "ask"
              ? "AI assistant by Somanath · Scoped to portfolio data."
              : currentStep === "journey-select"
              ? "I'm Archon — I'll guide you to the right service."
              : currentStep === "project-brief"
              ? "Quick questions before booking a call."
              : "Curated picks matched to your goals."}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {activeTab === "ask" && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-md p-1 text-zinc-500 hover:bg-white/5 hover:text-white transition-colors"
              aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          )}
          <button
            type="button"
            onClick={close}
            className="rounded-md p-1 text-zinc-500 hover:bg-white/5 hover:text-white transition-colors"
            aria-label="Close helper"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tab switcher — hidden during brief form */}
      {currentStep !== "project-brief" && (
        <div className="flex border-b border-white/5">
          <button
            type="button"
            onClick={() => {
              setActiveTab("guide");
              setIsExpanded(false);
            }}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors border-b-2 ${
              activeTab === "guide"
                ? "border-emerald-500 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Map className="h-3 w-3" />
            Guide
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ask")}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors border-b-2 ${
              activeTab === "ask"
                ? "border-emerald-500 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <MessageSquare className="h-3 w-3" />
            Ask Archon
          </button>
        </div>
      )}

      {/* Body */}
      <div
        className={cn(
          activeTab === "ask" ? "flex flex-col flex-1 min-h-0" : "overflow-y-auto",
          isExpanded ? "p-6" : "p-4",
          !isExpanded && activeTab !== "ask" && "max-h-[24rem]"
        )}
        style={activeTab === "ask" && !isExpanded ? { height: "26rem" } : undefined}
      >
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
        <span className="text-[10px] text-zinc-700 font-mono">Archon · built by Som</span>
      </div>
    </div>
  );

  if (!mounted) return null;

  if (isExpanded) {
    return createPortal(
      <>
        <div
          className="fixed inset-0 z-[490] bg-black/60 backdrop-blur-sm transition-opacity pointer-events-auto"
          onClick={() => setIsExpanded(false)}
        />
        {panelEl}
      </>,
      document.body
    );
  }

  return panelEl;
}
