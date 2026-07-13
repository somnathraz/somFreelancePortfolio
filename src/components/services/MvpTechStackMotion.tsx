"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Marquee from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

type Tech = {
  name: string;
  color: string;
  Icon: (props: { className?: string }) => React.ReactNode;
};

function NextIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.572 0c-.176 0-.31.038-.422.115l-8.75 5.072C2.16 5.34 2 5.621 2 5.982v12.035c0 .36.16.642.4.795l8.75 5.073c.113.076.246.115.422.115s.31-.039.422-.115l8.75-5.073c.24-.153.4-.434.4-.795V5.982c0-.36-.16-.642-.4-.795L11.994.115C11.882.038 11.748 0 11.572 0zm0 1.693 7.703 4.463v8.927l-7.703 4.463-7.703-4.463V6.156l7.703-4.463z" />
      <path d="M11.572 7.2v9.6l6.4-3.7V8.9l-6.4-1.7z" />
    </svg>
  );
}

function ReactIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" transform="rotate(120 12 12)" />
    </svg>
  );
}

function TypeScriptIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M1.5 1.5h21v21h-21V1.5zm11.3 10.1H9.6v1.3h1.7v6.6h1.9v-6.6h1.6v-1.3zm5.2 1.2c-.4-.3-1-.5-1.7-.5-.9 0-1.5.3-1.9.9l1.3.9c.2-.3.5-.5.9-.5.3 0 .5.1.5.3 0 .2-.2.3-.7.5l-.7.2c-1.1.4-1.6 1-1.6 2 0 1.2.9 2 2.2 2 .8 0 1.5-.3 2-.8l-1.2-1c-.2.3-.5.4-.9.4-.3 0-.5-.1-.5-.4 0-.2.2-.4.7-.5l.6-.2c1.2-.4 1.8-1 1.8-2.1 0-.6-.2-1.1-.6-1.4z" />
    </svg>
  );
}

function NodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.998 0 2.4 5.55v11.1L12 22.2l9.6-5.55V5.55L11.998 0zm0 1.9 7.9 4.56v8.28l-7.9 4.56-7.9-4.56V6.46l7.9-4.56z" />
      <path d="M12 7.2c-1.7 0-2.8.8-3.3 2.1l1.6.9c.2-.6.6-1 1.4-1 .7 0 1.2.3 1.2.9 0 .5-.3.7-1.5 1.1-1.6.5-2.4 1.2-2.4 2.6 0 1.5 1 2.5 2.7 2.5 1.4 0 2.4-.6 3-1.8l-1.5-.9c-.3.7-.8 1-1.5 1-.7 0-1.1-.3-1.1-.9 0-.5.3-.8 1.5-1.2 1.7-.5 2.5-1.3 2.5-2.7 0-1.5-1.1-2.6-2.9-2.6z" />
    </svg>
  );
}

function PostgresIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.3 1.2c-3.2 0-5.4 1-5.4 2.4v.3c0 .4.2.8.5 1.2C5.7 5.7 4.5 7.2 4.5 9c0 2.6 2.2 4.4 5.6 5.1.2.7.4 1.7.4 2.5 0 .8-.2 1.4-.5 1.7-.2.2-.4.3-.7.3-.8 0-1.4-.7-1.7-1.2l-.2-.4-1.7.8.1.3c.5 1.3 1.8 2.3 3.5 2.3.9 0 1.7-.3 2.3-.9.7-.7 1-1.7 1-3.1 0-.8-.1-1.7-.3-2.5 1.2-.2 2.2-.6 3-.1.8.5 1.3 1.4 1.5 2.4l1.8-.4c-.3-1.5-1-2.8-2.2-3.6-1-.6-2.2-.8-3.5-.7.1-.5.2-1 .2-1.4 0-.4 0-.7-.1-1 2.3-.4 3.8-1.5 3.8-3.1 0-2-2.5-3.3-5.7-3.3zm0 1.6c2.4 0 3.9.8 3.9 1.7s-1.5 1.7-3.9 1.7-3.9-.8-3.9-1.7 1.5-1.7 3.9-1.7zM9.1 8.3c.5.9 1.5 1.5 2.9 1.7.1-.4.1-.8.1-1.2 0-.4 0-.7-.1-1-1.4-.1-2.3-.5-2.9-.9v1.4z" />
    </svg>
  );
}

function TailwindIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 6c-2.7 0-4.4 1.3-5 4 1-.7 2.1-1 3.4-.7.7.2 1.3.7 1.9 1.3C13.3 11.8 14.5 13 17 13c2.7 0 4.4-1.3 5-4-1 .7-2.1 1-3.4.7-.7-.2-1.3-.7-1.9-1.3C15.7 7.2 14.5 6 12 6zM7 13c-2.7 0-4.4 1.3-5 4 1-.7 2.1-1 3.4-.7.7.2 1.3.7 1.9 1.3C8.3 18.8 9.5 20 12 20c2.7 0 4.4-1.3 5-4-1 .7-2.1 1-3.4.7-.7-.2-1.3-.7-1.9-1.3C10.7 14.2 9.5 13 7 13z" />
    </svg>
  );
}

function DockerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.1 10.1h2.1v2.1H4.1v-2.1zm2.7 0h2.1v2.1H6.8v-2.1zm2.7 0h2.1v2.1H9.5v-2.1zm2.7 0h2.1v2.1h-2.1v-2.1zM6.8 7.7h2.1v2.1H6.8V7.7zm2.7 0h2.1v2.1H9.5V7.7zm2.7 0h2.1v2.1h-2.1V7.7zm0-2.4h2.1v2.1h-2.1V5.3zm3.2 7.4c0 .1-.1.3-.1.4-.6 1-1.6 1.6-3.2 1.6H1.8c-.1-.6-.1-1.2 0-2 .1-.7.3-1.4.6-2 .1-.2.4-.3.6-.3h12.6c.1.4.1.9.1 1.3 0 .3 0 .6-.1 1zm3.8-.7c.3 0 .6.1.7.4.4.8.4 1.5.2 2.2-.1.4-.5.6-.9.6h-1.5c0-.7-.1-1.4-.3-2 .2-.6.6-1.1 1.2-1.2h.6z" />
    </svg>
  );
}

function AwsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.2 11.3c0 .4.1.7.4.9.2.2.6.4 1.2.5l1.4.3c1.3.3 2.2.8 2.7 1.4.5.6.8 1.4.8 2.4 0 1.1-.4 2-1.2 2.7-.8.7-1.9 1-3.3 1-1.1 0-2.1-.2-2.9-.6-.8-.4-1.4-.9-1.7-1.5l1.6-1c.2.4.5.7 1 1 .5.2 1 .4 1.7.4.7 0 1.2-.1 1.5-.4.3-.3.5-.6.5-1.1 0-.4-.2-.8-.5-1-.4-.3-.9-.5-1.7-.7l-1.4-.3c-1.2-.3-2-.7-2.5-1.4-.5-.6-.7-1.4-.7-2.3 0-1.1.4-1.9 1.2-2.6.8-.6 1.8-1 3.1-1 1 0 1.8.2 2.5.5.7.3 1.2.8 1.6 1.4l-1.5 1c-.3-.5-.7-.8-1.2-1-.5-.2-1-.3-1.6-.3-.6 0-1 .1-1.3.4-.3.2-.5.5-.5 1zM14.8 19.7V6.8h2.1l3.4 9.9h.1l3.4-9.9h2.1v12.9h-1.9v-8.4h-.1l-3.1 8.4h-1.9l-3.1-8.4h-.1v8.4h-1.9z" />
    </svg>
  );
}

function OpenAiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.3 10.1a5.4 5.4 0 0 0-.5-5.1 5.5 5.5 0 0 0-5.9-2.3A5.5 5.5 0 0 0 6.7 1a5.5 5.5 0 0 0-3.7 6.5A5.4 5.4 0 0 0 1.7 14a5.5 5.5 0 0 0 5.9 2.3A5.5 5.5 0 0 0 17.3 23a5.5 5.5 0 0 0 3.7-6.5 5.5 5.5 0 0 0 1.3-6.4zM12 20.4a4 4 0 0 1-2.6-.9l.1-.1 4.4-2.5a.2.2 0 0 0 .1-.2v-6l2 1.1v4.6a4 4 0 0 1-4 4zm-4.6-2a4 4 0 0 1-1.4-3.4l.1.1 4.4 2.5a.2.2 0 0 0 .2 0l5.3-3.1v2.2l-4.4 2.5a4 4 0 0 1-4.2-.8zm-.6-9.4a4 4 0 0 1 2-1.7v5.1a.2.2 0 0 0 .1.2l5.3 3.1-2 1.1-4.4-2.5a4 4 0 0 1-1-6.3zm12.2 2.9-.1-.1-4.4-2.5a.2.2 0 0 0-.2 0l-5.3 3.1V9.1l4.4-2.5a4 4 0 0 1 5.6 4.3zm1.4 3.4v-.1l-4.4-2.5a.2.2 0 0 0-.2 0l-5.3 3.1v2.2l4.4 2.5a4 4 0 0 1 5.5-5.2zM12 8.7l-2 1.1V7.6l2-1.1 2 1.1v2.2l-2-1.1z" />
    </svg>
  );
}

function VercelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2 2 19.5h20L12 2z" />
    </svg>
  );
}

function RedisIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.2 2.5 6.5v.3L12 11l9.5-4.2v-.3L12 2.2zm-9.5 6.6V13L12 17.3 21.5 13V8.8L12 13.1 2.5 8.8zm0 6.2V19L12 23.3 21.5 19v-3.9L12 19.3 2.5 15z" />
    </svg>
  );
}

function MongodbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.2 22.7c-.3.1-.6.2-.9.3-.1 0-.2 0-.2-.1V2.1c0-.2.1-.3.3-.3 1.3.3 2.4 1 3.3 2.1 1.2 1.5 1.8 3.5 1.8 6.1 0 2.4-.7 4.4-2 5.9-.7.8-1.7 1.6-2.3 1.8zm-2.5.3c-.4-.1-.7-.2-1-.3-.6-.2-1.5-.9-2.2-1.7C6.2 19.4 5.4 17.2 5.4 14c0-2.7.6-4.8 1.9-6.4.9-1.1 2-1.9 3.2-2.2.2 0 .3.1.3.3v16.9c0 .1-.1.2-.2.2-.3-.1-.6-.1-.9-.2z" />
    </svg>
  );
}

function PrismaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.2 18.7 12.8 1.5c.2-.4.7-.5 1.1-.3l6.3 3.3c.4.2.6.7.4 1.1L12.1 22.7c-.2.5-.9.6-1.3.2l-5.8-5.1c-.4-.3-.5-.9-.1-1.2l-.7 2.1z" />
    </svg>
  );
}

const rowA: Tech[] = [
  { name: "Next.js", color: "text-white", Icon: NextIcon },
  { name: "React", color: "text-sky-300", Icon: ReactIcon },
  { name: "TypeScript", color: "text-blue-400", Icon: TypeScriptIcon },
  { name: "Node.js", color: "text-emerald-400", Icon: NodeIcon },
  { name: "PostgreSQL", color: "text-sky-400", Icon: PostgresIcon },
  { name: "MongoDB", color: "text-green-400", Icon: MongodbIcon },
];

const rowB: Tech[] = [
  { name: "Tailwind", color: "text-cyan-300", Icon: TailwindIcon },
  { name: "Docker", color: "text-blue-300", Icon: DockerIcon },
  { name: "AWS", color: "text-amber-300", Icon: AwsIcon },
  { name: "Vercel", color: "text-white", Icon: VercelIcon },
  { name: "OpenAI", color: "text-zinc-100", Icon: OpenAiIcon },
  { name: "Redis", color: "text-rose-400", Icon: RedisIcon },
  { name: "Prisma", color: "text-teal-300", Icon: PrismaIcon },
];

function TechChip({ tech, index }: { tech: Tech; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="mx-2 inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm"
    >
      <motion.span
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.4 + (index % 4) * 0.25, repeat: Infinity, ease: "easeInOut" }}
        className={cn("flex h-8 w-8 items-center justify-center", tech.color)}
      >
        <tech.Icon className="h-6 w-6" />
      </motion.span>
      <span className="text-sm font-medium text-zinc-300">{tech.name}</span>
    </motion.div>
  );
}

export function MvpTechStackMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-white/5 py-14">
      <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02]" />
      <div className="container relative z-10 mx-auto mb-8 max-w-6xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500"
        >
          — modern stack
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl"
        >
          Latest technologies I ship with
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.14 }}
          className="mx-auto mt-2 max-w-xl text-sm text-zinc-500"
        >
          Production SaaS tools founders actually need — not a random logo wall.
        </motion.p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" />

        <Marquee pauseOnHover className="[--duration:32s]">
          {rowA.map((tech, i) => (
            <TechChip key={tech.name} tech={tech} index={i} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="mt-3 [--duration:38s]">
          {rowB.map((tech, i) => (
            <TechChip key={tech.name} tech={tech} index={i} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
