import { NextRequest, NextResponse } from "next/server";
import { sendCalculatorLeadNotification } from "@/lib/email";
import {
  calculateMvpCost,
  formatUsd,
  formatWeeks,
  type CalculatorAnswers,
} from "@/lib/mvp-cost-calculator";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const answers = body.answers as CalculatorAnswers;

    if (!email || !EMAIL_RE.test(email) || email.length > 160) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Missing calculator answers." }, { status: 400 });
    }

    // Recompute server-side rather than trusting the client-sent result.
    const result = calculateMvpCost(answers);
    const costRange = `${formatUsd(result.cost.min)}–${formatUsd(result.cost.max)}`;
    const weeksRange = `${formatWeeks(result.weeks.min)}–${formatWeeks(result.weeks.max)} weeks`;
    const breakdown = result.breakdown.map((item) => item.label);

    await sendCalculatorLeadNotification({ email, costRange, weeksRange, breakdown });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting calculator lead:", error);
    return NextResponse.json({ error: "Failed to send estimate." }, { status: 500 });
  }
}
