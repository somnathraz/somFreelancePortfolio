/**
 * Site-side extras for a trap. The trace JSON stays the source of truth for the replay;
 * these are editorial additions that do not belong in the shared trace schema.
 */
export interface TrapReel {
    platform: "youtube" | "instagram";
    url: string;
    /** YouTube video id, used to embed the Short. */
    youtubeId?: string;
}

export interface TrapAlternative {
    approach: string;
    when: string;
}

export interface TrapExtras {
    /** Series this trap belongs to, shown under the title. */
    series?: string;
    reels?: TrapReel[];
    /** Other accepted fixes, from the trap's README in interview-traps. */
    otherFixes?: TrapAlternative[];
}

const EXTRAS: Record<string, TrapExtras> = {
    "url-shortener-core-design": {
        series: "URL Shortener",
        reels: [
            { platform: "youtube", url: "https://www.youtube.com/shorts/IXoW0dAlyV0", youtubeId: "IXoW0dAlyV0" },
            { platform: "instagram", url: "https://www.instagram.com/codewithsom/reel/DfCJSCah3me/" },
        ],
    },
    "booking-race-condition": {
        series: "Booking system",
        reels: [
            { platform: "youtube", url: "https://www.youtube.com/shorts/IL_yaTJ-g3c", youtubeId: "IL_yaTJ-g3c" },
            { platform: "instagram", url: "https://www.instagram.com/reel/18075774254741055/" },
        ],
        otherFixes: [
            { approach: "UPDATE … WHERE status = 'available'", when: "The default answer. Simple, fast, one round trip." },
            { approach: "SELECT … FOR UPDATE inside a transaction", when: "You need to read several rows and decide in code. Keep the transaction short and never hold it across a payment call." },
            { approach: "UNIQUE constraint and catch the violation", when: "Inserting the claim row is the natural write. Add it as a safety net either way." },
            { approach: "Optimistic locking (version column)", when: "Contention is rare and you do not want blocking." },
            { approach: "Distributed lock (for example Redis)", when: "The resource is not in one database. Usually overkill for this problem." },
        ],
    },
};

export function getTrapExtras(slug: string): TrapExtras {
    return EXTRAS[slug] ?? {};
}
