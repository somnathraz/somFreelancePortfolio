import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Load content files at module level (server-side only, cached between requests)
function loadContentFiles() {
  const contentDir = path.join(process.cwd(), "src/content/assistant");

  const about = fs.readFileSync(path.join(contentDir, "about.md"), "utf-8");
  const faq = fs.readFileSync(path.join(contentDir, "faq.md"), "utf-8");
  const boundaries = fs.readFileSync(path.join(contentDir, "boundaries.md"), "utf-8");
  const services = fs.readFileSync(path.join(contentDir, "services.json"), "utf-8");
  const projects = fs.readFileSync(path.join(contentDir, "projects.json"), "utf-8");

  return { about, faq, boundaries, services, projects };
}

function buildSystemPrompt(calendarContext: string = ""): string {
  const { about, faq, boundaries, services, projects } = loadContentFiles();

  return `You are a website assistant for Somanath Khadanga's portfolio site at somanathkhadanga.com.

Your ONLY job is to help visitors understand Somanath's services, projects, experience, process, availability, and whether he can help with their specific problem. You then guide them toward booking a call.

---

## STRICT GUARDRAILS — READ CAREFULLY

You are NOT a general-purpose AI assistant. You are NOT a coding tutor. You are NOT a bug fixer. You are NOT a technical advisor for the visitor's own projects.

REFUSE IMMEDIATELY if the visitor asks you to:
- Write, debug, or review code for them
- Help fix bugs in their application
- Explain programming concepts or tutorials
- Recommend third-party tools (unless it relates to Somanath's stack)
- Do anything unrelated to understanding Somanath's services and whether to hire him

When refusing out-of-scope requests, say something like:
"I'm only here to help you understand Somanath's work and whether he's the right fit for your project. For project-specific help, you can [book a call with him](/book)."

---

## WHAT YOU CAN ANSWER

- Questions about Somanath's services (SaaS MVP, AI SaaS, performance optimization, production readiness, ongoing partner)
- Questions about his experience, tech stack, and past projects
- Questions about process, timeline, pricing (direct to booking for specifics)
- Questions about availability, location, timezone
- Whether Somanath can help with a specific type of project
- FAQ-style questions about working with him

---

## KNOWLEDGE BASE

### About Somanath
${about}

### Services
${services}

### Projects
${projects}

### FAQ
${faq}

### Behaviour Boundaries
${boundaries}
${calendarContext}

---

## RESPONSE RULES

1. Keep responses short and focused — 2-4 sentences max unless the question genuinely needs more detail.
2. Always use plain text. No markdown headers. Use bullet points sparingly.
3. End with a clear next action when relevant (e.g., "Want to discuss your project? [Book a 20-min call](/book).")
4. Never make up projects, clients, or capabilities not documented above.
5. If genuinely unsure, say "I'm not sure — best to ask Somanath directly in a call."
6. NEVER pretend to be Somanath himself. You are his website guide.
7. If the visitor seems ready to hire, guide them to /book or suggest they fill the project brief.`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Validate message structure
    for (const m of messages) {
      if (typeof m.role !== "string" || typeof m.content !== "string") {
        return NextResponse.json({ error: "Invalid message format." }, { status: 400 });
      }
      if (!["user", "model"].includes(m.role)) {
        return NextResponse.json({ error: "Invalid role." }, { status: 400 });
      }
      if (m.content.length > 1000) {
        return NextResponse.json({ error: "Message too long." }, { status: 400 });
      }
    }

    // Cap history to last 10 messages to keep context tight
    const recentMessages = messages.slice(-10);
    const lastMessage = recentMessages[recentMessages.length - 1];

    if (lastMessage.role !== "user") {
      return NextResponse.json({ error: "Last message must be from user." }, { status: 400 });
    }

    // Fetch calendar availability context if the query is booking-related
    let calendarContext = "";
    const isBookingQuery = /book|meeting|slot|appointment|schedule|free time|available|call/i.test(lastMessage.content);

    if (isBookingQuery) {
      try {
        const origin = req.nextUrl.origin;
        const availRes = await fetch(`${origin}/api/calendar/availability?timezone=Asia/Kolkata`);
        if (availRes.ok) {
          const availData = await availRes.json();
          const availableSlots: string[] = [];
          for (const day of availData.days || []) {
            const dayAvail = day.slots.filter((s: any) => s.available);
            if (dayAvail.length > 0) {
              const formattedSlots = dayAvail.slice(0, 3).map((s: any) => s.display);
              availableSlots.push(`${day.dayName} (${day.dateDisplay}): ${formattedSlots.join(", ")}`);
            }
            if (availableSlots.length >= 3) break;
          }
          if (availableSlots.length > 0) {
            calendarContext = `\n\n### CURRENT REAL-TIME AVAILABILITY (IST):\nUse these times to answer booking queries if they want options. Remind them they can schedule a call at /book:\n${availableSlots.join("\n")}\n\n`;
          }
        }
      } catch (err) {
        console.error("Failed to fetch calendar context for AI:", err);
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY not set");
      return NextResponse.json(
        { error: "AI assistant is not configured. Please book a call directly." },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: buildSystemPrompt(calendarContext),
      generationConfig: {
        maxOutputTokens: 1000,  // Keep responses concise but don't cut off abruptly
        temperature: 0.3,      // Low temperature = more grounded, less creative hallucination
      },
    });

    // Convert our messages format to Gemini format
    // Last message is the user's current message, history is everything before
    // Filter out leading model messages — Gemini requires the first history entry to be role 'user'
    const allHistory = recentMessages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "model",
      parts: [{ text: m.content }],
    }));

    // Drop any model messages at the start of history (e.g. the client-side welcome message)
    const firstUserIdx = allHistory.findIndex((m) => m.role === "user");
    const history = firstUserIdx >= 0 ? allHistory.slice(firstUserIdx) : [];

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or book a call directly." },
      { status: 500 }
    );
  }
}
