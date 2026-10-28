import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import {
  LABS_DEMO_GITHUB,
  LABS_DEMO_ZIP,
  labsDemoUrl,
} from "@/lib/labs-demo";

const SHOWCASES = [
  { path: "/aura", name: "Aura Studio" },
  { path: "/offday", name: "Offday Energy" },
  { path: "/forme", name: "FORME Architecture" },
  { path: "/relay", name: "Relay" },
  { path: "/nova", name: "Nova" },
  { path: "/helios", name: "HELIOS" },
  { path: "/vela", name: "Vela Spatial" },
  { path: "/singularity", name: "Singularity" },
  { path: "/mycelia", name: "Mycelia" },
  { path: "/flux", name: "Flux" },
] as const;

export function PremiumFrontendHub() {
  return (
    <section
      id="premium-frontend"
      className="relative border-y border-white/[0.06] bg-zinc-950/80 px-6 py-20 lg:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-indigo-400/80">
          Premium Frontend
        </p>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ten animated websites. Open them live, then fork the code.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Interactive product 3D, scroll storytelling, architecture, agents, and
          GPU experiments — live on demo.somanathkhadanga.com. Open-source ZIP
          available to download.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={labsDemoUrl("/")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200"
          >
            Open gallery
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={LABS_DEMO_ZIP}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/30 hover:text-white"
          >
            Download ZIP
          </a>
          <a
            href={LABS_DEMO_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/30 hover:text-white"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/30 hover:text-white"
          >
            All templates
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SHOWCASES.map((item) => (
            <li key={item.path}>
              <a
                href={labsDemoUrl(item.path)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-zinc-300 transition hover:border-white/15 hover:bg-white/[0.04] hover:text-white"
              >
                <span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                    {item.path}
                  </span>
                  <span className="mt-0.5 block font-medium">{item.name}</span>
                </span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-600 transition group-hover:text-indigo-300" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
