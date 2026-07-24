import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BlogCTA() {
    return (
        <Link href="/contact" className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors group">
                Talk to an Engineer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
    );
}
