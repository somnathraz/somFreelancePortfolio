const rows = [
  {
    requirement: "Audit, bug, or performance issue",
    setup: "Senior engineer",
  },
  {
    requirement: "Feature or integration",
    setup: "Technical lead + specialist",
  },
  {
    requirement: "SaaS MVP",
    setup: "Compact product team",
  },
  {
    requirement: "Larger platform",
    setup: "Extended engineering team",
  },
  {
    requirement: "Agency overflow",
    setup: "White-label delivery team",
  },
] as const;

export function FlexibleTeamSection() {
  return (
    <section
      id="flexible-team"
      className="relative z-10 border-t border-white/5 bg-black px-4 py-20 md:py-28"
    >
      <div className="container mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          — How the studio scales
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
          One Technical Lead. The Right Specialists When Needed.
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-zinc-400">
          Work directly with the engineers building your product. Every engagement is led by an
          experienced technical owner, with frontend, backend, AI, design, QA, or cloud specialists
          added when the requirements demand them.
        </p>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-4 pr-6 text-xs font-medium uppercase tracking-widest text-zinc-500">
                  Requirement
                </th>
                <th className="pb-4 text-xs font-medium uppercase tracking-widest text-zinc-500">
                  Delivery setup
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.requirement} className="border-b border-white/5">
                  <td className="py-4 pr-6 text-sm text-zinc-300 md:text-base">
                    {row.requirement}
                  </td>
                  <td className="py-4 text-sm font-medium text-white md:text-base">
                    {row.setup}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
