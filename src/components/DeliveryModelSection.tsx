type DeliveryModelSectionProps = {
  /** Optional one-line context for a specific service */
  contextLine?: string;
};

const options = [
  {
    title: "Focused Engineer",
    body: "One senior engineer for audits, fixes, architecture, performance, and individual features.",
  },
  {
    title: "Compact Product Team",
    body: "A technical lead supported by the developers, designer, or QA required for an MVP or product module.",
  },
  {
    title: "Extended Engineering Team",
    body: "A flexible combination of frontend, backend, AI, cloud, design, and QA specialists for larger platforms.",
  },
] as const;

export function DeliveryModelSection({ contextLine }: DeliveryModelSectionProps) {
  return (
    <section
      id="how-delivery-works"
      className="relative z-10 border-t border-white/5 bg-black px-4 py-20 md:py-28"
    >
      <div className="container mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          — Delivery model
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
          Direct Engineering Access. Flexible Delivery Capacity.
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-zinc-400">
          Every engagement is led by an experienced engineer responsible for technical decisions,
          communication, and delivery. Additional specialists are added only when the product
          requires more skills or delivery capacity.
        </p>
        {contextLine ? (
          <p className="mt-3 max-w-3xl text-sm text-zinc-500">{contextLine}</p>
        ) : null}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {options.map((option) => (
            <div
              key={option.title}
              className="border-t border-white/15 pt-5"
            >
              <h3 className="text-lg font-semibold text-white">{option.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{option.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
