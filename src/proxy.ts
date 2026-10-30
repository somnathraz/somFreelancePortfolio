import { NextResponse, type NextRequest } from "next/server";
import { REGION_COOKIE, regionFromCountry } from "@/lib/pricing";

/**
 * Remembers the visitor's pricing region in a cookie so static pages can show
 * local prices client-side. Vercel sets x-vercel-ip-country; elsewhere the
 * header is absent and the client falls back to a timezone guess.
 */
export function proxy(request: NextRequest) {
    const response = NextResponse.next();
    const country = request.headers.get("x-vercel-ip-country");
    if (!country) return response;

    const region = regionFromCountry(country);
    if (request.cookies.get(REGION_COOKIE)?.value !== region) {
        response.cookies.set(REGION_COOKIE, region, {
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "lax",
        });
    }
    return response;
}

export const config = {
    // Only pages that show prices; keeps the proxy off every other request.
    matcher: [
        "/services/:path*",
        "/hire-saas-mvp-developer",
        "/hire-dedicated-developers",
        "/white-label-web-development",
        "/saas-mvp-audit",
    ],
};
