"use client";

import type { ReactNode } from "react";
import Marquee from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

type Tool = {
  name: string;
  blurb: string;
  accent: string;
  logo: ReactNode;
};

function LogoWrap({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("flex h-10 w-10 items-center justify-center", className)} aria-hidden>
      {children}
    </span>
  );
}

const AwsLogo = (
  <LogoWrap className="text-orange-400">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M6.76 11.64c0 .39.1.7.4.93.28.25.67.41 1.24.54l1.48.34c1.36.31 2.3.8 2.82 1.47.52.66.79 1.44.79 2.47 0 1.13-.41 2.04-1.23 2.75-.82.7-1.94 1.05-3.36 1.05-1.16 0-2.15-.22-2.97-.66-.81-.45-1.4-.98-1.75-1.58l1.66-1.07c.22.42.57.75 1.05.98.48.23 1.03.35 1.65.35.7 0 1.23-.14 1.58-.41.35-.28.53-.64.53-1.09 0-.42-.16-.75-.49-1-.48-.36-1.22-.62-2.21-.88l-1.17-.28c-1.35-.33-2.3-.82-2.83-1.48C4.06 12.4 3.8 11.5 3.8 10.39c0-1.1.4-1.99 1.2-2.67.8-.68 1.88-1.02 3.24-1.02.97 0 1.83.18 2.57.54.74.36 1.28.85 1.63 1.47l-1.55 1.01c-.3-.54-.72-.94-1.27-1.2-.55-.26-1.14-.39-1.78-.39-.61 0-1.1.14-1.45.41-.35.27-.53.64-.53 1.1z" />
      <path d="M18.4 18.9c-1.48 1.1-3.63 1.66-6.13 1.66-2.91 0-5.28-.85-7.09-2.55C3.38 16.41 2.4 14.13 2.4 11.3c0-2.9 1.03-5.22 3.07-6.95C7.5 2.62 10.2 1.7 13.5 1.7c2.4 0 4.35.52 5.84 1.56l-1.35 1.74c-1.15-.74-2.6-1.11-4.36-1.11-2.35 0-4.27.68-5.74 2.03-1.48 1.35-2.22 3.19-2.22 5.5 0 2.28.72 4.1 2.17 5.43 1.44 1.33 3.4 2 5.87 2 1.85 0 3.5-.4 4.95-1.2v-3.8h-4.2v-1.9h6.15v6.95z" />
    </svg>
  </LogoWrap>
);

const GcpLogo = (
  <LogoWrap>
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <path fill="#EA4335" d="M12.1 11.3 8.2 4.5A8.5 8.5 0 0 0 4 16.2l3.9-2.3a4 4 0 0 1 4.2-2.6z" />
      <path fill="#4285F4" d="M20 12a8 8 0 0 0-.8-3.5H12v3.3h4.5a4 4 0 0 1-1.7 2.6l3.5 2.7A8 8 0 0 0 20 12z" />
      <path fill="#34A853" d="M12 20a8 8 0 0 0 5.5-2.2l-3.5-2.7A4 4 0 0 1 8 13.9l-3.9 2.3A8 8 0 0 0 12 20z" />
      <path fill="#FBBC05" d="M8 13.9a4 4 0 0 1 0-3.8L4.1 7.8A8 8 0 0 0 4 12a8 8 0 0 0 4.1 1.4l-3.9 2.3" />
    </svg>
  </LogoWrap>
);

const DockerLogo = (
  <LogoWrap className="text-[#2496ED]">
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
      <path d="M4.1 10.1h2.1v2.1H4.1v-2.1zm2.7 0h2.1v2.1H6.8v-2.1zm2.7 0h2.1v2.1H9.5v-2.1zm2.7 0h2.1v2.1h-2.1v-2.1zM6.8 7.7h2.1v2.1H6.8V7.7zm2.7 0h2.1v2.1H9.5V7.7zm2.7 0h2.1v2.1h-2.1V7.7zm0-2.4h2.1v2.1h-2.1V5.3zm3.2 7.4c0 .1-.1.3-.1.4-.6 1-1.6 1.6-3.2 1.6H1.8c-.1-.6-.1-1.2 0-2 .1-.7.3-1.4.6-2 .1-.2.4-.3.6-.3h12.6c.1.4.1.9.1 1.3 0 .3 0 .6-.1 1zm3.8-.7c.3 0 .6.1.7.4.4.8.4 1.5.2 2.2-.1.4-.5.6-.9.6h-1.5c0-.7-.1-1.4-.3-2 .2-.6.6-1.1 1.2-1.2h.6z" />
    </svg>
  </LogoWrap>
);

const K8sLogo = (
  <LogoWrap className="text-[#326CE5]">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 1.5 3.5 6.4v11.2L12 22.5l8.5-4.9V6.4L12 1.5zm0 1.8 6.7 3.9v7.6L12 18.7l-6.7-3.9V7.2L12 3.3zm0 2.4-3.8 6.6h1.6l.6-1.1h3.2l.6 1.1h1.6L12 5.7zm0 2.2.9 1.7H11.1L12 7.9zm-1.5 3.1h3l.9 1.6H9.6l.9-1.6z" />
    </svg>
  </LogoWrap>
);

const CicdLogo = (
  <LogoWrap className="text-emerald-400">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.2 7.3 10.5 15M15.8 7.3 13.5 15M8.5 6h7" strokeLinecap="round" />
    </svg>
  </LogoWrap>
);

const GithubActionsLogo = (
  <LogoWrap className="text-white">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
    </svg>
  </LogoWrap>
);

const NginxLogo = (
  <LogoWrap className="text-[#009639]">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 2 2.5 7.5v9L12 22l9.5-5.5v-9L12 2zm0 2.1 7.4 4.3v7.2L12 19.9l-7.4-4.3V8.4L12 4.1zm-3.2 4.3v7.2h1.8v-4.1l3.2 4.1h2.2V8.4h-1.8v4.1L10.9 8.4H8.8z" />
    </svg>
  </LogoWrap>
);

const RedisLogo = (
  <LogoWrap className="text-[#DC382D]">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 2.2 2.5 6.5v.3L12 11l9.5-4.2v-.3L12 2.2zm-9.5 6.6V13L12 17.3 21.5 13V8.8L12 13.1 2.5 8.8zm0 6.2V19L12 23.3 21.5 19v-3.9L12 19.3 2.5 15z" />
    </svg>
  </LogoWrap>
);

const NextLogo = (
  <LogoWrap className="text-white">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c2 0 3.9-.6 5.5-1.6L9 9.5V17H7.5V7H9l9.2 12.2A9.9 9.9 0 0 0 22 12c0-5.5-4.5-10-10-10zm7.3 16.1L12.6 8.4h1.6l6.8 10.1a10 10 0 0 1-1.7-.4z" />
    </svg>
  </LogoWrap>
);

const ReactLogo = (
  <LogoWrap className="text-[#61DAFB]">
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" transform="rotate(120 12 12)" />
    </svg>
  </LogoWrap>
);

const NodeLogo = (
  <LogoWrap className="text-[#5FA04E]">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 1.6 3.4 6.6v10.8L12 22.4l8.6-5V6.6L12 1.6zm0 1.8 6.8 3.9v7.4L12 18.6l-6.8-3.9V7.3L12 3.4zm-.8 4.2h1.7c2 0 3.3 1 3.3 2.7 0 1.5-.9 2.4-2.3 2.7l2.6 3.6h-2l-2.4-3.4H12.9v3.4h-1.7V7.6zm1.7 1.5v2.2h.3c.8 0 1.3-.4 1.3-1.1 0-.7-.5-1.1-1.3-1.1h-.3z" />
    </svg>
  </LogoWrap>
);

const TsLogo = (
  <LogoWrap className="text-[#3178C6]">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M1.5 1.5h21v21h-21V1.5zm11.3 10.1H9.6v1.3h1.7v6.6h1.9v-6.6h1.6v-1.3zm5.2 1.2c-.4-.3-1-.5-1.7-.5-.9 0-1.5.3-1.9.9l1.3.9c.2-.3.5-.5.9-.5.3 0 .5.1.5.3 0 .2-.2.3-.7.5l-.7.2c-1.1.4-1.6 1-1.6 2 0 1.2.9 2 2.2 2 .8 0 1.5-.3 2-.8l-1.2-1c-.2.3-.5.4-.9.4-.3 0-.5-.1-.5-.4 0-.2.2-.4.7-.5l.6-.2c1.2-.4 1.8-1 1.8-2.1 0-.6-.2-1.1-.6-1.4z" />
    </svg>
  </LogoWrap>
);

const PostgresLogo = (
  <LogoWrap className="text-[#4169E1]">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12.3 1.2c-3.2 0-5.4 1-5.4 2.4v.3c0 .4.2.8.5 1.2C5.7 5.7 4.5 7.2 4.5 9c0 2.6 2.2 4.4 5.6 5.1.2.7.4 1.7.4 2.5 0 .8-.2 1.4-.5 1.7-.2.2-.4.3-.7.3-.8 0-1.4-.7-1.7-1.2l-.2-.4-1.7.8.1.3c.5 1.3 1.8 2.3 3.5 2.3.9 0 1.7-.3 2.3-.9.7-.7 1-1.7 1-3.1 0-.8-.1-1.7-.3-2.5 1.2-.2 2.2-.6 3-.1.8.5 1.3 1.4 1.5 2.4l1.8-.4c-.3-1.5-1-2.8-2.2-3.6-1-.6-2.2-.8-3.5-.7.1-.5.2-1 .2-1.4 0-.4 0-.7-.1-1 2.3-.4 3.8-1.5 3.8-3.1 0-2-2.5-3.3-5.7-3.3z" />
    </svg>
  </LogoWrap>
);

const MongoLogo = (
  <LogoWrap className="text-[#47A248]">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M13.2 22.7c-.3.1-.6.2-.9.3-.1 0-.2 0-.2-.1V2.1c0-.2.1-.3.3-.3 1.3.3 2.4 1 3.3 2.1 1.2 1.5 1.8 3.5 1.8 6.1 0 2.4-.7 4.4-2 5.9-.7.8-1.7 1.6-2.3 1.8zm-2.5.3c-.4-.1-.7-.2-1-.3-.6-.2-1.5-.9-2.2-1.7C6.2 19.4 5.4 17.2 5.4 14c0-2.7.6-4.8 1.9-6.4.9-1.1 2-1.9 3.2-2.2.2 0 .3.1.3.3v16.9c0 .1-.1.2-.2.2-.3-.1-.6-.1-.9-.2z" />
    </svg>
  </LogoWrap>
);

const ChartJsLogo = (
  <LogoWrap className="text-[#FF6384]">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M4 19h16v2H2V3h2v16zm3-3h2V9H7v7zm4 0h2V5h-2v11zm4 0h2v-4h-2v4z" />
    </svg>
  </LogoWrap>
);

const OpenAiLogo = (
  <LogoWrap className="text-zinc-100">
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M22.3 10.1a5.4 5.4 0 0 0-.5-5.1 5.5 5.5 0 0 0-5.9-2.3A5.5 5.5 0 0 0 6.7 1a5.5 5.5 0 0 0-3.7 6.5A5.4 5.4 0 0 0 1.7 14a5.5 5.5 0 0 0 5.9 2.3A5.5 5.5 0 0 0 17.3 23a5.5 5.5 0 0 0 3.7-6.5 5.5 5.5 0 0 0 1.3-6.4zM12 20.4a4 4 0 0 1-2.6-.9l.1-.1 4.4-2.5a.2.2 0 0 0 .1-.2v-6l2 1.1v4.6a4 4 0 0 1-4 4zm-4.6-2a4 4 0 0 1-1.4-3.4l.1.1 4.4 2.5a.2.2 0 0 0 .2 0l5.3-3.1v2.2l-4.4 2.5a4 4 0 0 1-4.2-.8zm-.6-9.4a4 4 0 0 1 2-1.7v5.1a.2.2 0 0 0 .1.2l5.3 3.1-2 1.1-4.4-2.5a4 4 0 0 1-1-6.3zm12.2 2.9-.1-.1-4.4-2.5a.2.2 0 0 0-.2 0l-5.3 3.1V9.1l4.4-2.5a4 4 0 0 1 5.6 4.3zm1.4 3.4v-.1l-4.4-2.5a.2.2 0 0 0-.2 0l-5.3 3.1v2.2l4.4 2.5a4 4 0 0 1 5.5-5.2zM12 8.7l-2 1.1V7.6l2-1.1 2 1.1v2.2l-2-1.1z" />
    </svg>
  </LogoWrap>
);

const DEVOPS_TOOLS: Tool[] = [
  { name: "AWS", blurb: "EC2 · S3 · deploy & scale", accent: "border-orange-500/30 bg-orange-500/10", logo: AwsLogo },
  { name: "GCP", blurb: "Cloud run & services", accent: "border-sky-500/30 bg-sky-500/10", logo: GcpLogo },
  { name: "Docker", blurb: "Containers · consistent envs", accent: "border-blue-500/30 bg-blue-500/10", logo: DockerLogo },
  { name: "Kubernetes", blurb: "Orchestration · rollouts", accent: "border-blue-500/30 bg-blue-500/[0.08]", logo: K8sLogo },
  { name: "CI / CD", blurb: "Native pipelines · ship safe", accent: "border-emerald-500/30 bg-emerald-500/10", logo: CicdLogo },
  { name: "GitHub Actions", blurb: "Build · test · deploy", accent: "border-white/20 bg-white/5", logo: GithubActionsLogo },
  { name: "Nginx", blurb: "Reverse proxy · TLS", accent: "border-green-500/30 bg-green-500/10", logo: NginxLogo },
  { name: "Redis", blurb: "Cache · rate limits", accent: "border-red-500/30 bg-red-500/10", logo: RedisLogo },
];

const STACK_TOOLS: Tool[] = [
  { name: "Next.js", blurb: "App Router · SSR / ISR", accent: "border-white/20 bg-white/5", logo: NextLogo },
  { name: "React", blurb: "Web · React Native", accent: "border-sky-500/30 bg-sky-500/10", logo: ReactLogo },
  { name: "Node.js", blurb: "APIs · workers", accent: "border-lime-500/30 bg-lime-500/10", logo: NodeLogo },
  { name: "TypeScript", blurb: "Typed product code", accent: "border-blue-500/30 bg-blue-500/10", logo: TsLogo },
  { name: "PostgreSQL", blurb: "Relational data", accent: "border-indigo-500/30 bg-indigo-500/10", logo: PostgresLogo },
  { name: "MongoDB", blurb: "Document stores", accent: "border-emerald-500/30 bg-emerald-500/10", logo: MongoLogo },
  { name: "Chart.js", blurb: "Analytics dashboards", accent: "border-pink-500/30 bg-pink-500/10", logo: ChartJsLogo },
  { name: "OpenAI / LLMs", blurb: "AI product features", accent: "border-violet-500/30 bg-violet-500/10", logo: OpenAiLogo },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div
      className={cn(
        "flex w-[210px] shrink-0 flex-col gap-3 rounded-2xl border px-4 py-4",
        tool.accent
      )}
    >
      <div className="flex items-center gap-3">
        {tool.logo}
        <p className="text-sm font-semibold tracking-tight text-white">{tool.name}</p>
      </div>
      <p className="text-xs text-zinc-500">{tool.blurb}</p>
    </div>
  );
}

type TechToolsSliderProps = {
  className?: string;
  showHeading?: boolean;
};

export function TechToolsSlider({ className, showHeading = true }: TechToolsSliderProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {showHeading ? (
        <div className="mb-8 max-w-2xl px-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            DevOps &amp; tooling
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Cloud, containers and delivery pipelines
          </h2>
          <p className="mt-2 text-sm text-zinc-400 md:text-base">
            AWS, GCP, Docker, Kubernetes, native CI/CD pipelines and the product stack I ship with —
            sliding overview of tools used across analytics, AI and ops products.
          </p>
        </div>
      ) : null}

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent md:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent md:w-20" />

        <Marquee pauseOnHover className="[--duration:36s] [--gap:0.75rem]">
          {DEVOPS_TOOLS.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="mt-3 [--duration:42s] [--gap:0.75rem]">
          {STACK_TOOLS.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
