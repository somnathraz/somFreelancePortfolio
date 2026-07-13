import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryNotification } from "@/lib/email";

const STAGES = new Set([
  "Idea / validating",
  "Ready to build",
  "Already have something live",
  "Need to rebuild / fix an MVP",
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const contact = typeof body.contact === "string" ? body.contact.trim() : "";
    const building = typeof body.building === "string" ? body.building.trim() : "";
    const stage = typeof body.stage === "string" ? body.stage.trim() : "";
    const budget = typeof body.budget === "string" ? body.budget.trim() : "";
    const launchDate = typeof body.launchDate === "string" ? body.launchDate.trim() : "";
    const source =
      typeof body.source === "string" ? body.source.trim() : "saas-mvp-development";

    if (!name || !contact || !building || !stage || !budget) {
      return NextResponse.json(
        { error: "Name, contact, project details, stage, and budget are required." },
        { status: 400 }
      );
    }

    if (
      name.length > 120 ||
      contact.length > 160 ||
      building.length > 2000 ||
      budget.length > 120
    ) {
      return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
    }

    if (!STAGES.has(stage)) {
      return NextResponse.json({ error: "Invalid stage selection." }, { status: 400 });
    }

    await sendEnquiryNotification({
      name,
      contact,
      building,
      stage,
      budget,
      launchDate: launchDate || "Not specified",
      source,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please try again or use WhatsApp." },
      { status: 500 }
    );
  }
}
