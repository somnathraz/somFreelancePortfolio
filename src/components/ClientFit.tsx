"use client";

import { CheckCircle2, XCircle } from "lucide-react";

export function ClientFit() {
    const idealClients = [
        "SaaS founders & startups building MVPs",
        "Teams needing critical performance fixes",
        "Companies scaling beyond their first version",
    ];

    const notIdealClients = [
        "Simple one-page brochure sites",
        "Cheap template modifications",
        "projects without clear requirements",
    ];

    return (
        <section className="relative w-full py-24 bg-black border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Ideal Clients */}
                    <div className="flex flex-col space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="h-1 w-8 bg-green-500 rounded-full"></span>
                            Who I typically work with
                        </h3>
                        <ul className="space-y-4">
                            {idealClients.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-zinc-300">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Not Fit */}
                    <div className="flex flex-col space-y-6 opacity-70 hover:opacity-100 transition-opacity">
                        <h3 className="text-xl font-bold text-zinc-400 flex items-center gap-2">
                            <span className="h-1 w-8 bg-red-500/50 rounded-full"></span>
                            Not a fit for
                        </h3>
                        <ul className="space-y-4">
                            {notIdealClients.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-zinc-400">
                                    <XCircle className="w-5 h-5 text-red-500/50 flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
