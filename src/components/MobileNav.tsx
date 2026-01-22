"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconHome,
    IconBriefcase,
    IconStack,
    IconRoute,
    IconNews,
    IconMessage2,
} from "@tabler/icons-react";

export function MobileNav() {
    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/",
        },
        {
            title: "Services",
            icon: (
                <IconStack className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/#services",
        },
        {
            title: "Work",
            icon: (
                <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/#work",
        },
        {
            title: "Blog",
            icon: (
                <IconNews className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/blog",
        },
        {
            title: "Contact",
            icon: (
                <IconMessage2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/#contact",
        },
    ];

    return (
        <div className="fixed bottom-6 left-6 right-6 z-[500] md:hidden">
            <FloatingDock
                items={links}
                mobileClassName="w-full justify-between px-6"
            />
        </div>
    );
}
