import Link from "next/link";
import {
  Activity,
  BarChart3,
  Bot,
  Beer,
  HeartPulse,
  Package,
  ShoppingCart,
  Truck,
  Handshake,
} from "lucide-react";
import { TechToolsSlider } from "@/components/TechToolsSlider";

const ROLES = [
  {
    company: "IQVIA",
    role: "Software Development Engineer 4 (SDE4)",
    period: "May 2025 – Present",
    note: "Current role after ABInBev — healthcare / life-sciences products, analytics-heavy backends, data visualisation and AI-related application work.",
  },
  {
    company: "ABInBev",
    role: "Full-stack software developer",
    period: "June 2025 (prior to IQVIA)",
    note: "Brewery & commercial ops support — analytics-heavy backends, performance work and production systems. Moved to IQVIA as SDE4 after this role.",
  },
  {
    company: "Learnbay",
    role: "Full-stack software developer",
    period: "Mar 2024 – Apr 2025",
    note: "AI product engineering, cross-platform apps, payment and calendar integrations on production AWS stacks.",
  },
  {
    company: "Skillslash",
    role: "Full-stack developer",
    period: "Mar 2021 – Mar 2024",
    note: "Ecommerce, dashboards, invoice SaaS and multi-tenant admin products with real-time analytics.",
  },
] as const;

const DOMAINS = [
  {
    icon: BarChart3,
    title: "Analytics-heavy backends",
    body: "Aggregation pipelines, reporting APIs and dashboards that turn operational data into decisions — not vanity charts.",
  },
  {
    icon: Activity,
    title: "Chart.js & data visualisation",
    body: "Graphical representation of KPIs, trends and funnels with Chart.js and related charting stacks for ops and leadership views.",
  },
  {
    icon: Bot,
    title: "AI-related applications",
    body: "LLM features, assistants and AI workflows wired into real products — language learning, copilots and automation lanes.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare apps",
    body: "Domain workflows where reliability, access control and clear data presentation matter as much as speed.",
  },
  {
    icon: Truck,
    title: "Delivery & logistics",
    body: "Fleet, shipment and field-ops surfaces — status tracking, routes and money movement for delivery organisations.",
  },
  {
    icon: Beer,
    title: "Brewery & commercial ops",
    body: "Earlier experience supporting brewery and commercial systems — performance, SQL, Redis and stable release cadence under load.",
  },
  {
    icon: Handshake,
    title: "Sales support apps",
    body: "Tools that help sales teams track pipelines, reliability and client follow-ups without living in spreadsheets.",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce + full tracking",
    body: "Multiple ecommerce sites with order, inventory, payment and delivery tracking — admin visibility end to end.",
  },
  {
    icon: Package,
    title: "Production SaaS ops",
    body: "Invoicing, booking, HR and multi-tenant dashboards shipped with auth, payments and monitoring in place.",
  },
] as const;

export function ProfessionalExperience() {
  return (
    <section
      id="professional-experience"
      className="scroll-mt-28 border-b border-white/5 bg-black px-4 py-16 md:py-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Professional working experience
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Official roles across analytics, AI and ops products
          </h2>
          <p className="mt-3 text-zinc-400">
            Beyond the named case studies above, day-job work has covered analytics-heavy backends,
            Chart.js dashboards, healthcare and logistics products, brewery and sales support systems,
            and several ecommerce sites with full order and delivery tracking. Much of that work sits
            under NDA — this is the honest shape of it.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {ROLES.map((role) => (
            <article
              key={role.company}
              className="rounded-2xl border border-white/10 bg-zinc-950/50 p-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{role.company}</h3>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                  {role.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">{role.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{role.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-500">
            Domains &amp; product types shipped
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOMAINS.map((domain) => (
              <div
                key={domain.title}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300">
                  <domain.icon className="h-4 w-4" />
                </div>
                <h4 className="mt-4 text-base font-semibold text-white">{domain.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{domain.body}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-sm text-zinc-500">
          Need an example closest to your industry?{" "}
          <Link href="/book" className="text-white underline underline-offset-4 hover:text-zinc-300">
            Book a call
          </Link>{" "}
          — I&apos;ll walk through the most relevant experience without inventing fictional case
          studies. Full timeline also on the{" "}
          <Link href="/about" className="text-white underline underline-offset-4 hover:text-zinc-300">
            About page
          </Link>
          .
        </p>

        <div className="mt-16 border-t border-white/5 pt-14">
          <TechToolsSlider />
        </div>
      </div>
    </section>
  );
}
