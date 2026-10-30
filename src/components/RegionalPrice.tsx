"use client";

import { useEffect, useState } from "react";
import {
    MVP_STARTING_PRICE,
    REGION_COOKIE,
    regionFromTimeZone,
    type PricingRegion,
} from "@/lib/pricing";

function readRegion(): PricingRegion {
    const match = document.cookie.match(new RegExp(`(?:^|; )${REGION_COOKIE}=([^;]+)`));
    const fromCookie = match?.[1] as PricingRegion | undefined;
    if (fromCookie && fromCookie in MVP_STARTING_PRICE) return fromCookie;
    return regionFromTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
}

/**
 * Starting price in the visitor's currency. Server HTML (and crawlers) get the
 * US price; the browser swaps in the local one after hydration.
 */
export function RegionalPrice() {
    const [region, setRegion] = useState<PricingRegion>("US");

    useEffect(() => {
        setRegion(readRegion());
    }, []);

    return <>{MVP_STARTING_PRICE[region]}</>;
}
