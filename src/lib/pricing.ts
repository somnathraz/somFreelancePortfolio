/** Visitor pricing region, set by src/proxy.ts from Vercel's IP country header. */
export type PricingRegion = "IN" | "GB" | "US" | "OTHER";

export const REGION_COOKIE = "sk_region";

/** Starting price for a focused MVP / product build, per region. */
export const MVP_STARTING_PRICE: Record<PricingRegion, string> = {
    IN: "₹75,000",
    GB: "£2,000",
    US: "$2,500",
    OTHER: "$2,500",
};

/** Region-neutral sentence for static copy and FAQ schema, which every visitor and crawler sees. */
export const MVP_PRICE_SUMMARY = `${MVP_STARTING_PRICE.US} in the US, ${MVP_STARTING_PRICE.GB} in the UK and ${MVP_STARTING_PRICE.IN} in India`;

export function regionFromCountry(country: string | null | undefined): PricingRegion {
    switch (country?.toUpperCase()) {
        case "IN":
            return "IN";
        case "GB":
        case "UK":
            return "GB";
        case "US":
            return "US";
        default:
            return "OTHER";
    }
}

/** Fallback when no cookie is present (local dev, non-Vercel hosts): guess from the browser timezone. */
export function regionFromTimeZone(timeZone: string | undefined): PricingRegion {
    if (!timeZone) return "OTHER";
    if (timeZone === "Asia/Kolkata" || timeZone === "Asia/Calcutta") return "IN";
    if (timeZone === "Europe/London") return "GB";
    if (timeZone.startsWith("America/")) return "US";
    return "OTHER";
}
