import type { Metadata } from "next";
import { GrowthLandingPage } from "@/components/growth/GrowthLandingPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo";

const path = "/services/web-app-development";
const title = "Web App Development Services | Somanath Studio";
const description =
  "Custom web app development services for startups and businesses in the US, UK and India: portals, dashboards, booking and SaaS web applications built by a senior engineer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    type: "website",
    images: [{ url: "/og?title=Web%20App%20Development%20Services", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og?title=Web%20App%20Development%20Services"],
  },
};

const faqs = [
  {
    question: "What is web application development?",
    answer:
      "Building software that runs in the browser: users log in, work with data and complete tasks, rather than just reading pages. Client portals, dashboards, booking systems, internal tools and SaaS products are all web applications.",
  },
  {
    question: "What does your web app development process look like?",
    answer:
      "Discovery and written scope, data model and architecture, build in weekly demo cycles on a preview URL, then launch with monitoring, backups and handover documentation.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "Next.js and React with TypeScript for the interface, Node.js for APIs and background jobs, and PostgreSQL for data, deployed to Vercel or your own cloud. We pick widely supported tools so the app is easy to maintain.",
  },
  {
    question: "Web app or mobile app: which do we need?",
    answer:
      "Start with a web app if users work at a desk, need to sign up quickly from a link, or you want one codebase for every device. A mobile app makes sense when the product depends on the camera, location, offline use or push notifications.",
  },
  {
    question: "Do you work with companies in the UK, US and India?",
    answer:
      "Yes. Work is remote from India (IST) with overlap for UK working hours and US East Coast mornings, and you get a fixed estimate before development starts.",
  },
];

export default function WebAppDevelopmentPage() {
  const schema = [
    webPageJsonLd({ path, name: "Web App Development Services", description }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Web App Development", path },
    ]),
    serviceJsonLd({
      path,
      name: "Web App Development Services",
      serviceType: "Web application development",
      description,
      keywords:
        "web app development, web application development, web app development services, web app development company, custom web applications, web application agency",
      areaServed: ["United States", "United Kingdom", "India"],
    }),
    faqPageJsonLd(faqs),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <GrowthLandingPage
        eyebrow="Web app development services"
        title="Custom Web App Development for Startups and Businesses"
        description="Portals, dashboards, booking systems and SaaS web applications, designed around how your users work and built to keep running after launch."
        whoFor={[
          "Startups building their first web application",
          "Businesses replacing spreadsheets and manual workflows with a custom web app",
          "Teams with a slow or fragile web app that needs a senior engineer",
          "Agencies that need a web application developer for client projects",
        ]}
        offerings={[
          {
            title: "Custom web applications",
            body: "Role-based access, forms and workflows, search, file uploads, notifications and reporting, built around your process.",
          },
          {
            title: "Client portals and dashboards",
            body: "Secure areas where customers, partners or staff log in to see data, approve work or manage accounts.",
          },
          {
            title: "Booking and operations systems",
            body: "Scheduling, payments, logistics and back-office tools with integrations to the services you already use.",
          },
          {
            title: "SaaS web apps",
            body: "Multi-tenant products with subscriptions, onboarding and admin tools, ready for paying customers.",
          },
        ]}
        process={[
          { title: "Discovery", body: "Users, workflows and integrations; written scope and estimate." },
          { title: "Design and data model", body: "Screens, data structure and architecture agreed before build." },
          { title: "Build", body: "Weekly demos on a live preview URL." },
          { title: "Launch", body: "Production deploy, monitoring, backups and handover." },
        ]}
        proofs={[
          {
            title: "Web applications in production",
            body: "A calendar booking system, a truck logistics and payments platform and a chat-to-invoice operations tool, documented in the case studies.",
          },
          {
            title: "Built for maintenance",
            body: "TypeScript, a clean data model and documented deployments, so another developer can pick it up later.",
          },
        ]}
        sections={[
          {
            heading: "What makes a web application last",
            paragraphs: [
              "Most web apps that need rewriting failed at the data model or the permissions, not the screens. We design both first, then build the interface on top, so new features do not mean new workarounds.",
              "Every app ships with error tracking, backups and a repeatable deployment, which is what keeps it working once real users depend on it.",
            ],
          },
          {
            heading: "Web application development company or freelancer?",
            paragraphs: [
              "A small, well-defined app can be a freelancer job. Anything with several user roles, payments or integrations needs someone accountable for the whole system. We work as a senior-led team: one engineer owns the build, and specialists join only when needed.",
            ],
          },
        ]}
        faqs={faqs}
        related={[
          { href: "/services/react-development", label: "React development services" },
          { href: "/services/custom-software-development", label: "Custom software development" },
          { href: "/services/saas-development", label: "SaaS development services" },
          { href: "/services/nextjs-development", label: "Next.js development" },
          { href: "/case-studies/studio-booking-platform", label: "Booking platform case study" },
          { href: "/case-studies/vgt", label: "Logistics platform case study" },
        ]}
        pricingNote="Fixed estimate after scoping · NDA available · You own the code"
        primaryCta={{ href: "/contact", label: "Discuss Your Web App" }}
        secondaryCta={{ href: "/case-studies", label: "See case studies" }}
      />
    </>
  );
}
