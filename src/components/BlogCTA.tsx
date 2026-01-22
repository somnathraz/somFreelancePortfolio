"use client";

import { ContactSheet } from "@/components/ContactSheet";
import { ArrowRight } from "lucide-react";

export function BlogCTA() {
    return (
        <ContactSheet>
            <button className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors group">
                Start a project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </ContactSheet>
    );
}
