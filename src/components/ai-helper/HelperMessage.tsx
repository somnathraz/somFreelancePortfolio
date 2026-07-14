"use client";

import { useHelperStore } from "@/features/visitor-guide/helper-store";
import { ArrowLeft } from "lucide-react";

export function HelperMessage() {
  const { journeyResult, back } = useHelperStore();

  if (!journeyResult) return null;

  const { journey } = journeyResult;

  return (
    <div className="space-y-3">
      {/* Assistant message */}
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3">
        <p className="text-sm leading-relaxed text-zinc-200">
          {journey.message}
        </p>
        <p className="mt-2 text-[11px] text-zinc-500">
          Recommended because you selected &ldquo;{journey.label}&rdquo;
        </p>
      </div>

      {/* Back button */}
      <button
        type="button"
        onClick={back}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-3 w-3" />
        Choose something else
      </button>
    </div>
  );
}
