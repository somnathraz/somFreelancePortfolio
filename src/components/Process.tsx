import React from "react";

export function Process() {
    const steps = [
        {
            title: "1. Discover",
            description: "We align on goals, constraints, and success metrics.",
        },
        {
            title: "2. Architect",
            description: "I design a scalable, production-ready solution.",
        },
        {
            title: "3. Build & Iterate",
            description: "Fast execution with continuous feedback.",
        },
        {
            title: "4. Launch & Support",
            description: "Deployment, monitoring, and post-launch support.",
        },
    ];

    return (
        <section id="process" className="relative z-10 bg-black py-20 md:py-32 px-4 border-t border-white/5">
            <div className="container mx-auto max-w-7xl px-4 md:px-0">
                <div className="mb-16 text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                        How We Work
                    </h2>
                    <p className="mt-4 text-zinc-500 max-w-xl text-lg">
                        A structured, high-trust process designed to move from vision to production-grade software.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col gap-3 group">
                            <h3 className="text-lg font-bold text-white uppercase tracking-widest text-zinc-100 group-hover:text-white transition-colors">
                                {step.title}
                            </h3>
                            <div className="h-0.5 w-12 bg-white/10 group-hover:w-full group-hover:bg-white/30 transition-all duration-500" />
                            <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
