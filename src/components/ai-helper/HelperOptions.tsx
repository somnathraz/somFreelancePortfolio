"use client";

import { useHelperStore } from "@/features/visitor-guide/helper-store";
import { getAllJourneys } from "@/features/visitor-guide/journey-config";
import { helperAnalytics } from "@/features/visitor-guide/helper-analytics";
import { helperActions } from "@/features/visitor-guide/action-runner";
import { ArrowRight, Rocket, Brain, Gauge, Briefcase, Compass, Calendar } from "lucide-react";
import type { JourneyConfig } from "@/features/visitor-guide/helper-types";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  Brain,
  Gauge,
  Briefcase,
  Compass,
  Calendar,
};

export function HelperOptions() {
  const { chooseJourney } = useHelperStore();
  const journeys = getAllJourneys();

  const handleJourneySelect = (journey: JourneyConfig) => {
    chooseJourney(journey.id);
  };

  const handleBookDirect = () => {
    helperAnalytics.bookingOpened("direct");
    helperActions.openBooking();
  };

  return (
    <div className="space-y-1.5">
      {journeys.map((journey) => {
        const Icon = ICON_MAP[journey.icon];
        return (
          <button
            key={journey.id}
            type="button"
            onClick={() => handleJourneySelect(journey)}
            className="group flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 text-left text-sm text-zinc-300 transition-all duration-200 hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-white"
          >
            {Icon && (
              <Icon className="h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-emerald-400" />
            )}
            <span className="flex-1">{journey.label}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-400" />
          </button>
        );
      })}

      {/* Direct booking option */}
      <button
        type="button"
        onClick={handleBookDirect}
        className="group flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 text-left text-sm text-zinc-300 transition-all duration-200 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-white"
      >
        <Calendar className="h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-cyan-400" />
        <span className="flex-1">Book a call</span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-400" />
      </button>
    </div>
  );
}
