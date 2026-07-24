type CaseStudyDeliverySummaryProps = {
  technicalLead?: string;
  deliverySetup: string;
  specialists: string;
  clientCommunication?: string;
};

export function CaseStudyDeliverySummary({
  technicalLead = "Somanath",
  deliverySetup,
  specialists,
  clientCommunication = "Direct with technical lead",
}: CaseStudyDeliverySummaryProps) {
  const items = [
    { label: "Technical lead", value: technicalLead },
    { label: "Delivery setup", value: deliverySetup },
    { label: "Specialists involved", value: specialists },
    { label: "Client communication", value: clientCommunication },
  ];

  return (
    <aside className="my-10 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-5">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        Project delivery
      </p>
      <dl className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-xs uppercase tracking-wider text-zinc-500">{item.label}</dt>
            <dd className="mt-1 text-sm text-zinc-200">{item.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
