import React from "react";

export function Process() {
    const steps = [
        {
            title: "1. Discovery call",
            description: "Clarify the product, users, risks and what version one actually needs.",
        },
        {
            title: "2. MVP scope",
            description: "Lock features, stack, milestones and a fixed build plan you can trust.",
        },
        {
            title: "3. Weekly builds",
            description: "Ship in small iterations with demos, feedback and visible progress every week.",
        },
        {
            title: "4. Production launch",
            description: "Deploy, monitor, harden auth/payments/ops and get real users on the product.",
        },
        {
            title: "5. Support",
            description: "Handover, documentation and optional post-launch improvements.",
        },
    ];

    return (
        <section id="process" className="relative z-10 border-t border-white/5 bg-black px-4 py-20 md:py-32">
            <div className="container mx-auto max-w-7xl px-4 md:px-0">
                <div className="mb-16 text-left">
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                        — What happens next
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                        How delivery works
                    </h2>
                    <p className="mt-4 max-w-xl text-lg text-zinc-500">
                        Clear steps so a $5k–20k project never feels like a black box.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
                    {steps.map((step, index) => (
                        <div key={index} className="group flex flex-col gap-3">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-100 transition-colors group-hover:text-white md:text-base">
                                {step.title}
                            </h3>
                            <div className="h-0.5 w-12 bg-white/10 transition-all duration-500 group-hover:w-full group-hover:bg-emerald-500/40" />
                            <p className="text-sm leading-relaxed text-zinc-500 md:text-base">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
