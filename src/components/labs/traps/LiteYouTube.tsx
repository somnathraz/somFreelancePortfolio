"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Click-to-load YouTube embed: shows only a thumbnail until someone taps play, so the page does not
 * download YouTube's player code up front.
 */
export function LiteYouTube({ id, title }: { id: string; title: string }) {
    const [active, setActive] = useState(false);

    if (active) {
        return (
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full"
            />
        );
    }

    return (
        <button type="button" onClick={() => setActive(true)} aria-label={`Play: ${title}`} className="group relative block h-full w-full bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-lg transition-transform group-hover:scale-105">
                    <Play size={22} fill="currentColor" aria-hidden="true" />
                </span>
            </span>
        </button>
    );
}
