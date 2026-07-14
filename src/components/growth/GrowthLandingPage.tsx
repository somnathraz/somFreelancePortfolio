import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientMobileNav } from "@/components/ClientMobileNav";

type Bullet = { title: string; body: string };

type LandingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  whoFor: string[];
  offerings: Bullet[];
  process: Bullet[];
  proofs?: Bullet[];
  pricingNote?: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export function GrowthLandingPage({
  eyebrow,
  title,
  description,
  whoFor,
  offerings,
  process,
  proofs = [],
  pricingNote,
  primaryCta,
  secondaryCta,
}: LandingPageProps) {
  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-white/20">
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/5 px-4 pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="absolute inset-0 z-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="container relative z-10 mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400">
            <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
            {eyebrow}
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tighter text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-md bg-white px-6 text-base font-medium text-black hover:bg-zinc-200"
            >
              {primaryCta.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-md border border-white/10 px-6 text-base font-medium text-white hover:bg-white/5"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
          {pricingNote ? (
            <p className="mt-5 text-xs text-zinc-600">{pricingNote}</p>
          ) : null}
        </div>
      </section>

      <section className="border-b border-white/5 px-4 py-16">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Who this is for</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {whoFor.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-white/5 px-4 py-16">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">What you get</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {offerings.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-zinc-950/40 p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 px-4 py-16">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">How we work</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, i) => (
              <div key={item.title} className="rounded-xl border border-white/10 p-5">
                <p className="font-mono text-xs text-zinc-600">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {proofs.length > 0 ? (
        <section className="border-b border-white/5 px-4 py-16">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Proof</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {proofs.map((item) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-zinc-950/40 p-5">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-20 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white">Ready to talk?</h2>
          <p className="mt-3 text-zinc-400">
            White-label friendly. NDA-friendly. Remote for international clients. Next.js, Node.js and
            practical AI.
          </p>
          <Link
            href={primaryCta.href}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-white px-6 text-base font-medium text-black hover:bg-zinc-200"
          >
            {primaryCta.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <ClientMobileNav />
    </main>
  );
}
