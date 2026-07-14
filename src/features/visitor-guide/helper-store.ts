"use client";

import { create } from "zustand";
import type { HelperStep, JourneyResult, BriefData } from "./helper-types";
import { resolveJourney } from "./journey-engine";
import { helperActions } from "./action-runner";
import { saveVisitorPreference, loadVisitorPreference, clearVisitorPreference } from "./visitor-memory";
import { helperAnalytics } from "./helper-analytics";

const initialBriefData: BriefData = {
  building: "",
  stage: "Idea",
  challenge: "Need complete development",
  timeline: "Not decided",
  name: "",
  email: "",
  phone: "",
};

type HelperState = {
  // UI state
  isOpen: boolean;
  buttonVisible: boolean;
  currentStep: HelperStep;
  dismissed: boolean;

  // Journey state
  selectedJourneyId: string | null;
  journeyResult: JourneyResult | null;

  // Returning visitor
  isReturningVisitor: boolean;
  previousJourneyId: string | null;

  // Project brief state
  briefData: BriefData;
  briefSubStep: number;
  isSubmittingBrief: boolean;
  briefError: string | null;

  // Actions
  open: () => void;
  close: () => void;
  showButton: () => void;
  chooseJourney: (journeyId: string) => void;
  back: () => void;
  reset: () => void;
  dismiss: () => void;
  initFromMemory: () => void;

  // Brief Actions
  startBrief: () => void;
  updateBriefData: (data: Partial<BriefData>) => void;
  nextBriefSubStep: () => void;
  prevBriefSubStep: () => void;
  submitBrief: () => Promise<boolean>;
};

export const useHelperStore = create<HelperState>((set, get) => ({
  isOpen: false,
  buttonVisible: false,
  currentStep: "journey-select",
  dismissed: false,
  selectedJourneyId: null,
  journeyResult: null,
  isReturningVisitor: false,
  previousJourneyId: null,

  briefData: { ...initialBriefData },
  briefSubStep: 0,
  isSubmittingBrief: false,
  briefError: null,

  open: () => {
    set({ isOpen: true, buttonVisible: true, currentStep: "journey-select" });
  },

  close: () => {
    set({ isOpen: false });
  },

  showButton: () => {
    if (get().dismissed) return;
    set({ buttonVisible: true });
  },

  chooseJourney: (journeyId: string) => {
    const result = resolveJourney(journeyId);
    if (!result) return;

    set({
      selectedJourneyId: journeyId,
      journeyResult: result,
      currentStep: "journey-result",
    });

    helperAnalytics.journeySelected(journeyId);

    // Scroll and highlight the first relevant section
    helperActions.scrollAndHighlight(result.journey.firstSectionId);
    helperAnalytics.sectionGuided(result.journey.firstSectionId, journeyId);

    // Save to visitor memory
    saveVisitorPreference({ selectedJourney: journeyId });
  },

  back: () => {
    set({
      currentStep: "journey-select",
      selectedJourneyId: null,
      journeyResult: null,
    });
  },

  reset: () => {
    clearVisitorPreference();
    set({
      currentStep: "journey-select",
      selectedJourneyId: null,
      journeyResult: null,
      isReturningVisitor: false,
      previousJourneyId: null,
      briefData: { ...initialBriefData },
      briefSubStep: 0,
    });
    helperAnalytics.personalizationReset();
  },

  dismiss: () => {
    sessionStorage.setItem("helper_dismissed", "1");
    set({
      dismissed: true,
      isOpen: false,
      buttonVisible: false,
    });
    helperAnalytics.dismissed();
  },

  initFromMemory: () => {
    if (typeof window === "undefined") return;

    // Check session dismissal
    if (sessionStorage.getItem("helper_dismissed") === "1") {
      set({ dismissed: true });
      return;
    }

    const pref = loadVisitorPreference();
    if (pref?.selectedJourney) {
      set({
        isReturningVisitor: true,
        previousJourneyId: pref.selectedJourney,
        buttonVisible: true,
      });
    }

    // Update last visited
    saveVisitorPreference({ lastVisitedAt: new Date().toISOString() });
  },

  startBrief: () => {
    set({
      currentStep: "project-brief",
      briefSubStep: 0,
      briefData: { ...initialBriefData },
      briefError: null,
      isSubmittingBrief: false,
    });
  },

  updateBriefData: (data) => {
    set((state) => ({
      briefData: { ...state.briefData, ...data },
    }));
  },

  nextBriefSubStep: () => {
    set((state) => ({
      briefSubStep: state.briefSubStep + 1,
    }));
  },

  prevBriefSubStep: () => {
    set((state) => ({
      briefSubStep: Math.max(0, state.briefSubStep - 1),
    }));
  },

  submitBrief: async () => {
    const { briefData, selectedJourneyId } = get();
    set({ isSubmittingBrief: true, briefError: null });

    // Map stages to exact server validation matches
    let apiStage = "Idea / validating";
    if (briefData.stage === "Prototype") {
      apiStage = "Ready to build";
    } else if (briefData.stage === "Live product" || briefData.stage === "Existing application") {
      apiStage = "Already have something live";
    }

    const payload = {
      name: briefData.name,
      contact: briefData.phone
        ? `${briefData.email} (Phone: ${briefData.phone})`
        : briefData.email,
      building: `${briefData.building}\n\n[Main Challenge: ${briefData.challenge}]\n[Timeline: ${briefData.timeline}]`,
      stage: apiStage,
      budget: "Not specified",
      source: `ai-helper${selectedJourneyId ? `-${selectedJourneyId}` : ""}`,
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      set({ isSubmittingBrief: false, briefSubStep: 6 });
      return true;
    } catch (err: any) {
      set({
        isSubmittingBrief: false,
        briefError: err.message || "An unexpected error occurred.",
      });
      return false;
    }
  },
}));
