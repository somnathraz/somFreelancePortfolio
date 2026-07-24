import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT_EMAIL, LINKEDIN_URL, whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Somanath Studio | Talk to a Software Engineer",
  description:
    "Tell an engineer what you're building. Your first conversation focuses on requirements, technical risks, delivery options, and the correct team setup — not a sales pitch.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Somanath Studio | Talk to a Software Engineer",
    description:
      "Your first discussion focuses on scope, risks, delivery options, and what should happen next.",
    url: "/contact",
    type: "website",
    images: [
      {
        url: "/og?title=Talk%20to%20an%20Engineer",
        width: 1200,
        height: 630,
        alt: "Contact Somanath Studio",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/5 px-4 pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="container relative z-10 mx-auto max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
            Contact
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Tell an Engineer What You&apos;re Building
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            Your first conversation is with someone who can understand the product, evaluate the
            technical requirements, and recommend the appropriate delivery setup.
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            No generic sales presentation. The first discussion focuses on scope, risks, delivery
            options, and what should happen next.
          </p>
        </div>
      </section>

      <section className="border-b border-white/5 px-4 py-16 md:py-20">
        <div className="container mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <ContactForm />
          </div>

          <aside className="space-y-8 lg:pt-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Prefer a live call?
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Book a short call with an engineer to walk through requirements and team options.
              </p>
              <Link
                href="/book"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4"
              >
                Talk to an engineer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Direct channels
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="hover:text-white"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl(
                      "Hi Somanath — I'd like to discuss a project with an engineer."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-sm leading-relaxed text-zinc-500">
                Senior-led SaaS engineering without unnecessary agency layers. Work directly with
                experienced engineers, with additional specialists added according to your project
                requirements.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
      <ClientMobileNav />
    </main>
  );
}
