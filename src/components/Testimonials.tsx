"use client";

import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { Star } from "lucide-react";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import Image from "next/image";

const reviews = [
    {
        name: "Alex Rivera",
        username: "@arivera",
        body: "Reduced our backend API latency by 60%. The optimization work on the Node.js clusters was phenomenal. Highly recommended for high-scale systems.",
        img: "https://avatar.vercel.sh/arivera",
        rating: 5,
        role: "CTO @ FintechStart",
        source: "LinkedIn",
        date: "Jan 10, 2025",
    },
    {
        name: "Sarah Chen",
        username: "@schen_dev",
        body: "Migrated our entire legacy database to MongoDB without a single minute of downtime. The execution was flawless and the communication top-tier.",
        img: "https://avatar.vercel.sh/schen",
        rating: 5,
        role: "VP Engineering",
        source: "Upwork",
        date: "Apr 20, 2024",
    },
    {
        name: "Marcus J.",
        username: "@marcus_builds",
        body: "Built our MVP from scratch in just 3 weeks. The attention to detail in the UI/UX while keeping the code clean was impressive.",
        img: "https://avatar.vercel.sh/marcus",
        rating: 5,
        role: "Founder @ SaaSify",
        source: "Product Hunt",
        date: "Nov 28, 2024",
    },
    {
        name: "David Kim",
        username: "@dkim_tech",
        body: "Optimized our Next.js build times from 15 mins to 3 mins. The CI/CD pipeline improvements have saved our team hundreds of hours.",
        img: "https://avatar.vercel.sh/david",
        rating: 5,
        role: "DevOps Lead",
        source: "LinkedIn",
        date: "Aug 10, 2024",
    },
    {
        name: "Lisa Pat.",
        username: "@lisa_p",
        body: "Redesigned our e-commerce checkout flow. Conversion rates went up by 15% in the first week. The data-driven approach is real.",
        img: "https://avatar.vercel.sh/lisa",
        rating: 5,
        role: "Product Manager",
        source: "Upwork",
        date: "Oct 01, 2024",
    },
    // Adding one more to make it 6 items for better marquee flow
    {
        name: "James Wilson",
        username: "@jwilson_design",
        body: "Implemented complex animations that felt silky smooth on all devices. A rare combination of design sensibility and technical depth.",
        img: "https://avatar.vercel.sh/james",
        rating: 5,
        role: "Creative Director",
        source: "LinkedIn",
        date: "Dec 15, 2024",
    },
];

const ReviewCard = ({
    img,
    name,
    username,
    body,
    rating,
    role,
    source,
    date,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
    rating: number;
    role: string;
    source: string;
    date: string;
}) => {
    return (
        <FollowerPointerCard
            title={
                <TitleComponent title={name} avatar={img} />
            }
        >
            <div
                className={cn(
                    "relative h-full w-80 overflow-hidden rounded-xl border p-6",
                    // light styles
                    "border-zinc-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                    // dark styles
                    "dark:border-white/[.1] dark:bg-zinc-900/50 dark:hover:bg-zinc-800 transition-colors",
                )}
            >
                <div className="flex flex-col gap-4 select-none">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3 mb-2">
                            <img src={img} alt={name} className="h-8 w-8 rounded-full" />
                            <div>
                                <h3 className="text-sm font-bold text-white leading-none">
                                    {name}
                                </h3>
                                <p className="text-xs text-zinc-500">{username}</p>
                            </div>
                        </div>
                        <h3 className="text-xs font-medium text-green-400 uppercase tracking-wide">
                            {role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "h-3 w-3 fill-orange-500 text-orange-500",
                                            i >= Math.floor(rating) && "opacity-30"
                                        )}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-zinc-500 ml-auto">
                                {date}
                            </span>
                        </div>
                    </div>

                    <div className="relative">
                        <blockquote className="mt-1 text-sm text-zinc-300 leading-relaxed italic">
                            "{body}"
                        </blockquote>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                Source: <span className={cn(
                                    "text-zinc-300",
                                    source === "Upwork" && "text-[#14a800]",
                                    source === "LinkedIn" && "text-[#0a66c2]",
                                    source === "Product Hunt" && "text-[#da552f]"
                                )}>{source}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </FollowerPointerCard>
    );
};

const TitleComponent = ({
    title,
    avatar,
}: {
    title: string;
    avatar: string;
}) => (
    <div className="flex space-x-2 items-center">
        <Image
            src={avatar}
            height="20"
            width="20"
            alt={`${title} - Client Profile`}
            className="rounded-full border-2 border-white"
        />
        <p>{title}</p>
    </div>
);

export function Testimonials() {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-24 bg-black">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>

            <h2 className="relative z-10 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16 text-white max-w-2xl mx-auto">
                Trusted by founders <br /> <span className="text-zinc-500">worldwide.</span>
            </h2>

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <Marquee pauseOnHover className="[--duration:40s]">
                    {reviews.map((review, i) => (
                        <ReviewCard key={i} {...review} />
                    ))}
                </Marquee>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent z-20"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent z-20"></div>
        </div>
    );
}
