"use client";

import { trackEvent } from "@/lib/analytics";

export const helperAnalytics = {
  launcherViewed() {
    trackEvent("helper_launcher_viewed", {
      event_category: "helper",
    });
  },

  opened(method: "manual" | "auto", reason?: string) {
    trackEvent("helper_opened", {
      event_category: "helper",
      event_label: method,
      helper_open_reason: reason ?? method,
    });
  },

  dismissed() {
    trackEvent("helper_dismissed", {
      event_category: "helper",
    });
  },

  journeySelected(journeyId: string) {
    trackEvent("journey_selected", {
      event_category: "helper",
      event_label: journeyId,
    });
  },

  sectionGuided(sectionId: string, journeyId: string) {
    trackEvent("section_guided", {
      event_category: "helper",
      event_label: sectionId,
      journey: journeyId,
    });
  },

  serviceOpened(serviceId: string, journeyId?: string) {
    trackEvent("service_opened", {
      event_category: "helper",
      event_label: serviceId,
      journey: journeyId,
    });
  },

  caseStudyOpened(projectId: string, journeyId?: string) {
    trackEvent("case_study_opened", {
      event_category: "helper",
      event_label: projectId,
      journey: journeyId,
    });
  },

  blogOpened(slug: string, journeyId?: string) {
    trackEvent("blog_opened", {
      event_category: "helper",
      event_label: slug,
      journey: journeyId,
    });
  },

  bookingOpened(journeyId?: string) {
    trackEvent("booking_opened", {
      event_category: "helper",
      event_label: journeyId ?? "direct",
    });
  },

  personalizationReset() {
    trackEvent("personalization_reset", {
      event_category: "helper",
    });
  },
};
