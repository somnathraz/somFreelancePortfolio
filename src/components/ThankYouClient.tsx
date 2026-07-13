"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Check,
  CheckCheck,
  Clock,
  Copy,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import {
  clearBookingConfirmation,
  readBookingConfirmation,
  type BookingConfirmation,
} from "@/lib/booking-confirmation";

export function ThankYouClient() {
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const data = readBookingConfirmation();
    setConfirmation(data);
    setReady(true);

    trackEvent("booking_complete", {
      event_category: "engagement",
      event_label: "strategy_call",
      value: 1,
    });
    trackEvent("generate_lead", {
      currency: "USD",
      value: 1,
    });
  }, []);

  const handleCopy = async () => {
    if (!confirmation?.hangoutLink) return;
    try {
      await navigator.clipboard.writeText(confirmation.hangoutLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy meeting link:", err);
    }
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-800" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
          <Check className="h-10 w-10 text-green-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Thank you{confirmation?.name ? `, ${confirmation.name.split(" ")[0]}` : ""}.</h1>
          <p className="text-zinc-400">
            Your strategy call is booked.
            {confirmation?.email ? (
              <>
                {" "}
                A confirmation email is on its way to{" "}
                <span className="text-white">{confirmation.email}</span>.
              </>
            ) : (
              " A confirmation email is on its way."
            )}
          </p>
        </div>

        {confirmation && (
          <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-left">
            {confirmation.date && (
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-sm text-zinc-400">Date &amp; Time</p>
                  <p className="font-medium">
                    {format(new Date(confirmation.date), "EEEE, MMMM d, yyyy")}
                  </p>
                  {confirmation.timeDisplay && (
                    <p className="text-zinc-300">{confirmation.timeDisplay}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-zinc-400" />
              <div>
                <p className="text-sm text-zinc-400">Duration</p>
                <p className="font-medium">20 minutes</p>
              </div>
            </div>

            {confirmation.hangoutLink && (
              <div className="flex items-center gap-3">
                <Video className="h-5 w-5 text-zinc-400" />
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">Video Conference</p>
                    <a
                      href={confirmation.hangoutLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-400 hover:underline"
                    >
                      Join Meeting
                    </a>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="relative rounded-lg p-2 transition-colors hover:bg-zinc-800"
                    title="Copy meeting link"
                    type="button"
                  >
                    {copied ? (
                      <CheckCheck className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 text-zinc-400" />
                    )}
                    {copied && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-[10px] text-white">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button
              variant="outline"
              className="border-zinc-700 text-white hover:bg-zinc-800"
              onClick={() => clearBookingConfirmation()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/case-studies">
            <Button className="bg-white text-black hover:bg-zinc-200">
              See case studies
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
